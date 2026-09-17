# Slides Hub

Slidev hub — 所有报告共用一个环境（依赖、主题只装一次），每个报告是 `slidev/slides/<name>/` 下的一个 deck。

**Published decks:** https://zhangxt-ihep.github.io/slides/

- [FTS-XRootD Workshop 2026](https://zhangxt-ihep.github.io/slides/fts-xrootd-workshop-2026/) — scholarly 主题
- [JUNO Collaboration Summer 2026](https://zhangxt-ihep.github.io/slides/juno-collaboration-summer-2026/) — neversink 主题

## Layout

- `slidev/`: hub 根 — 共享依赖（`package.json`）、共享资源（`public/`）、地图脚本、QA 工具
- `slidev/slides/<name>/`: 每个报告一个目录（自包含）
  - `slides.md`: deck 入口
  - `style.css` 或 `styles/index.css`: **deck 私有样式**（按需自建）
  - `public/`: deck 私有资源（或软链到 hub 共享 `public/`）
  - `assets/`: 源资源
- `docs/`: provenance 与版权说明
- `slidev/new-report.sh`: 一键新建报告

## Commands

```bash
cd slidev
npm ci                                    # 首次安装依赖

# 预览某个报告
npx slidev slides/fts-xrootd-workshop-2026/slides.md

# 导出 PDF
npx slidev export slides/fts-xrootd-workshop-2026/slides.md --per-slide --output /tmp/report.pdf

# 新建报告（自动创建目录 + public 软链 + 骨架 md）
./new-report.sh my-new-report

# QA 检查
npm run check
```

## Adding a new deck

```bash
cd slidev
./new-report.sh juno-dci-2026      # 创建骨架
# 编辑 slides/juno-dci-2026/slides.md
git add slides/juno-dci-2026
git commit -m "add juno-dci-2026"
git push                            # → Actions 自动构建并发布
```

## GitHub Pages

推送到 `main` 会：跑 QA 检查 → 构建 `slides/` 下**所有**报告 → 生成根导航页 → 部署到 GitHub Pages。

发布结构：

```
https://zhangxt-ihep.github.io/slides/                      ← 导航页
https://zhangxt-ihep.github.io/slides/<报告名>/             ← 各报告
```

workflow 用 `${{ github.event.repository.name }}` 动态生成 `--base` 路径，仓库改名无需改动。站点根的 `404.html` 是 SPA fallback，保证 `/<报告名>/<页码>` 深链接可直达。

## Browser layout QA

Start `npm run dev` and run:

```bash
BROWSER_BASE_URL=http://127.0.0.1:3030 node qa/browser-check.mjs
```

The scripts use the installed Playwright Chromium by default; set `BROWSER_EXECUTABLE=/path/to/chrome` to use a system browser. If the Playwright browser is not installed, run `npx playwright install chromium` once, or provide `BROWSER_EXECUTABLE`.

PDF export uses the same browser discovery. For a system browser, run `npx slidev export slides/<name>/slides.md --executable-path /path/to/chrome`.

## Notes

Private speaker notes, preparation material, raw evidence, and historical QA are archived outside this tree. They are not required to build the decks.
