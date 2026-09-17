# AGENTS.md — Slides Hub

Slidev 多报告 hub（详见 `README.md`）。每个报告是 `slides/<name>/` 下的自包含 deck。

## 工作流速览

```bash
cd slidev
./new-report.sh <name>                    # 新建 deck
npx slidev slides/<name>/slides.md        # 预览
npx slidev build slides/<name>/slides.md --out "$(pwd)/dist/<name>"   # 构建
git push                                  # → Actions 自动部署 Pages
```

## 产物导出 → Nextcloud（artifacts 软链）

**机制**：每个 deck 有一个 `artifacts` 软链接，指向本次报告的 Nextcloud 目录。
Agent 只需输出到 `artifacts/`，不用记 Nextcloud 绝对路径。

**步骤**：

1. 向用户确认本次报告的 Nextcloud 目录（通常形如
   `/home/nextcloud/工作相关/外部会议和出访/<会议名>/`）
2. 创建软链（每个 deck 一次）：
   ```bash
   cd slidev/slides/<name>
   ln -sfn "<nextcloud 目录>" artifacts
   ```
3. 导出 PDF（首选）：
   ```bash
   cd slidev
   npx slidev export slides/<name>/slides.md --per-slide \
     --output "slides/<name>/artifacts/<名字>.pdf"
   ```
4. 导出 PPTX（可选；复杂布局还原度有限，仅需可编辑时用）：
   ```bash
   npx slidev export slides/<name>/slides.md --format pptx \
     --output "slides/<name>/artifacts/<名字>.pptx"
   ```
5. 产物落在 `artifacts/`（= Nextcloud），自动同步（5 分钟内）；
   需立即同步：`systemctl start nextcloud-sync.service`

## 约定

- `artifacts` 软链**不提交 git**（已在 `.gitignore`）
- 产物**只写 `artifacts/`**，不要直接写 Nextcloud 绝对路径
- 只有 `slides.md` 参与部署；额外 `*.md`（如 juno 的 `plenary-summary.md`）保留在 deck 内不部署
- 每个 deck 私有样式（`style.css` 或 `styles/index.css`）；主题在 frontmatter 选择（scholarly / neversink）
- 站点根 `404.html` 是 SPA fallback，深链接 `/<deck>/<页码>` 可直达
