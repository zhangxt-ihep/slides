#!/bin/bash
# 新建一个报告（零配置）
# 用法: ./new-report.sh [--private] <报告名>
#   --private: 创建到 private/（已 gitignore，不进 git、不部署，仅本地预览/导出）
set -e
cd "$(dirname "$0")"

mode="public"
if [ "$1" = "--private" ]; then
  mode="private"
  shift
fi

name="$1"
if [ -z "$name" ]; then
  echo "用法: $0 [--private] <报告名>"
  echo "示例: $0 fts-workshop-2026"
  echo "      $0 --private internal-review   # 私有 deck（不公开）"
  exit 1
fi

if [ "$mode" = "private" ]; then
  target="private/$name"
else
  target="slides/$name"
fi
if [ -e "$target" ]; then
  echo "错误: $target 已存在"
  exit 1
fi

mkdir -p "$target"
cd "$target"

# 共享资源软链接（slidev 的 root 跟随 entry，所以需要）
ln -s ../../public public

# style.css: 每个 deck 私有的样式文件（按需自建，参考 fts-xrootd-2026/style.css）

cat > slides.md << EOF
---
theme: scholarly
title: $name
colorSchema: light
aspectRatio: 16/9
---

# $name

## Subtitle here

---
layout: default
---

## Slide 2

- Point one
- Point two
EOF

echo "✓ 已创建 $target/"
echo ""
echo "  编辑:   slidev/$target/slides.md"
echo "  预览:   cd slidev && npx slidev $target/slides.md"
echo "  导出:   cd slidev && npx slidev export $target/slides.md --per-slide --output /tmp/$name.pdf"
if [ "$mode" = "private" ]; then
  echo ""
  echo "  私有 deck：位于 private/（已 gitignore），不进 git、不部署。"
  echo "  产物分享: cd $target && ln -sfn <nextcloud目录> artifacts"
else
  echo "  推送:   git add $target && git commit -m 'add $name' && git push"
  echo "          → GitHub Actions 自动构建并发布到 Pages"
fi
