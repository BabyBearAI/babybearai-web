#!/bin/bash
# BabyBear AI 定时更新脚本 - 本地运行版
# 设置: crontab -e 添加: 0 8 * * * /path/to/daily-update-local.sh

cd "$(dirname "$0")"

echo "🐻 BabyBear AI Daily Update - $(date)"
echo "=========================================="

# 检查更新标记
if [ -f ".skip_daily_update" ]; then
    echo "⏭️  Skip flag found, exiting"
    exit 0
fi

# 拉取最新代码
echo "📥 Pulling latest changes..."
git pull origin main

# 创建今日任务文件
echo "📝 Creating task for AI assistant..."
cat > .daily_task.md << 'EOF'
# 每日任务: 搜索并添加新的 AI 工具

## 步骤
1. 读取 app.js 了解现有工具（共112个）
2. 搜索最新 AI 工具（至少5-10个有价值的）
3. 验证工具可用性（访问官网确认）
4. 按格式添加到 app.js
5. git commit 并 push

## 搜索关键词建议
- "AI tools 2025 new releases"
- "Product Hunt AI tools"
- "国产AI工具 2025"
- "AI video/image/chat new tools"
- "Twitter trending AI tools"

## 添加格式
每个工具必须包含:
- id: 递增编号（从113开始）
- name: 工具名
- description: 描述（<50字）
- category: chat/image/video/audio/writing/productivity/learning
- url: 官网链接
- tags: 2-4个标签
- isFree/hasPaidPlan: 免费情况
- featured: 是否精选（只有真正优秀的才选）
- region: cn/global/both

## 质量标准
- ✅ 可正常访问的网站
- ✅ 有实际用途，不是 Demo
- ✅ 近3个月内发布或重大更新
- ✅ 不重复添加已有工具

完成后删除此文件并 commit。
EOF

echo "✅ Task file created: .daily_task.md"
echo ""
echo "📢 请通知 AI 助手执行今日更新任务"
echo "   或直接运行: openclaw workspace babybearai-web"

# 可选：发送通知（如果配置了）
# curl -s "https://api.example.com/notify?msg=BabyBear+AI+needs+daily+update" > /dev/null

echo ""
echo "⏰ Next check: $(date -v+1d '+%Y-%m-%d 08:00')"