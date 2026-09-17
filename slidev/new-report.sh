#!/bin/bash
# 新建一个报告（零配置）
# 用法: ./new-report.sh <报告名>
set -e
cd "$(dirname "$0")"

name="$1"
if [ -z "$name" ]; then
  echo "用法: $0 <报告名>"
  echo "示例: $0 fts-workshop-2026"
  exit 1
fi

target="slides/$name"
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

echo "✓ 已创建 slides/$name/"
echo ""
echo "  编辑:   slidev/slides/$name/slides.md"
echo "  预览:   cd slidev && npx slidev slides/$name/slides.md"
echo "  导出:   cd slidev && npx slidev export slides/$name/slides.md --per-slide --output /tmp/$name.pdf"
echo "  推送:   git add slides/$name && git commit -m 'add $name' && git push"
echo "          → GitHub Actions 自动构建并发布到 Pages"
