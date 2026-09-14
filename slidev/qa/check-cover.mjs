import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-chromium'

const baseUrl = process.env.BROWSER_BASE_URL ?? 'http://127.0.0.1:3030'
const output = new URL('./output/', import.meta.url)
await mkdir(fileURLToPath(output), { recursive: true })
const browser = await chromium.launch({ executablePath: process.env.BROWSER_EXECUTABLE ?? chromium.executablePath(), chromiumSandbox: false, args: ['--no-proxy-server'] })
const evidence = []
try {
  const page = await browser.newPage()
  for (const width of [1280, 768, 375]) {
    await page.setViewportSize({ width, height: Math.round(width * 9 / 16) })
     await page.goto(`${baseUrl}/1`)
    const cover = page.locator('.slidev-layout.cover:visible')
    await cover.waitFor()
    await page.evaluate(() => document.fonts.ready)
    const result = await cover.evaluate(root => {
      const title = root.querySelector('h1')
      const range = document.createRange()
      range.selectNodeContents(title)
      const titleLines = new Set([...range.getClientRects()].filter(r => r.width > 0).map(r => Math.round(r.top))).size
      const authors = [...root.querySelectorAll('.author-name')].filter(element => element.getBoundingClientRect().height > 0).map(element => {
        range.selectNodeContents(element)
        return { text: element.textContent.trim(), lines: new Set([...range.getClientRects()].filter(r => r.width > 0).map(r => Math.round(r.top))).size, top: element.getBoundingClientRect().top }
      })
      const emailLink = root.querySelector('.cover-email-link')
      const style = getComputedStyle(title)
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
      return { titleLines, authors, emailHref: emailLink?.getAttribute('href'), emailText: emailLink?.textContent.trim(), emailAriaLabel: emailLink?.getAttribute('aria-label'), emailTitle: emailLink?.getAttribute('title'), hasEmailIcon: !!emailLink?.querySelector('svg'), subtitleCount: root.querySelectorAll('h1 + p').length, titleNaturalWidth: context.measureText('FTS Status and Future Plan at IHEP').width, availableWidth: title.parentElement.clientWidth, overflow: title.scrollWidth > title.clientWidth + 1 }
    })
    evidence.push({ width, ...result })
     await page.screenshot({ path: fileURLToPath(new URL(`output/cover-${width}.png`, import.meta.url)) })
    console.log(JSON.stringify({ width, ...result }))
    assert.equal(result.titleLines, 1, 'Cover title must occupy one line')
    assert.equal(result.subtitleCount, 0, 'Cover must not contain a subtitle')
    assert.deepEqual(result.authors.map(a => a.text), ['Xuantong Zhang', 'Xiaomei Zhang, Xiao Han'])
    assert.equal(result.emailHref, 'mailto:zhangxuantong@ihep.ac.cn')
    assert.equal(result.emailText, '')
    assert.equal(result.emailAriaLabel, 'Email Xuantong Zhang')
    assert.equal(result.emailTitle, 'Email Xuantong Zhang')
    assert.equal(result.hasEmailIcon, true)
    assert.ok(result.authors.every(a => a.lines === 1), 'Each author line must remain intact')
    assert.ok(result.authors[1].top > result.authors[0].top, 'Author groups must occupy two separate rows')
    assert.equal(result.overflow, false, 'Cover title must fit its content width')
  }
  await writeFile(new URL('cover-check.json', output), JSON.stringify(evidence, null, 2))
} finally {
  await browser.close()
}
