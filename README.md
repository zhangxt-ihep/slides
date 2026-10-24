# Slides Hub

Slidev hub — 所有报告共用一个环境（依赖、主题只装一次），每个报告是 `slidev/slides/<name>/` 下的一个 deck。

**Published decks:** https://zhangxt-ihep.github.io/slides/

- [FTS-XRootD Workshop 2026](https://zhangxt-ihep.github.io/slides/fts-xrootd-workshop-2026/) — scholarly 主题
- [JUNO Collaboration Summer 2026](https://zhangxt-ihep.github.io/slides/juno-collaboration-summer-2026/) — neversink 主题
- [CEPC Workshop 2026 — Grid Data Transfer Infrastructure for CEPC](https://zhangxt-ihep.github.io/slides/cepc-workshop-2026/) — scholarly 主题

## Layout

- `slidev/`: hub 根 — 共享依赖（`package.json`）、共享资源（`public/`）、地图脚本、QA 工具
- `slidev/slides/<name>/`: 每个报告一个目录（自包含）
  - `slides.md`: deck 入口（部署的入口）
  - `style.css` 或 `styles/index.css`: **deck 私有样式**（按需自建）
  - `public/`: deck 私有资源（或软链到 hub 共享 `public/`）
  - `assets/`: 源资源
  - 额外的 `*.md`（如 juno 的 `plenary-summary.md`）不作为网页入口构建；**提交到公开仓库后，文件本身仍然公开**
- `slidev/private/<name>/`: **私有报告**（同结构）— 已 gitignore：不进 git、不部署，仅本地预览/导出
- `docs/`: provenance 与版权说明
- `slidev/new-report.sh`: 一键新建报告

## Commands

```bash
cd slidev
npm ci                                    # 首次安装依赖

# 预览某个报告
npx slidev slides/fts-xrootd-workshop-2026/slides.md

# 导出交付 PDF：先按下节确认并建立 artifacts 软链，文件名使用实际版本日期
npx slidev export slides/fts-xrootd-workshop-2026/slides.md --per-slide \
  --output "slides/fts-xrootd-workshop-2026/artifacts/FTS_IHEP_YYYYMMDD.pdf"

# 新建报告（自动创建目录 + public 软链 + 骨架 md）
./new-report.sh my-new-report

# 现有报告专项检查 + 图片预加载检查器的回归测试
npm run check
```

`npm run dev`、`npm run build`、`npm run export`仍是FTS报告的快捷命令，不会自动选择当前deck。`npm run export`输出到`qa/output/`供FTS专项检查，不是正式交付。其他报告请显式指定入口。

## 交付与临时文件

每个deck用一个被Git忽略的`artifacts`软链指向用户确认的交付目录（本机可使用Nextcloud）。先检查已有链接；正确的链接直接复用，不反复询问，不覆盖未知链接或普通目录。首次建立示例，工作目录为`slidev/`：

```bash
deck=fts-xrootd-workshop-2026
ln -s "<已确认且存在的交付目录>" "slides/$deck/artifacts"
```

- 正式PDF和交付说明写入`artifacts/`，使用清楚的版本文件名；覆盖已有文件须经用户确认。私有deck同理，路径改为`private/<name>/artifacts/`。
- 构建、临时PDF、截图和日志放在独立临时工作区或已忽略的`qa/output/`，不要混进同步交付目录。
- 导出后检查实际PDF的页数、分页、图片、字体和链接；浏览器截图正常不等于PDF正常。PPTX仅在需要可编辑文件时导出，复杂布局可能失真。
- 同步目录里的本地文件不等于云端交付成功；使用已有同步方式核对远端目标文件，无法验证时明确标记“待同步验证”。不要分享包含私有准备资料的整个目录。

## Adding a new deck

```bash
cd slidev
./new-report.sh juno-dci-2026      # 创建骨架
# 编辑 slides/juno-dci-2026/slides.md
git add slides/juno-dci-2026
git commit -m "add juno-dci-2026"
git push                            # → Actions 自动构建并发布
```

## Private decks（不公开的报告）

不公开的报告放 `slidev/private/<name>/` —— **已 gitignore，永不进 git、永不部署**：

```bash
cd slidev
./new-report.sh --private internal-review        # 创建（骨架同公开 deck）
npx slidev private/internal-review/slides.md     # 本地预览
npx slidev export private/internal-review/slides.md --per-slide \
  --output private/internal-review/artifacts/report.pdf   # 导出 PDF
```

- 源码只留在本机；CI 看不到它（已 gitignore，且不在 `slides/` 下，任何构建循环都不会碰）
- 分享产物时照旧用 `artifacts` 软链指向 Nextcloud（分享链接可设密码/有效期）
- 想要版本历史/多机同步：可把 `private/` 升级为独立的**免费私有 repo**（私有 repo 免费；"私有 repo + Pages"才需要 Pro）

## GitHub Pages

推送到 `main` 会：跑 QA 检查 → 构建 `slides/` 下**所有**报告 → 生成根导航页 → 部署到 GitHub Pages。

发布结构：

```
https://zhangxt-ihep.github.io/slides/                      ← 导航页
https://zhangxt-ihep.github.io/slides/<报告名>/             ← 各报告
```

workflow 用 `${{ github.event.repository.name }}` 动态生成 `--base` 路径，仓库改名无需改动。站点根的 `404.html` 是 SPA fallback，保证 `/<报告名>/<页码>` 深链接可直达。

### 图片资源与构建验收

deck自有图片放在`public/assets/`并用`/assets/...`引用；仅使用共享素材时可保留`public`软链。需要专属素材时改用deck自身的`public`目录，并带齐仍被引用的共享资源，不要通过共享软链写入。Slidev图片预加载读取源码URL，而Vite可能将显示用图片改成带哈希的URL；仅有`assets/`里的相对引用可能出现“显示正常、预加载404”。

CI在每个deck构建后检查本地图片预加载目标是否真实存在。手工验收也使用实际部署前缀，例如从`slidev/`执行：

```bash
name=cepc-workshop-2026
out="/tmp/opencode/$name-build"
npx slidev build "slides/$name/slides.md" --without-notes \
  --out "$out" --base "/slides/$name/"
node qa/check-image-preloads.mjs "$out" "/slides/$name/"
```

检查器不请求外链，也不代替浏览器或视觉验收。发布后仍应检查入口、代表性深链接和资源请求；SPA fallback可能让缺失资源返回HTML 200，不能只看HTTP状态或截图。

## Browser layout QA

以下是FTS报告的专项布局/PDF回归检查，包含固定页数、主题和页脚断言，不是所有deck的通用验收。启动`npm run dev`后执行：

```bash
BROWSER_BASE_URL=http://127.0.0.1:3030 node qa/browser-check.mjs
```

The scripts use the installed Playwright Chromium by default; set `BROWSER_EXECUTABLE=/path/to/chrome` to use a system browser. If the Playwright browser is not installed, run `npx playwright install chromium` once, or provide `BROWSER_EXECUTABLE`.

PDF export uses the same browser discovery. For a system browser, run `npx slidev export slides/<name>/slides.md --executable-path /path/to/chrome`.

## Notes

Notes committed in `slides/<name>/slides.md` are public, including speaker notes. Private notes belong in the ignored `private/` area or outside the repository. `--without-notes` removes notes from built output, not from committed source. Public delivery scripts, such as the JUNO deck's notes, may intentionally remain public.

用户授权将私有稿公开时，保留私有原稿，另建经过审查的公开副本；只复制批准公开的内容和必要资产，按约定移除私有备注。暂存前检查实际文件清单，不把筹备笔记、来源台账或QA目录一起上传。

收尾时说明预览服务是否保留、最终文件位置与同步状态，并核对Git状态。临时文件按本次任务的明确清单清理，历史PDF和原始参考资料默认保留；已有无关Git改动应列明，不能擅自删除或提交。
