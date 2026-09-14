# Final Slidev Deck

The final report is `slides-v2.md`. Dependencies are locked in `package-lock.json`.

```bash
npm ci
npm run check
npm run build
npm run dev
npm run export
```

Build output is `dist/`; PDF output is `qa/output/`. Both are ignored. Use `BROWSER_BASE_URL` and `BROWSER_EXECUTABLE` with `qa/browser-check.mjs` for portable browser QA.

`style.css`, `DESIGN.md`, `public/`, and `data/` are the reusable presentation inputs. `public/` retains asset attribution and third-party rights notices. Private notes and raw validation evidence are kept outside the publish tree.
