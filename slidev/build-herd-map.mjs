import assert from 'node:assert/strict'
import { readFile, writeFile } from 'node:fs/promises'

const base = new URL('./', import.meta.url)
const land = JSON.parse(await readFile(new URL('data/ne_110m_land.geojson', base), 'utf8'))
const regular = (await readFile(new URL('node_modules/@fontsource/arimo/files/arimo-latin-400-normal.woff2', base))).toString('base64')
const bold = (await readFile(new URL('node_modules/@fontsource/arimo/files/arimo-latin-700-normal.woff2', base))).toString('base64')
const radians = degrees => degrees * Math.PI / 180
const centerLongitude = radians(70)
const centerLatitude = radians(15)
const earth = { cx: 380, cy: 620, rx: 470, ry: 305 }
const project = ([longitude, latitude]) => {
  assert.ok(Number.isFinite(longitude) && Number.isFinite(latitude))
  const lambda = radians(longitude) - centerLongitude
  const phi = radians(latitude)
  const cosC = Math.sin(centerLatitude) * Math.sin(phi) + Math.cos(centerLatitude) * Math.cos(phi) * Math.cos(lambda)
  return {
    visible: cosC >= 0,
    x: earth.cx + earth.rx * Math.cos(phi) * Math.sin(lambda),
    y: earth.cy - earth.ry * (Math.cos(centerLatitude) * Math.sin(phi) - Math.sin(centerLatitude) * Math.cos(phi) * Math.cos(lambda)),
  }
}
const point = ({ x, y }) => `${x.toFixed(1)},${y.toFixed(1)}`
const interpolate = (a, b, fraction) => [a[0] + (b[0] - a[0]) * fraction, a[1] + (b[1] - a[1]) * fraction]
const crossing = (a, b) => {
  let low = 0
  let high = 1
  for (let index = 0; index < 14; index += 1) {
    const middle = (low + high) / 2
    if (project(interpolate(a, b, middle)).visible === project(a).visible) low = middle
    else high = middle
  }
  return project(interpolate(a, b, project(a).visible ? low : high))
}
const ringPath = ring => {
  const parts = []
  let current = []
  const flush = () => {
    if (current.length > 2) parts.push(`M${current.map(point).join('L')}Z`)
    current = []
  }
  for (let index = 0; index < ring.length - 1; index += 1) {
    const from = project(ring[index])
    const to = project(ring[index + 1])
    if (from.visible && to.visible) {
      if (!current.length) current.push(from)
      current.push(to)
    } else if (from.visible !== to.visible) {
      const edge = crossing(ring[index], ring[index + 1])
      if (from.visible) {
        if (!current.length) current.push(from)
        current.push(edge)
        flush()
      } else {
        current = [edge]
        if (to.visible) current.push(to)
      }
    } else {
      flush()
    }
  }
  flush()
  return parts.join('')
}
const coastline = []
for (const feature of land.features) {
  const polygons = feature.geometry.type === 'Polygon' ? [feature.geometry.coordinates] : feature.geometry.coordinates
  for (const polygon of polygons) {
    for (const ring of polygon) {
      const path = ringPath(ring)
      if (path) coastline.push(`<path d="${path}"/>`)
    }
  }
}
const cern = project([6.055, 46.233])
const ihep = project([116.4, 39.9])
const trim = (from, to, distance) => {
  const length = Math.hypot(to[0] - from[0], to[1] - from[1])
  return [from[0] + distance * (to[0] - from[0]) / length, from[1] + distance * (to[1] - from[1]) / length]
}
const beamControl = [365, 170]
const beamStart = trim([cern.x, cern.y], beamControl, 12)
const beamEnd = trim([ihep.x, ihep.y], beamControl, 14)
const beamPath = `M${point({ x: beamStart[0], y: beamStart[1] })}Q${beamControl.join(' ')} ${point({ x: beamEnd[0], y: beamEnd[1] })}`
const rawStart = trim([406, 142], [590, 226], 10)
const rawEnd = trim([ihep.x, ihep.y], [590, 226], 14)
const nodes = [
  { id: 'CERN', location: [6.055, 46.233], position: [cern.x, cern.y], label: [34, 386], subtitle: 'Europe', anchor: 'start' },
  { id: 'IHEP', location: [116.4, 39.9], position: [ihep.x, ihep.y], label: [714, 420], subtitle: 'Beijing · FTS', anchor: 'end' },
  { id: 'Chinese Space Station', position: [380, 112], label: [380, 34], subtitle: 'HERD deployment: 2029 (planned)', anchor: 'middle' },
]
const edges = [
  { from: 'CERN', to: 'IHEP', kind: 'beam-test', label: 'Beam Test Data', planned: false, control: beamControl },
  { from: 'Chinese Space Station', to: 'IHEP', kind: 'raw-future', label: 'Raw data, future', planned: true, control: [590, 226] },
]
const metadata = { projection: 'Orthographic schematic', earth, locations: 'CERN and IHEP are approximate geographic anchors; the station is an orbital schematic', nodes, edges, source: 'Natural Earth 1:110m land' }
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="570" viewBox="0 0 760 570" role="img" aria-labelledby="herd-map-title herd-map-description">
<title id="herd-map-title">HERD experiment data context with FTS at IHEP</title>
<desc id="herd-map-description">CERN in Europe sends Beam Test Data to IHEP in Beijing. A dashed planned logical Raw data path is shown from the Chinese Space Station to IHEP for the planned HERD deployment in 2029. The station is a schematic and is not presented as an operational satellite; the space-to-ground path is not claimed to use FTS.</desc>
<metadata><![CDATA[${JSON.stringify(metadata)}]]></metadata>
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#f7f9fc"/></linearGradient>
  <linearGradient id="earth" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#245b91"/><stop offset="1" stop-color="#1e3a5f"/></linearGradient>
  <radialGradient id="atmosphere" cx="50%" cy="100%" r="80%"><stop offset="0" stop-color="#dce7f2" stop-opacity="0.9"/><stop offset="1" stop-color="#dce7f2" stop-opacity="0"/></radialGradient>
  <clipPath id="earth-clip"><ellipse cx="${earth.cx}" cy="${earth.cy}" rx="${earth.rx}" ry="${earth.ry}"/></clipPath>
  <marker id="arrow-beam" viewBox="-1 -1 12 12" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#1e3a5f" stroke="white" stroke-width="1.5" paint-order="stroke"/></marker>
  <marker id="arrow-raw" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#245b91"/></marker>
  <style>
    @font-face {font-family:Arimo;src:url(data:font/woff2;base64,${regular}) format('woff2');font-weight:400;}
    @font-face {font-family:Arimo;src:url(data:font/woff2;base64,${bold}) format('woff2');font-weight:700;}
    text {font-family:Arimo,Arial,sans-serif;}
    .node-name,.edge-label,.station-title {font-weight:700;paint-order:stroke;stroke:#ffffff;stroke-linejoin:round;}
    .node-name {font-size:26px;stroke-width:7px;}
    .node-detail {font-size:18px;fill:#4b5563;paint-order:stroke;stroke:#ffffff;stroke-width:5px;}
    .edge-label {font-size:24px;stroke-width:7px;}
    .station-title {font-size:24px;stroke-width:7px;}
    .station-detail {font-size:20px;fill:#1e3a5f;paint-order:stroke;stroke:#ffffff;stroke-width:6px;}
    .leader {fill:none;stroke:#707d89;stroke-width:1.2;}
  </style>
</defs>
<rect width="760" height="570" fill="white"/>
<text x="380" y="22" text-anchor="middle" font-size="21" fill="#475569">HERD Data Flow</text>
<g transform="translate(0 32)">
<rect width="760" height="520" fill="url(#sky)"/>
<ellipse cx="380" cy="620" rx="520" ry="326" fill="url(#atmosphere)"/>
<path d="M26 390Q380 270 734 390" fill="none" stroke="#dce7f2" stroke-width="8" opacity="0.55"/>
<ellipse cx="${earth.cx}" cy="${earth.cy}" rx="${earth.rx}" ry="${earth.ry}" fill="url(#earth)" stroke="#1e3a5f" stroke-width="2.5"/>
<g clip-path="url(#earth-clip)" fill="#dce7f2" stroke="#b7c2cc" stroke-width="0.7" opacity="0.95">${coastline.join('')}</g>
<g clip-path="url(#earth-clip)" fill="none" stroke="#dce7f2" stroke-width="1" opacity="0.23">
  <path d="M-40 456Q380 320 800 456"/><path d="M-30 505Q380 365 790 505"/><path d="M160 315Q290 450 335 555"/><path d="M600 315Q470 450 425 555"/>
</g>
<path d="${beamPath}" fill="none" stroke="white" stroke-width="8" stroke-linecap="round"/>
<path data-from="CERN" data-to="IHEP" data-kind="beam-test" data-label="Beam Test Data" d="${beamPath}" fill="none" stroke="#1e3a5f" stroke-width="3.2" stroke-linecap="round" marker-end="url(#arrow-beam)"/>
<path data-from="Chinese Space Station" data-to="IHEP" data-kind="raw-future" data-label="Raw data, future" d="M${point({ x: rawStart[0], y: rawStart[1] })}Q590 226 ${point({ x: rawEnd[0], y: rawEnd[1] })}" fill="none" stroke="#245b91" stroke-width="3.2" stroke-linecap="round" stroke-dasharray="10 8" marker-end="url(#arrow-raw)"/>
<text class="edge-label" x="346" y="290" fill="#1e3a5f" text-anchor="middle">Beam Test Data</text>
<text class="edge-label" x="555" y="252" fill="#245b91" text-anchor="middle">Raw Data (Future)</text>
<g data-node="Chinese Space Station">
  <path d="M240 136Q380 22 520 136" fill="none" stroke="#245b91" stroke-width="1.2" stroke-dasharray="4 7" opacity="0.65"/>
  <g transform="translate(380 112)">
    <rect x="-12" y="-27" width="24" height="54" rx="3" fill="#dce7f2" stroke="#1e3a5f" stroke-width="2"/>
    <path d="M-72 0H72M0-27V27" stroke="#1e3a5f" stroke-width="7" stroke-linecap="round"/>
    <path d="M-103-18H-77V18H-103ZM77-18H103V18H77Z" fill="#245b91" stroke="#1e3a5f" stroke-width="1.5"/>
    <path d="M-96-18V18M-89-18V18M-82-18V18M82-18V18M89-18V18M96-18V18" stroke="#dce7f2" stroke-width="1" opacity="0.9"/>
    <circle cx="0" cy="0" r="5" fill="#ffffff" stroke="#1e3a5f" stroke-width="2"/>
  </g>
  <text class="station-title" x="380" y="34" fill="#1e3a5f" text-anchor="middle">Chinese Space Station</text>
  <text class="station-detail" x="380" y="61" text-anchor="middle">HERD Deployment: 2029 (Planned)</text>
</g>
<g data-node="CERN">
  <path class="leader" d="M${cern.x.toFixed(1)} ${cern.y.toFixed(1)}L72 402"/>
  <circle cx="${cern.x.toFixed(1)}" cy="${cern.y.toFixed(1)}" r="8" fill="#1e3a5f" stroke="#ffffff" stroke-width="2.5"/>
  <text class="node-name" x="34" y="386" fill="#1e3a5f">CERN</text>
  <text class="node-detail" x="34" y="410">Europe</text>
</g>
<g data-node="IHEP">
  <path class="leader" d="M${ihep.x.toFixed(1)} ${ihep.y.toFixed(1)}L696 448"/>
  <circle cx="${ihep.x.toFixed(1)}" cy="${ihep.y.toFixed(1)}" r="8" fill="#1e3a5f" stroke="#ffffff" stroke-width="2.5"/>
  <text class="node-name" x="714" y="420" fill="#1e3a5f" text-anchor="end">IHEP</text>
  <text class="node-detail" x="714" y="445" text-anchor="end">Beijing · FTS</text>
</g>
</g>
<rect x="0" y="532" width="760" height="38" fill="white"/>
<rect x="0.5" y="32.5" width="759" height="499" fill="none" stroke="#d5dee7"/>
<path d="M30 550H72" fill="none" stroke="#245b91" stroke-width="2.5" stroke-dasharray="8 6"/>
<text x="85" y="555" font-size="15" fill="#475569">Dashed = Planned Logical Path</text>
</svg>`
await writeFile(new URL('public/maps/herd-fts-network.svg', base), svg)
console.log('Created HERD orbital SVG: three endpoints and two logical data edges')
