import assert from 'node:assert/strict'
import { readFile, writeFile } from 'node:fs/promises'

const base = new URL('./', import.meta.url)
const land = JSON.parse(await readFile(new URL('data/ne_110m_land.geojson', base), 'utf8'))
const regular = (await readFile(new URL('node_modules/@fontsource/arimo/files/arimo-latin-400-normal.woff2', base))).toString('base64')
const bold = (await readFile(new URL('node_modules/@fontsource/arimo/files/arimo-latin-700-normal.woff2', base))).toString('base64')
const mercator = latitude => Math.log(Math.tan(Math.PI / 4 + Math.max(-85, Math.min(85, latitude)) * Math.PI / 360)) * 180 / Math.PI
const north = mercator(70)
const south = mercator(15)
const project = ([longitude, latitude]) => {
  assert.ok(Number.isFinite(longitude) && Number.isFinite(latitude))
  return [30 + (longitude + 12) / 144 * 700, 30 + (north - mercator(latitude)) / (north - south) * 380]
}
const point = values => values.map(value => value.toFixed(1)).join(',')
const nodes = [
  { id: 'Jiangmen', name: 'JUNO Experiment Site', location: [113.08, 22.58], label: [500, 404], subtitle: 'Jiangmen', anchor: 'start' },
  { id: 'IHEP', location: [116.40, 39.90], label: [658, 244], subtitle: 'Beijing', anchor: 'start' },
  { id: 'JINR', location: [37.17, 56.74], label: [277, 112], subtitle: 'Dubna', anchor: 'start' },
  { id: 'CC-IN2P3', location: [4.84, 45.76], label: [25, 204], subtitle: 'Lyon', anchor: 'start' },
  { id: 'CNAF', location: [11.34, 44.49], label: [147, 310], subtitle: 'Bologna', anchor: 'start' },
].map(node => ({ ...node, position: project(node.location) }))
const positions = new Map(nodes.map(node => [node.id, node.position]))
const edges = [
  { from: 'Jiangmen', to: 'IHEP', kind: 'raw', control: [721, 335] },
  { from: 'IHEP', to: 'JINR', kind: 'fts', control: [510, 95] },
  { from: 'IHEP', to: 'CC-IN2P3', kind: 'fts', control: [375, 151] },
  { from: 'IHEP', to: 'CNAF', kind: 'fts', control: [390, 365] },
  { from: 'JINR', to: 'CC-IN2P3', kind: 'fts', control: [128, 145] },
  { from: 'JINR', to: 'CNAF', kind: 'fts', control: [280, 280] },
  { from: 'CC-IN2P3', to: 'CNAF', kind: 'fts', control: [91, 321] },
]
const coastline = []
for (const feature of land.features) {
  const geometry = feature.geometry
  assert.ok(['Polygon', 'MultiPolygon'].includes(geometry.type))
  const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates
  for (const polygon of polygons) {
    const path = polygon.map(ring => `M${ring.map(coordinate => point(project(coordinate))).join('L')}Z`).join('')
    coastline.push(`<path d="${path}"/>`)
  }
}
const links = edges.map(edge => {
  const from = positions.get(edge.from)
  const to = positions.get(edge.to)
  const control = edge.control
  const trim = (location, towards) => {
    const dx = towards[0] - location[0]
    const dy = towards[1] - location[1]
    const length = Math.hypot(dx, dy)
    return [location[0] + 9 * dx / length, location[1] + 9 * dy / length]
  }
  const start = trim(from, control)
  const end = trim(to, control)
  const markers = edge.kind === 'fts' ? 'marker-start="url(#arrow-fts)" marker-end="url(#arrow-fts)"' : 'marker-end="url(#arrow-raw)"'
  const colour = edge.kind === 'fts' ? '#245b91' : '#a75816'
  return `<path class="transfer-link" data-from="${edge.from}" data-to="${edge.to}" data-kind="${edge.kind}" d="M${point(start)}Q${point(control)} ${point(end)}" stroke="${colour}" ${markers}/>`
})
const labels = nodes.map(node => {
  const [x, y] = node.position
  const [lx, ly] = node.label
  const raw = node.id === 'Jiangmen'
  const colour = raw ? '#a75816' : '#1e3a5f'
  const leaderEnd = raw ? [641, 390] : node.id === 'IHEP' ? [669, 266] : node.id === 'JINR' ? [283, 138] : node.id === 'CC-IN2P3' ? [90, 225] : [151, 284]
  return `<g data-site="${node.id}">
    <path d="M${point(node.position)}L${point(leaderEnd)}" fill="none" stroke="#707d89" stroke-width="1"/>
    <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="${colour}" stroke="white" stroke-width="2"/>
    <text class="site-name" x="${lx}" y="${ly}" fill="${colour}" text-anchor="${node.anchor}">${node.name ?? node.id}</text>
    <text class="site-detail" x="${lx}" y="${ly + 19}" text-anchor="${node.anchor}">${node.subtitle}</text>
  </g>`
})
const metadata = { projection: 'Mercator', bounds: [-12, 15, 132, 70], locations: 'Approximate city/region anchors, not surveyed facility coordinates', nodes, edges, source: 'Natural Earth 1:110m land' }
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="510" viewBox="0 0 760 510" role="img" aria-labelledby="map-title map-description">
<title id="map-title">JUNO data-transfer sites in Europe and Asia</title>
<desc id="map-description">The JUNO Experiment Site in Jiangmen sends raw data to IHEP in Beijing. IHEP, JINR in Dubna, CC-IN2P3 in Lyon and CNAF in Bologna have six bidirectional FTS connections.</desc>
<metadata><![CDATA[${JSON.stringify(metadata)}]]></metadata>
<defs>
  <clipPath id="map-clip"><rect x="15" y="15" width="730" height="420" rx="2"/></clipPath>
  <marker id="arrow-fts" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#245b91"/></marker>
  <marker id="arrow-raw" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#a75816"/></marker>
  <style>
    @font-face {font-family:Arimo;src:url(data:font/woff2;base64,${regular}) format('woff2');font-weight:400;}
    @font-face {font-family:Arimo;src:url(data:font/woff2;base64,${bold}) format('woff2');font-weight:700;}
    text {font-family:Arimo,Arial,sans-serif;}
    .transfer-link {fill:none;stroke-width:2.2;stroke-linecap:round;}
    .site-name {font-size:20px;font-weight:700;paint-order:stroke;stroke:white;stroke-width:4px;stroke-linejoin:round;}
    .site-detail {font-size:15px;fill:#475569;paint-order:stroke;stroke:white;stroke-width:3px;}
  </style>
</defs>
<rect width="760" height="510" fill="white"/>
<text x="380" y="22" text-anchor="middle" font-size="21" fill="#475569">JUNO Data Flow</text>
<g transform="translate(0 26)">
<rect x="15" y="15" width="730" height="420" fill="#f8fafc" stroke="#d5dee7"/>
<g clip-path="url(#map-clip)">
  <g fill="#e6ebee" stroke="#b7c2cc" stroke-width="0.7">${coastline.join('')}</g>
  <text x="67" y="91" font-size="18" fill="#87939e">Europe</text>
  <text x="470" y="230" font-size="22" fill="#87939e">Asia</text>
  ${links.join('\n')}
</g>
${labels.join('\n')}
<path d="M30 460H65" stroke="#a75816" stroke-width="2.2" marker-end="url(#arrow-raw)"/>
<text x="78" y="465" font-size="15" fill="#475569">Raw Data To IHEP</text>
<path d="M282 460H318" stroke="#245b91" stroke-width="2.2" marker-start="url(#arrow-fts)" marker-end="url(#arrow-fts)"/>
<text x="331" y="465" font-size="15" fill="#475569">FTS Inter-Site Transfers</text>
</g>
</svg>`
await writeFile(new URL('public/maps/juno-fts-network.svg', base), svg)
console.log('Created geographic SVG: five sites, one raw-data arrow, six bidirectional FTS links')
