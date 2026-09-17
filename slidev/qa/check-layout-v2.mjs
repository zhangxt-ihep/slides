import assert from 'node:assert/strict'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-chromium'
import { parseSync } from '@slidev/parser'

const pageCount = parseSync(await readFile(new URL('../slides/fts-xrootd-2026/slides.md', import.meta.url), 'utf8')).slides.length
const output = new URL('./output/', import.meta.url)
await mkdir(fileURLToPath(output), { recursive: true })
const baseUrl = process.env.BROWSER_BASE_URL ?? 'http://127.0.0.1:3030'
const browser = await chromium.launch({ executablePath: process.env.BROWSER_EXECUTABLE ?? chromium.executablePath(), chromiumSandbox: false, args: ['--no-proxy-server'] })
const results = []
try {
  const page = await browser.newPage()
  for (const width of [1280, 768, 375]) {
    await page.setViewportSize({ width, height: Math.round(width * 9 / 16) })
    for (let number = 1; number <= pageCount; number++) {
       await page.goto(`${baseUrl}/${number}`)
      const root = page.locator('.slidev-layout:visible').first()
      await root.waitFor()
      assert.equal(await root.locator('.beamer-footer-left').isVisible(), false, 'No left footer on any slide')
      assert.ok((await root.locator('.beamer-footer-center').innerText()).includes('FTS-XRootD Workshop'))
      assert.equal(await root.locator('.beamer-footer-page').isVisible(), true)
      assert.equal((await root.locator('.beamer-footer-page-current').innerText()).trim(), String(number))
      assert.equal((await root.locator('.beamer-footer-page-total').innerText()).trim(), String(pageCount))
      for (const caption of await root.locator('caption,figcaption,.juno-ops-period').all()) {
        assert.equal(await caption.evaluate(element => getComputedStyle(element).textAlign), 'center', 'Captions must be centered above their content')
      }
      await root.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode())))
      await page.evaluate(async () => {
        await document.fonts.ready
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
      })
      const result = await root.evaluate(root => {
        const box = root.getBoundingClientRect()
        const footer = root.querySelector('footer')?.getBoundingClientRect()
        const overflow = []
        const texts = []
        const scroll = [...root.querySelectorAll('*')].filter(element => {
          const style = getComputedStyle(element)
          return element.clientHeight && /auto|scroll/.test(style.overflowY) && element.scrollHeight > element.clientHeight + 1
        }).map(element => ({ class: element.className, height: element.clientHeight, scrollHeight: element.scrollHeight }))
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
        while (walker.nextNode()) {
          const node = walker.currentNode
          if (!node.textContent.trim() || node.parentElement?.closest('style,script')) continue
          const range = document.createRange()
          range.selectNodeContents(node)
          if (!node.parentElement.closest('svg') && getComputedStyle(node.parentElement).visibility !== 'hidden' && [...range.getClientRects()].some(rect => rect.width && rect.height)) {
            const role = node.parentElement.closest('footer') ? 'footer' : node.parentElement.closest('header') ? 'header' : 'body'
            texts.push({ text: node.textContent.trim(), role })
          }
          if (node.parentElement.closest('header,footer')) continue
          for (const rect of range.getClientRects()) {
            if (rect.width && (rect.left < box.left - 1 || rect.right > box.right + 1 || rect.bottom > (footer?.top ?? box.bottom) + 1)) overflow.push(node.textContent.trim())
          }
        }
        for (const image of root.querySelectorAll('img')) {
          const rect = image.getBoundingClientRect()
          if (!image.naturalWidth || rect.bottom > (footer?.top ?? box.bottom) + 1) overflow.push(image.alt)
        }
        const fonts = [...new Set([...root.querySelectorAll('p,li,td,th')]
          .filter(element => !element.closest('header,footer') && !element.matches('.juno-ops-period,.juno-ops-note'))
          .map(element => getComputedStyle(element).fontSize))]
        return { scroll, overflow, fonts, texts, isSection: root.classList.contains('section'), isPlaceholder: root.classList.contains('review-placeholder') }
      })
       await page.screenshot({ path: fileURLToPath(new URL(`v2-layout-${number}-${width}.png`, output)) })
      results.push({ page: number, width, ...result })
    }
  }
  await writeFile(new URL('v2-layout-results.json', output), JSON.stringify(results, null, 2))
  await writeFile(new URL('v2-pdf-expected.json', output), JSON.stringify(results.filter(result => result.width === 1280), null, 2))
  console.log(JSON.stringify(results.map(({ texts, ...result }) => result), null, 2))
  assert.ok(results.every(result => !result.scroll.length), 'Slides must not have internal vertical scroll ranges')
  assert.ok(results.every(result => !result.overflow.length), 'All content must fit above the footer')
  assert.ok(results.filter(result => result.page > 1 && !result.isSection && !result.isPlaceholder).every(result => result.fonts.length === 1 && result.fonts[0] === '18px'), 'All content-page body/table fonts must be exactly 18px')
  assert.ok(results.filter(result => result.isSection).every(result => result.fonts.length === 0), 'Section dividers contain headings, not body paragraphs')
  assert.ok(results.filter(result => result.isPlaceholder).every(result => result.fonts.length === 0 && !result.texts.some(text => text.role === 'body')), 'Review placeholders must have no body content')
} finally {
  await browser.close()
}
