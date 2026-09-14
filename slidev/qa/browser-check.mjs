import assert from 'node:assert/strict'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-chromium'
import { parseSync } from '@slidev/parser'

const output = new URL('./output/', import.meta.url)
await mkdir(fileURLToPath(output), { recursive: true })
const baseUrl = process.env.BROWSER_BASE_URL ?? 'http://127.0.0.1:3030'
const source = await readFile(new URL('../slides-v2.md', import.meta.url), 'utf8')
const parsed = parseSync(source)
parsed.slides.forEach((slide, index) => {
   assert.equal(typeof slide.frontmatter.title, 'string', `Slide ${index + 1}: title must be a scalar string`)
})
assert.equal(parsed.slides.length, 22, 'The final deck must contain 22 slides')

const browser = await chromium.launch({ executablePath: process.env.BROWSER_EXECUTABLE ?? chromium.executablePath(), chromiumSandbox: false })
const page = await browser.newPage()
const errors = []
const outsideRequests = new Set()
const results = []
page.on('pageerror', e => errors.push(e.message))
page.on('request', r => {
   if (/^https?:/.test(r.url()) && !r.url().startsWith(baseUrl))
    outsideRequests.add(r.url())
})

try {
  for (const width of [1280, 768, 375]) {
    await page.setViewportSize({ width, height: Math.round(width * 9 / 16) })
     for (let slide = 1; slide <= parsed.slides.length; slide++) {
       await page.goto(`${baseUrl}/${slide}`)
      const layout = page.locator('.slidev-layout:visible').first()
      await layout.waitFor()
      await page.evaluate(() => document.fonts.ready)
      const fonts = await layout.evaluate(root => ({
        body: getComputedStyle(root).fontFamily,
        title: getComputedStyle(root.querySelector('.header-title, h1') || root).fontFamily,
      }))
      assert.ok(fonts.body.includes('Arimo'), `Slide ${slide}: body must use plain Arimo, got ${fonts.body}`)
      assert.ok(fonts.title.includes('Arimo'), `Slide ${slide}: title must use plain Arimo, got ${fonts.title}`)
      const overflow = await layout.evaluate(root => {
        const issues = []
        const footer = root.querySelector('.beamer-footer')
        const pairs = [
          [root.querySelector('.cover-band'), root.querySelector('.absolute.bottom-12')],
          [root.querySelector('.roadmap-track'), root.querySelector('.roadmap > .split-grid')],
        ]
        for (const [first, second] of pairs) {
          if (first && second && first.getBoundingClientRect().bottom > second.getBoundingClientRect().top + 1)
            issues.push({ text: 'Sibling overlap', container: `${first.className} / ${second.className}` })
        }
        const nodes = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
        while (nodes.nextNode()) {
          const node = nodes.currentNode
          const parent = node.parentElement
          if (!node.textContent.trim() || !parent || parent.closest('style,script')) continue
          const range = document.createRange()
          range.selectNodeContents(node)
          for (const rect of range.getClientRects()) {
            if (!rect.width || !rect.height) continue
            if (footer && !parent.closest('.beamer-footer') && rect.bottom > footer.getBoundingClientRect().top + 1)
              issues.push({ text: node.textContent.trim().slice(0, 80), container: 'footer overlap' })
            for (const container of [root, parent.closest('.slide-body'), parent.closest('.table-wrap'), parent.closest('.roadmap-track'), parent.closest('.col-left, .col-right, .content-wrapper'), parent.closest('.node, .pipeline-step, .lifecycle-step, .rca-step')].filter(Boolean)) {
              const box = container.getBoundingClientRect()
              if (rect.left < box.left - 2 || rect.right > box.right + 2 || rect.top < box.top - 2 || rect.bottom > box.bottom + 2)
                issues.push({ text: node.textContent.trim().slice(0, 80), container: container.className })
            }
          }
        }
        return issues
      })
      const texts = width === 1280 ? await layout.evaluate(root => {
        const result = []
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
        while (walker.nextNode()) {
          const node = walker.currentNode
          const parent = node.parentElement
          const text = node.textContent.trim()
          if (!text || !parent || parent.closest('style, script, .beamer-footer-toolbar')) continue
          const range = document.createRange()
          range.selectNodeContents(node)
          if (![...range.getClientRects()].some(r => r.width && r.height)) continue
          const role = parent.closest('footer') ? 'footer' : parent.closest('.header-container') ? 'header' : 'body'
          result.push({ text, role })
        }
        return result
      }) : []
      await page.screenshot({ path: fileURLToPath(new URL(`slide-${String(slide).padStart(2, '0')}-${width}.png`, output)) })
      results.push({ slide, width, fonts, overflow, texts })
    }
  }
   await page.setViewportSize({ width: 1280, height: 720 })
   await page.goto(`${baseUrl}/1`)
   const cover = page.locator('.slidev-layout:visible').first()
   await cover.waitFor()
   assert.equal(await cover.locator('a[href="mailto:zhangxuantong@ihep.ac.cn"]').count(), 1, 'Cover email link must remain available')
   await page.keyboard.press('ArrowRight')
  await page.waitForURL('**/2')
  await page.keyboard.press('ArrowLeft')
   await page.waitForURL('**/1')
   await page.goto(`${baseUrl}/22`)
   assert.ok((await page.locator('.slidev-layout:visible').first().innerText()).includes('Thank You!'), 'Final slide must remain reachable')
   await writeFile(new URL('final-browser-results.json', output), JSON.stringify({ slideCount: parsed.slides.length, results, errors, outsideRequests: [...outsideRequests], navigation: 'PASS: right and left' }, null, 2))
   console.log(JSON.stringify({ routes: results.length, overflow: results.filter(r => r.overflow.length), errors, outsideRequests: [...outsideRequests], navigation: 'PASS' }, null, 2))
  assert.ok(results.every(r => r.overflow.length === 0), 'No slide text may overflow its slide or content frame')
  assert.equal(errors.length, 0, 'No uncaught browser errors')
  assert.equal(outsideRequests.size, 0, 'Presentation must not fetch external fonts or assets')
} finally {
  await browser.close()
  console.log('QA browser closed')
}
