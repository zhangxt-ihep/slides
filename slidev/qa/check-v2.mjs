import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { parseSync } from '@slidev/parser'

const entry = fileURLToPath(new URL('../slides/fts-xrootd-workshop-2026/slides.md', import.meta.url))
assert.ok(existsSync(entry), 'The final v2 entry must exist')
const allSlides = parseSync(readFileSync(entry, 'utf8')).slides
const deck = { slides: allSlides.filter(slide => slide.frontmatter.layout !== 'section') }
assert.equal(allSlides.length, 22, 'The deck includes the completed FTS4 test bed and summary')
assert.equal(deck.slides.length, 18)
assert.deepEqual(allSlides.filter(slide => slide.frontmatter.layout === 'section').map(slide => slide.frontmatter.title), ['FTS Use Cases at IHEP', 'FTS Monitoring Developed at IHEP', 'Data Challenge 27 Plans', 'FTS4 Status'])
assert.equal(allSlides[2].frontmatter.layout, 'section')
assert.equal(allSlides[3].frontmatter.title, 'FTS Instance at IHEP')
assert.equal(allSlides[9].frontmatter.layout, 'section')
assert.equal(allSlides[10].frontmatter.title, 'FTS Transfer Monitoring System at IHEP')
assert.match(deck.slides[1].content, /<h2>4\. FTS4 Status<\/h2>\s*<ul>\s*<li>FTS4 Test Bed<\/li>\s*<\/ul>/)
for (const text of ['FTS Deployment and Instance', 'FTS for JUNO Experiment', 'FTS for HERD Experiment', 'FTS Operation and Issues', '<h2>5. Summary</h2>']) assert.ok(deck.slides[1].content.includes(text))
assert.equal(deck.slides[0].frontmatter.theme, 'scholarly')
assert.equal(deck.slides[0].frontmatter.authors.length, 2)
assert.ok(deck.slides[0].frontmatter.authors.every(author => author.institution === 'Institute of High Energy Physics, Chinese Academy of Sciences'))
assert.equal(deck.slides[0].frontmatter.authors[0].name, 'Xuantong Zhang')
assert.equal(deck.slides[0].frontmatter.authors[0].email, 'zhangxuantong@ihep.ac.cn')
assert.equal(deck.slides[0].frontmatter.authors[1].name, 'Xiaomei Zhang, Xiao Han')
assert.ok(!deck.slides[0].frontmatter.authors[0].name.includes('('))
assert.equal(deck.slides[1].frontmatter.layout, 'default')
assert.equal(deck.slides[2].frontmatter.layout, 'default')
assert.equal(deck.slides[3].frontmatter.layout, 'two-cols')
assert.equal(deck.slides[4].frontmatter.title, 'JUNO FTS Operations in 2026')
assert.notEqual(deck.slides[4].frontmatter.reserved, true)
assert.ok(deck.slides[3].content.includes('multipurpose neutrino observatory with a broad physics program'))
assert.ok(deck.slides[3].content.includes('DIRAC'))
assert.ok(deck.slides[3].content.includes('FTS distributes experiment data, such as'))
for (const text of ['~37.9 PB', 'Disk 20.2 PB', 'Tape 17.7 PB', '11.65 PB', '6,333,642', '778 GB', '1,563 files']) {
  assert.ok(allSlides.some(slide => slide.content.includes(text)), `Missing published statistic: ${text}`)
}
assert.equal(deck.slides[5].frontmatter.title, 'HERD Experiment with FTS')
assert.ok(deck.slides[5].content.includes('Rucio'))
assert.ok(deck.slides[5].content.includes('2029'))
assert.equal(deck.slides[0].frontmatter.fontsize, '18px')
assert.equal(deck.slides[0].frontmatter.footerLeft, undefined)
assert.equal(deck.slides[0].frontmatter.htmlAttrs['data-fts-deck'], 'v2')
assert.ok(deck.slides[4].content.includes('JUNO Transfers This Year'))
assert.equal(deck.slides[6].frontmatter.title, 'FTS Operation Issues')
for (const text of ['Issue 1: Multihop Transfers With DIRAC', 'Sep 2025–Mar 2026', 'IHEP → CNAF → JINR', 'same CNAF file', 'dedicated relay directory', 'Request To FTS', 'NOT_USED', 'not an FTS issue']) {
  assert.ok(deck.slides[6].content.includes(text), `Missing issue detail: ${text}`)
}
assert.ok(!deck.slides[6].content.includes('Issue 2'))
for (const text of ['manual cleanup', 'OR B:', 'hop 2 succeeds', "normal transfer's destination"]) assert.ok(deck.slides[6].content.includes(text))
assert.equal(deck.slides[7].frontmatter.title, 'FTS Operation Issues')
for (const text of ['Issue 2: Concurrency Control During Transfer Bursts', 'tens of thousands of transfers', '~200 MB per file', 'MaxUrlCopyProcesses', 'Storage Configuration', 'Link Configuration', 'per host', 'inbound / outbound', 'Operational Cost', 'Question To FTS']) {
  assert.ok(deck.slides[7].content.includes(text), `Missing concurrency detail: ${text}`)
}
assert.equal(deck.slides[8].frontmatter.title, 'FTS Transfer Monitoring System at IHEP')
assert.equal(deck.slides[8].frontmatter.layout, 'two-cols')
assert.deepEqual([...deck.slides[8].content.matchAll(/data-stage="([^"]+)"/g)].map(match => match[1]), ['FTS3', 'ActiveMQ', 'MonPipe', 'Elasticsearch', 'Grafana'])
for (const text of ['fts-activemq Publisher', 'topics', 'multiple consumers', 'We would like', 'CERN FTS monitoring', 'DCI-managed containers', 'shared IHEP Computing Center service', 'Python STOMP consumer', 'Ruby dependency compatibility issues with Logstash', "rather than use CERN's"]) {
  assert.ok(deck.slides[8].content.includes(text), `Missing monitoring detail: ${text}`)
}
assert.equal([...deck.slides[8].content.matchAll(/<img /g)].length, 5)
assert.ok(deck.slides[8].content.includes('/logos/fts-monitoring.png'))
assert.ok(deck.slides[8].content.includes('/logos/monpipe-code.svg'))
assert.ok(deck.slides[8].content.includes('directory-based workload tags'))
assert.ok(deck.slides[8].content.includes('IHEP-Developed STOMP Consumer'))
assert.ok(deck.slides[8].content.includes('IHEP-Designed Dashboards'))
assert.equal(deck.slides[9].frontmatter.title, 'FTS Transfer Monitoring')
assert.equal(deck.slides[10].frontmatter.title, 'Raw Data Transfer Monitoring')
assert.ok(deck.slides[9].content.includes('<figcaption>Dashboard For Admins</figcaption>'))
assert.ok(deck.slides[10].content.includes('<figcaption>Dashboard For Shifters</figcaption>'))
assert.ok(deck.slides[9].content.includes('/dashboard-admin.png'))
assert.ok(deck.slides[9].content.includes('data type or workload'))
assert.ok(deck.slides[10].content.includes('/dashboard-shift.png'))
assert.ok(deck.slides[10].content.includes('Server Resource Summary'))
assert.ok(deck.slides[10].content.includes('active transfers and FTS connections by link'))
assert.equal(deck.slides[11].frontmatter.title, 'AI-Assisted Diagnostics System')
assert.deepEqual([...deck.slides[11].content.matchAll(/data-step="([^"]+)"/g)].map(match => match[1]), ['collect', 'diagnose', 'review', 'learn'])
for (const text of ['<strong>FTS3</strong>', 'DIRAC', 'EOS / SEs', 'Elasticsearch', 'VOMS / IAM', 'MySQL', 'CEs', 'Multiple agents', 'Humans decide', 'choose whether to execute', 'Accepted cases', 'shared knowledge and agent skills', 'data-from="learn" data-to="diagnose"']) {
  assert.ok(deck.slides[11].content.includes(text), `Missing AI architecture detail: ${text}`)
}
assert.ok(deck.slides[11].content.includes('our in-house AI system'))
assert.equal(deck.slides[12].frontmatter.title, 'A Real Case: AI-Assisted Diagnostics For FTS')
assert.ok(deck.slides[12].content.includes('Earlier in 2026'))
for (const text of ['JUNO Production Transfer Case', 'Widespread FTS failures', 'stage timings', 'IHEP EOS', 'Human Check', 'OpenSSL library version issue', 'restored transfers', 'did not identify the exact OpenSSL issue', 'incomplete evidence', 'could shorten future investigations']) {
  assert.ok(deck.slides[12].content.includes(text), `Missing case detail: ${text}`)
}
assert.equal(allSlides[15].frontmatter.layout, 'section')
assert.equal(allSlides[15].frontmatter.title, 'Data Challenge 27 Plans')
assert.equal(allSlides[16].frontmatter.title, 'Lessons From DC24')
assert.ok(deck.slides[1].content.includes('3. Data Challenge 27 Plans'))
for (const text of ['FTS REST API', '500 MB–5 GB', 'VOMS proxies', 'disk SEs', '0.45 / 0.9 / 1.8 TB/h', 'IHEP–CNAF/IN2P3', 'transfer rates JUNO expected at the time', 'Not Tested In DC24', 'IAM/JWT authentication', 'Real experimental data', 'DIRAC-driven FTS workflows']) {
  assert.ok(allSlides[16].content.includes(text), `Missing DC24 detail: ${text}`)
}
assert.equal(allSlides[17].frontmatter.title, 'DC27 Network Targets')
for (const text of ['Candidate Routes And Targets', 'LHCONE', 'LHCOPN', '~20 Gbps', '~40 Gbps', '~2 Weeks', 'real transfer volumes', '3–4×', 'pre-challenge', 'short peak sessions', 'production continues']) {
  assert.ok(allSlides[17].content.includes(text), `Missing network plan detail: ${text}`)
}
assert.equal(allSlides[18].frontmatter.title, 'DC27 Storage And Dataset Targets')
for (const text of ['≥40 Gbps', '≥80 Gbps', '1–2 Days', 'Short Sessions Only', '2×+']) assert.ok(allSlides[17].content.includes(text))
assert.deepEqual([...allSlides[18].content.matchAll(/data-tape-step="([^"]+)"/g)].map(match => match[1]), ['source-tape', 'local-buffer', 'remote-buffer'])
for (const text of ['real reproduction datasets', 'DIRAC → FTS', 'RAW-data tests', 'IAM/JWT authentication', 'every storage instance', 'separate URLs', 'buffer space', 'production continues']) {
  assert.ok(allSlides[18].content.includes(text), `Missing storage plan detail: ${text}`)
}
assert.equal(allSlides[19].frontmatter.layout, 'section')
assert.equal(allSlides[19].frontmatter.title, 'FTS4 Status')
for (const [index, title] of [[20, 'FTS4 Test Bed'], [21, 'Summary']]) {
  assert.equal(allSlides[index].frontmatter.title, title)
  assert.notEqual(allSlides[index].frontmatter.reserved, true)
  assert.ok(allSlides[index].content.trim())
  assert.ok(!allSlides[index].content.includes('diracx01'))
}
assert.ok(allSlides[21].content.includes('<strong>FTS monitoring:</strong> track transfer performance, support cross-system diagnosis and reuse human-reviewed knowledge.'))
assert.ok(allSlides[21].content.includes('Thank You!'))
for (const text of ['PostgreSQL 16', 'FTS4 4.0.0', 'VOMS Proxy', 'JUNO IAM JWT', 'CNAF → IN2P3', '50 MiB', 'Unmanaged tokens', 'Functional validation only', 'production security hardening']) {
  assert.ok(allSlides[20].content.includes(text), `Missing test-bed detail: ${text}`)
}
assert.equal([...allSlides[21].content.matchAll(/<li>/g)].length, 4)
assert.ok(!allSlides[21].content.includes('coverage gaps'))
assert.ok(deck.slides[7].content.includes("percentage of a source SE's outbound transfer slots"))
console.log('PASS: twenty-two slides with shared affiliation, bounded FTS4 evidence and four-part summary')
