import { realpathSync, statSync, readFileSync } from 'node:fs'
import path from 'node:path'

const [distArg, baseArg, ...extra] = process.argv.slice(2)
if (!distArg || !baseArg || extra.length || !/^\/(?!\/)/.test(baseArg) || /[?#]/.test(baseArg)) {
  console.error('Usage: node qa/check-image-preloads.mjs <dist-directory> <base-path>')
  process.exit(2)
}

const dist = path.resolve(distArg)
const realDist = realpathSync(dist)
const base = new URL(baseArg.endsWith('/') ? baseArg : `${baseArg}/`, 'https://preload-check.invalid')
const html = readFileSync(path.join(dist, 'index.html'), 'utf8')
// Generated Slidev links use ordinary quoted attributes; this intentionally avoids a general HTML parser.
const attrs = tag => Object.fromEntries(
  [...tag.matchAll(/([\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)]
    .map(m => [m[1].toLowerCase(), m[2] ?? m[3] ?? m[4]]),
)
let failures = 0

for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
  const attr = attrs(match[0])
  if (!attr.rel?.toLowerCase().split(/\s+/).includes('preload') || attr.as?.toLowerCase() !== 'image' || !attr.href) continue
  let url
  try {
    url = new URL(attr.href, base)
  } catch {
    console.error(`Invalid image preload URL: ${attr.href}`)
    failures++
    continue
  }
  if (url.protocol !== 'https:' || url.origin !== base.origin) continue
  if (!url.pathname.startsWith(base.pathname)) {
    console.error(`Image preload is outside base ${base.pathname}: ${attr.href}`)
    failures++
    continue
  }
  let file
  try {
    file = path.resolve(dist, decodeURIComponent(url.pathname.slice(base.pathname.length)))
  } catch {
    console.error(`Invalid encoded image preload URL: ${attr.href}`)
    failures++
    continue
  }
  if (!file.startsWith(`${dist}${path.sep}`)) {
    console.error(`Image preload escapes dist: ${attr.href}`)
    failures++
    continue
  }
  try {
    if (!statSync(file).isFile()) throw new Error('not a file')
    const realFile = realpathSync(file)
    if (!realFile.startsWith(`${realDist}${path.sep}`)) throw new Error('outside dist')
  } catch {
    console.error(`Missing image preload file (missing, not a file, or outside dist): ${file} for URL ${attr.href}`)
    failures++
  }
}

if (failures) process.exitCode = 1
