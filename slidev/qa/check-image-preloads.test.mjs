import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const checker = fileURLToPath(new URL('./check-image-preloads.mjs', import.meta.url))

test('image preload links resolve to files under the supplied base', t => {
  const dist = mkdtempSync(path.join(tmpdir(), 'image-preloads-'))
  const outside = `${dist}-outside.png`
  t.after(() => {
    rmSync(dist, { recursive: true, force: true })
    rmSync(outside, { force: true })
  })
  const put = (name, contents = '') => {
    const file = path.join(dist, name)
    mkdirSync(path.dirname(file), { recursive: true })
    writeFileSync(file, contents)
  }
  const run = base => spawnSync(process.execPath, [checker, dist, base], { encoding: 'utf8' })
  const index = html => put('index.html', html)

  put('assets/photo-HASH.png')
  index('<link rel="preload" as="image" href="/slides/deck/./assets/photo.png">')
  const missingRaw = run('/slides/deck/')
  assert.equal(missingRaw.status, 1, missingRaw.stderr)
  assert.match(missingRaw.stderr, /Missing image preload file .*\/slides\/deck\/\.\/assets\/photo\.png/)
  put('assets/photo.png')
  assert.equal(run('/slides/deck/').status, 0)

  put('assets/space name.png')
  index('<link href="./assets/space%20name.png?v=2#preview" as="image" rel="preload">')
  assert.equal(run('/slides/deck/').status, 0)
  index('<link rel="preload" as="image" href="/slides/other/assets/missing.png">')
  assert.notEqual(run('/slides/deck/').status, 0)
  index('<link rel="preload" as="image" href="./assets/missing.png">')
  const wrongBase = run('/wrong/base/')
  assert.equal(wrongBase.status, 1, wrongBase.stderr)
  index('<link rel="preload" as="image" href="https://example.test/a.png"><link rel="preload" as="image" href="http://example.test/a.png"><link rel="preload" as="image" href="//cdn.test/a.png"><link rel="preload" as="image" href="data:image/png;base64,AA==">')
  assert.equal(run('/slides/deck/').status, 0)
  const invalidBase = run('http://example.test/')
  assert.equal(invalidBase.status, 2)
  assert.match(invalidBase.stderr, /Usage:/)
  index('<html></html>')
  assert.equal(run('/slides/deck/').status, 0, 'zero preloads is valid')
  mkdirSync(path.join(dist, 'assets', 'directory.png'), { recursive: true })
  index('<link rel="preload" as="image" href="./assets/directory.png">')
  const directory = run('/slides/deck/')
  assert.equal(directory.status, 1, directory.stderr)

  writeFileSync(outside, 'outside dist')
  symlinkSync(outside, path.join(dist, 'assets', 'outside.png'))
  index('<link rel="preload" as="image" href="./assets/outside.png">')
  const symlink = run('/slides/deck/')
  assert.equal(symlink.status, 1, symlink.stderr)
  assert.match(symlink.stderr, /outside dist/)
})
