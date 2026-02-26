# BabyBear AI 自动更新任务

## 任务说明
每日自动搜索最新 AI 工具，补充到网站中

## 工作流程
1. 搜索中文 AI 工具（掘金、知乎、即刻、36kr）
2. 搜索英文 AI 工具（Product Hunt、Twitter、Reddit）
3. 筛选有价值的工具（去重、验证、评估）
4. 更新 app.js 数据
5. 推送到 GitHub
6. Vercel 自动部署

## 工具分类标准

### 地区标记 (region)
- `cn` - 中文站/国产工具（文心一言、Kimi、可灵等）
- `global` - 英文站/海外工具（ChatGPT、Claude、Midjourney等）
- `both` - 全支持（Suno 等）

### 精选标准 (featured)
- 业界知名度高
- 有独特功能
- 用户评价好
- 持续更新维护

### 标签规范
- 中文站：必须带"中文"或"国产"标签
- 功能标签：具体功能（对话、绘画、视频等）
- 特色标签：免费、必用、开源等

## 信息来源

### 中文来源
- 即刻 - AI 话题
- 掘金 - AI 专栏
- 知乎 - AI 工具推荐
- 36氪 - AI 产品报道
- 少数派 - AI 工具评测

### 英文来源
- Product Hunt - AI 分类
- Twitter/X - AI 社区
- Reddit - r/artificial, r/LocalLLaMA
- Hacker News
- There Is An AI For That

## 更新检查清单

更新时验证每项：
- [ ] 工具可以正常访问
- [ ] 描述准确、简洁（<50字）
- [ ] 地区标记正确
- [ ] 免费/付费状态准确
- [ ] 标签合适（2-4个）
- [ ] 无重复工具
- [ ] ID 递增不冲突

## 格式模板

```javascript
{
    id: "XXX",
    name: "工具名",
    description: "一句话描述，突出核心功能和特色",
    category: "chat|image|video|audio|writing|productivity|learning",
    url: "https://example.com",
    tags: ["标签1", "标签2", "标签3"],
    isFree: true|false,
    hasPaidPlan: true|false,
    featured: false|true,
    region: "cn|global|both",
}
```