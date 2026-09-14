# FTS-XRootD Workshop Report

This repository contains the final 22-slide Slidev source and the assets needed to build it.

**Published deck:** https://zhangxt-ihep.github.io/FTS-XRootD-Workshop-2026/

**Source repository:** https://github.com/zhangxt-ihep/FTS-XRootD-Workshop-2026

## Layout

- `slidev/slides-v2.md`: final deck entry point.
- `slidev/public/`: published images, logos, maps, and attribution notices.
- `slidev/data/ne_110m_land.geojson`: Natural Earth public-domain map input.
- `docs/`: concise public provenance and rights notes.
- `slidev/qa/`: reusable checks; generated output is ignored under `slidev/qa/output/`.

Private speaker notes, preparation material, raw evidence, and historical QA are archived outside this tree. They are not required to build the final deck.

## Commands

```bash
cd slidev
npm ci
npm run check
npm run build
npm run dev
npm run export
```

`npm run dev` serves the final deck on `http://127.0.0.1:3030`. `npm run build` creates a note-free static site in `slidev/dist/`. `npm run export` writes `slidev/qa/output/FTS_IHEP_v2.pdf`; it never writes to the local `artifacts` symlink.

## GitHub Pages

Pushes to `main` run the checks, build the deck with its repository subpath, and deploy `slidev/dist/` through GitHub Pages. The workflow can also be started manually from the repository's Actions tab.

For browser layout QA, start `npm run dev` and run `BROWSER_BASE_URL=http://127.0.0.1:3030 node qa/browser-check.mjs`. The scripts use the installed Playwright Chromium by default; set `BROWSER_EXECUTABLE=/path/to/chrome` to use a system browser. If the Playwright browser is not installed, run `npx playwright install chromium` once, or provide `BROWSER_EXECUTABLE`.

PDF export uses the same browser discovery. For a system browser, run `npm run export -- --executable-path /path/to/chrome`.
