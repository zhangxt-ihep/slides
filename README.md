# Slides Hub

Slidev hub — 所有报告共用一个环境（依赖、主题、样式只装一次），每个报告是 `slidev/slides/<name>/` 下的一个 deck。

**Published decks:** https://zhangxt-ihep.github.io/slides/

- [FTS-XRootD Workshop 2026](https://zhangxt-ihep.github.io/slides/fts-xrootd-2026/)

## Layout

- `slidev/`: hub 根 — 共享依赖（`package.json`）、共享样式（`style.css`）、共享资源（`public/`）、地图脚本、QA 工具
- `slidev/slides/<name>/`: 每个报告一个目录
  - `slides.md`: deck 入口
  - `public` / `style.css`: 指向 hub 共享资源的相对软链接（slidev 的 root 跟随 entry 位置，软链让共享资源在新位置可用）
- `slidev/slides/fts-xrootd-2026/`: FTS-XRootD Workshop 2026 报告（原 `slides-v2.md`）
- `docs/`: provenance 与版权说明
- `slidev/new-report.sh`: 一键新建报告（零配置）

## Commands

```bash
cd slidev
npm ci                                    # 首次安装依赖

# 预览某个报告
npx slidev slides/fts-xrootd-2026/slides.md

# 导出 PDF
npx slidev export slides/fts-xrootd-2026/slides.md --per-slide --output /tmp/report.pdf

# 新建报告（自动创建目录 + 软链 + 骨架 md）
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
https://zhangxt-ihep.github.io/slides/            ← 导航页（列出所有报告）
https://zhangxt-ihep.github.io/slides/<报告名>/    ← 各报告
```

workflow 用 `${{ github.event.repository.name }}` 动态生成 `--base` 路径，仓库改名无需改动。

## Browser layout QA

Start `npm run dev` and run:

```bash
BROWSER_BASE_URL=http://127.0.0.1:3030 node qa/browser-check.mjs
```

The scripts use the installed Playwright Chromium by default; set `BROWSER_EXECUTABLE=/path/to/chrome` to use a system browser. If the Playwright browser is not installed, run `npx playwright install chromium` once, or provide `BROWSER_EXECUTABLE`.

PDF export uses the same browser discovery. For a system browser, run `npx slidev export slides/<name>/slides.md --executable-path /path/to/chrome`.

## Notes

Private speaker notes, preparation material, raw evidence, and historical QA are archived outside this tree. They are not required to build the decks.
