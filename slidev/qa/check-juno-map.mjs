import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const path = fileURLToPath(new URL('../public/maps/juno-fts-network.svg', import.meta.url))
assert.ok(existsSync(path), 'An editable geographic map must be delivered')
const svg = readFileSync(path, 'utf8')
const metadata = JSON.parse(svg.match(/<metadata><!\[CDATA\[([\s\S]*?)\]\]><\/metadata>/)[1])
assert.deepEqual(metadata.nodes.map(node => node.id).sort(), ['CNAF', 'CC-IN2P3', 'IHEP', 'JINR', 'Jiangmen'].sort())
const expected = ['IHEP|JINR', 'CC-IN2P3|IHEP', 'CNAF|IHEP', 'CC-IN2P3|JINR', 'CNAF|JINR', 'CC-IN2P3|CNAF'].sort()
const links = [...svg.matchAll(/<path class="transfer-link"[^>]+>/g)].map(match => match[0])
assert.equal(links.length, 7)
const raw = links.filter(link => link.includes('data-kind="raw"'))
assert.equal(raw.length, 1)
assert.ok(raw[0].includes('data-from="Jiangmen"') && raw[0].includes('data-to="IHEP"'))
assert.ok(raw[0].includes('marker-end=') && !raw[0].includes('marker-start='))
const mesh = links.filter(link => link.includes('data-kind="fts"'))
assert.deepEqual(mesh.map(link => [link.match(/data-from="([^"]+)"/)[1], link.match(/data-to="([^"]+)"/)[1]].sort().join('|')).sort(), expected)
assert.ok(mesh.every(link => link.includes('marker-start=') && link.includes('marker-end=')))
assert.ok(!svg.includes('NaN') && !svg.includes('Infinity'))
console.log('PASS: five sites; Jiangmen→IHEP; all six bidirectional FTS links; valid SVG coordinates')
