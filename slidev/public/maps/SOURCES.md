# JUNO transfer map

- Coastline data: Natural Earth 1:110m land, https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson . Source data are retained at `data/ne_110m_land.geojson` relative to the Slidev project.
- Terms: https://www.naturalearthdata.com/about/terms-of-use/ . Natural Earth data are public domain.
- Map generation: `node build-juno-map.mjs`, using a Mercator projection, regional city anchors and editable SVG paths. Embedded Arimo fonts retain the licence at `/ARIMO-OFL.txt`.
- Site positions are approximate: Jiangmen region, Beijing, Dubna near Moscow (JINR), Lyon (CC-IN2P3), Bologna (CNAF). They are not surveyed facility coordinates.
- Connections follow the user's stated workflow: Jiangmen → IHEP; all six pairs of the four computing sites have bidirectional FTS connections. Curvature is chosen for readability; these are logical data flows, not physical network routes, measured rates or a statement that the Jiangmen ingress itself uses FTS.
