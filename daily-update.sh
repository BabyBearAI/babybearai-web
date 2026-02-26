#!/bin/bash
# BabyBear AI 每日更新脚本
# 运行方式: ./daily-update.sh

set -e

echo "🐻 BabyBear AI 每日更新任务"
echo "=============================="

# 1. 进入项目目录
cd "$(dirname "$0")"

# 2. 拉取最新代码（避免冲突）
echo "📥 拉取最新代码..."
git pull origin main

# 3. 检查是否需要更新（通过 OpenClaw API 或手动触发）
# 注：实际搜索需要 web_search API，需要配置 BRAVE_API_KEY

echo ""
echo "✅ 当前任务说明："
echo "由于 web_search 需要 API 配置，请手动执行以下步骤："
echo ""
echo "1. 搜索中文 AI 工具："
echo "   - 打开 https://www.google.com/search?q=site:juejin.cn+AI工具+2025"
echo "   - 打开 https://www.zhihu.com/search?type=content&q=AI工具推荐"
echo ""
echo "2. 搜索英文 AI 工具："
echo "   - 打开 https://www.producthunt.com/search?q=artificial-intelligence"
echo "   - 打开 https://twitter.com/search?q=AI%20tools%20filter%3Alinks"
echo ""
echo "3. 发现有价值的新工具后，编辑 app.js 添加"
echo ""
echo "4. 推送到 GitHub："
echo "   git add ."
echo "   git commit -m 'Add new AI tools: XXX, YYY'"
echo "   git push origin main"
echo ""
echo "🚀 Vercel 会自动部署更新"
echo ""
echo "参考文档: DAILY_TASK.md"