import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { createServer, resolveOptions } from '@slidev/cli'
import { chromium } from 'playwright-chromium'
import { fileURLToPath } from 'node:url'

const institution = 'Institute of High Energy Physics, Chinese Academy of Sciences'
const output = new URL('./output/', import.meta.url)
await mkdir(fileURLToPath(output), { recursive: true })
const options = await resolveOptions({ entry: 'slides-v2.md' }, 'export')
const server = await createServer(options, { server: { port: 12446 }, clearScreen: false })
await server.listen()
const port = server.httpServer.address().port
const browser = await chromium.launch({ executablePath: process.env.BROWSER_EXECUTABLE ?? chromium.executablePath(), chromiumSandbox: false, args: ['--no-proxy-server'] })
const results = []
try {
  const page = await browser.newPage({ viewport: { width: 980, height: 552 } })
  for (const [mode, url] of [
    ['web', `${process.env.BROWSER_BASE_URL ?? 'http://127.0.0.1:3030'}/1`],
    ['export', `http://localhost:${port}/1?print=true&range=1`],
  ]) {
    await page.goto(url, { waitUntil: 'networkidle' })
    await page.emulateMedia({ media: 'screen' })
    const cover = page.locator('.slidev-layout.cover:visible')
    await cover.waitFor()
    await page.evaluate(() => document.fonts.ready)
    const metrics = await cover.evaluate(root => {
      const box = root.getBoundingClientRect()
      const title = root.querySelector('h1').getBoundingClientRect()
      const block = root.firstElementChild.getBoundingClientRect()
      const affiliations = [...root.querySelectorAll('.author-institution')].filter(element => element.getBoundingClientRect().height > 0)
      const names = [...root.querySelectorAll('.author-name')]
      return {
        titleTop: (title.top - box.top) / box.height,
        blockCenter: (block.top + block.height / 2 - box.top) / box.height,
        affiliationCount: affiliations.length,
        affiliation: affiliations[0]?.textContent.trim(),
        affiliationAfterNames: affiliations.length === 1 && affiliations[0].getBoundingClientRect().top >= names.at(-1).getBoundingClientRect().bottom,
      }
    })
    results.push({ mode, ...metrics })
     await page.screenshot({ path: fileURLToPath(new URL(`cover-${mode}.png`, output)) })
     if (mode === 'export') await page.pdf({ path: fileURLToPath(new URL('cover-layout-check.pdf', output)), width: 980, height: 552, pageRanges: '1', printBackground: true, preferCSSPageSize: true })
  }
   await writeFile(new URL('cover-layout-results.json', output), JSON.stringify(results, null, 2))
  console.log(results)
  for (const result of results) {
    assert.ok(result.titleTop > 0.25 && result.titleTop < 0.45, `Cover title must stay in the central content area: ${result.mode}`)
    assert.ok(result.blockCenter > 0.46 && result.blockCenter < 0.55)
  }
  assert.ok(Math.abs(results[0].titleTop - results[1].titleTop) < 0.02, 'Web and export cover positions must agree')
  for (const result of results) {
    assert.equal(result.affiliationCount, 1)
    assert.equal(result.affiliation, institution)
    assert.ok(result.affiliationAfterNames)
  }
  console.log('PASS: cover is centered in web/export and displays one shared affiliation after all authors')
} finally {
  await browser.close()
  await server.close()
}
