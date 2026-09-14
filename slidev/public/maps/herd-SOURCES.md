# HERD transfer diagram sources and scope

- Land geometry: Natural Earth 1:110m land, https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson . The retained source is `data/ne_110m_land.geojson` relative to the Slidev project; Natural Earth data are public domain under https://www.naturalearthdata.com/about/terms-of-use/.
- Typography: embedded Arimo 400/700 from the installed `@fontsource/arimo` package; the SIL OFL text is retained at `/ARIMO-OFL.txt`.
- Station drawing: an original editable schematic of a Chinese Space Station T-configuration with solar wings. It is not an official logo, engineering drawing, or current operational-satellite claim.
- Deployment wording: `HERD deployment: 2029 (planned)` is intentionally future/planned wording supplied for this diagram.
- Data semantics: CERN -> IHEP is solid `Beam Test Data`; Chinese Space Station -> IHEP is dashed `Raw data, future`. Both are logical flows. The dashed space-to-ground path does not claim that the path itself uses FTS.
- Positions and curvature are schematic for slide readability, not surveyed coordinates or a scale orbital model. Regenerate with `node build-herd-map.mjs` from the Slidev directory.
