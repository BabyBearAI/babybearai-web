// 工具数据
const categories = [
    { id: "all", name: "全部", icon: "🐻" },
    { id: "chat", name: "AI 对话", icon: "💬" },
    { id: "image", name: "图像生成", icon: "🎨" },
    { id: "writing", name: "写作辅助", icon: "✍️" },
    { id: "video", name: "视频创作", icon: "🎬" },
    { id: "audio", name: "音频处理", icon: "🎵" },
    { id: "productivity", name: "效率工具", icon: "⚡" },
    { id: "learning", name: "学习助手", icon: "📚" },
];

// 地区标签
const regionLabels = {
    cn: "🇨🇳 中文站",
    global: "🌍 英文站",
    both: "🌐 全支持"
};

const tools = [
    // ===== 英文站 - AI 对话 =====
    {
        id: "1",
        name: "ChatGPT",
        description: "最知名的 AI 对话助手，能回答问题、写文章、编程、头脑风暴，适合各种日常任务",
        category: "chat",
        url: "https://chat.openai.com",
        tags: ["对话", "全能", "必用"],
        isFree: true,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    {
        id: "2",
        name: "Claude",
        description: "Anthropic 出品，擅长长文本分析、代码理解和深度对话，回答更细腻",
        category: "chat",
        url: "https://claude.ai",
        tags: ["长文本", "分析", "代码"],
        isFree: true,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    {
        id: "17",
        name: "Gemini",
        description: "Google 出品的多模态 AI，支持文本、图像、视频理解，与 Google 生态深度整合",
        category: "chat",
        url: "https://gemini.google.com",
        tags: ["对话", "多模态", "搜索"],
        isFree: true,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    {
        id: "18",
        name: "Copilot",
        description: "微软 AI 助手，集成在 Windows 和 Edge 中，支持联网搜索和文档处理",
        category: "chat",
        url: "https://copilot.microsoft.com",
        tags: ["对话", "搜索", "微软"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "19",
        name: "Poe",
        description: "Quora 出品，一个平台集齐 GPT-4、Claude、Gemini 等多个 AI 模型",
        category: "chat",
        url: "https://poe.com",
        tags: ["聚合", "多模型", "机器人"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "20",
        name: "Character.AI",
        description: "与各种 AI 角色对话，从名人到虚拟角色，娱乐性和趣味性很强",
        category: "chat",
        url: "https://character.ai",
        tags: ["角色", "娱乐", "对话"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    // ===== 中文站 - AI 对话 =====
    {
        id: "13",
        name: "Kimi",
        description: "Moonshot 出品，超长文本处理，读论文、读报告、整理资料很实用",
        category: "chat",
        url: "https://kimi.moonshot.cn",
        tags: ["长文本", "阅读", "中文"],
        isFree: true,
        hasPaidPlan: false,
        featured: true,
        region: "cn",
    },
    {
        id: "14",
        name: "豆包",
        description: "字节跳动出品，中文对话流畅，集成搜索，日常问答和创作都能用",
        category: "chat",
        url: "https://www.doubao.com",
        tags: ["中文", "对话", "搜索"],
        isFree: true,
        hasPaidPlan: false,
        region: "cn",
    },
    {
        id: "49",
        name: "文心一言",
        description: "百度出品的大语言模型，中文理解和生成能力强，集成搜索",
        category: "chat",
        url: "https://yiyan.baidu.com",
        tags: ["对话", "中文", "百度"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    {
        id: "50",
        name: "通义千问",
        description: "阿里出品，多模态能力强，支持文档理解、代码生成、长文本",
        category: "chat",
        url: "https://tongyi.aliyun.com",
        tags: ["对话", "中文", "阿里"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    {
        id: "51",
        name: "智谱清言",
        description: "智谱 AI 出品，GLM-4 模型支持长文本和代码，中文表现优秀",
        category: "chat",
        url: "https://chatglm.cn",
        tags: ["对话", "中文", "GLM"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    {
        id: "52",
        name: "讯飞星火",
        description: "科大讯飞出品，语音识别能力强，支持多模态交互",
        category: "chat",
        url: "https://xinghuo.xfyun.cn",
        tags: ["对话", "语音", "国产"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    // ===== 英文站 - 图像生成 =====
    {
        id: "3",
        name: "Midjourney",
        description: "艺术感最强的 AI 绘画工具，生成的图片精致唯美，适合设计、创意",
        category: "image",
        url: "https://www.midjourney.com",
        tags: ["绘画", "艺术", "高质量"],
        isFree: false,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    {
        id: "4",
        name: "Leonardo.ai",
        description: "免费额度充足的 AI 绘图工具，游戏资产、插画、写实风格都能胜任",
        category: "image",
        url: "https://leonardo.ai",
        tags: ["绘画", "免费", "游戏"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "15",
        name: "Remove.bg",
        description: "一键抠图，自动去除背景，效果精准，做设计、做证件照必备",
        category: "image",
        url: "https://www.remove.bg",
        tags: ["抠图", "图片处理", "设计"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "21",
        name: "DALL-E 3",
        description: "OpenAI 出品，理解提示词能力最强，文字渲染效果好，集成在 ChatGPT 中",
        category: "image",
        url: "https://openai.com/dall-e-3",
        tags: ["绘画", "OpenAI", "文字渲染"],
        isFree: false,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    {
        id: "22",
        name: "Adobe Firefly",
        description: "Adobe 官方 AI 工具，与 PS、Illustrator 无缝集成，支持商业用途",
        category: "image",
        url: "https://firefly.adobe.com",
        tags: ["绘画", "商业", "设计"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "23",
        name: "Playground",
        description: "融合多种模型的 AI 绘图平台，支持图层和混合模式，类似 AI 版 Photoshop",
        category: "image",
        url: "https://playgroundai.com",
        tags: ["绘画", "图层", "混合"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "43",
        name: "Canva AI",
        description: "集成在 Canva 中的 AI 功能，支持 AI 绘画、智能排版、文案生成",
        category: "image",
        url: "https://www.canva.com",
        tags: ["设计", "排版", "模板"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "44",
        name: "Galileo AI",
        description: "AI 生成 UI 设计稿，文字描述就能生成可编辑的 Figma 设计",
        category: "image",
        url: "https://galileo.ai",
        tags: ["UI", "设计", "原型"],
        isFree: false,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "45",
        name: "Looka",
        description: "AI 生成 logo 和品牌设计，输入公司名就能生成整套品牌方案",
        category: "image",
        url: "https://looka.com",
        tags: ["logo", "品牌", "设计"],
        isFree: false,
        hasPaidPlan: true,
        region: "global",
    },
    // ===== 中文站 - 图像生成 =====
    {
        id: "24",
        name: "SeaArt",
        description: "国产 AI 绘画平台，模型丰富，中文支持好，社区活跃",
        category: "image",
        url: "https://www.seaart.ai",
        tags: ["绘画", "国产", "社区"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    {
        id: "47",
        name: "Civitai",
        description: "Stable Diffusion 模型分享社区，海量 LoRA 和 Checkpoint 模型",
        category: "image",
        url: "https://civitai.com",
        tags: ["模型", "社区", "SD"],
        isFree: true,
        hasPaidPlan: false,
        region: "global",
    },
    // ===== 英文站 - 视频创作 =====
    {
        id: "8",
        name: "HeyGen",
        description: "AI 数字人视频生成，输入文字就能生成真人出镜的视频，适合口播",
        category: "video",
        url: "https://www.heygen.com",
        tags: ["数字人", "视频", "口播"],
        isFree: false,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "16",
        name: "Runway",
        description: "AI 视频编辑和生成，能做视频抠图、风格迁移、图像生成视频",
        category: "video",
        url: "https://runwayml.com",
        tags: ["视频", "AI 生成", "专业"],
        isFree: false,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "25",
        name: "Pika",
        description: "AI 视频生成新秀，支持文生视频和图生视频，特效和转场很出色",
        category: "video",
        url: "https://pika.art",
        tags: ["视频", "生成", "特效"],
        isFree: true,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    {
        id: "27",
        name: "Luma Dream Machine",
        description: "Luma 出品，视频生成速度快，动作流畅自然，物理效果逼真",
        category: "video",
        url: "https://lumalabs.ai/dream-machine",
        tags: ["视频", "3D", "快速"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "28",
        name: "Haiper",
        description: "免费额度很多的 AI 视频生成工具，支持文生视频和图生视频",
        category: "video",
        url: "https://haiper.ai",
        tags: ["视频", "免费", "生成"],
        isFree: true,
        hasPaidPlan: false,
        region: "global",
    },
    // ===== 中文站 - 视频创作 =====
    {
        id: "7",
        name: "剪映",
        description: "字节出品，内置 AI 字幕、AI 配音、一键成片，短视频创作神器",
        category: "video",
        url: "https://www.capcut.com",
        tags: ["视频", "剪辑", "字幕"],
        isFree: true,
        hasPaidPlan: true,
        featured: true,
        region: "cn",
    },
    {
        id: "26",
        name: "可灵 AI",
        description: "快手出品，国产最强的 AI 视频生成，物理规律理解好，支持长视频",
        category: "video",
        url: "https://klingai.com",
        tags: ["视频", "国产", "快手"],
        isFree: true,
        hasPaidPlan: true,
        featured: true,
        region: "cn",
    },
    // ===== 英文站 - 写作辅助 =====
    {
        id: "5",
        name: "Notion AI",
        description: "在 Notion 里直接调用 AI 辅助写作、整理笔记、总结内容，工作流无缝衔接",
        category: "writing",
        url: "https://www.notion.so",
        tags: ["写作", "笔记", "效率"],
        isFree: false,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    // ===== 中文站 - 写作辅助 =====
    {
        id: "6",
        name: "秘塔写作猫",
        description: "中文写作好帮手，纠错、改写、续写都能做，对中文支持很好",
        category: "writing",
        url: "https://xiezuocat.com",
        tags: ["中文", "写作", "纠错"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    // ===== 英文站 - 音频处理 =====
    {
        id: "10",
        name: "ElevenLabs",
        description: "最自然的 AI 配音工具，支持中文，情绪表达丰富，适合做有声内容",
        category: "audio",
        url: "https://elevenlabs.io",
        tags: ["配音", "语音", "TTS"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "33",
        name: "Udio",
        description: "AI 音乐生成，人声效果极佳，支持多种音乐风格，被认为是 Suno 的有力竞争者",
        category: "audio",
        url: "https://udio.com",
        tags: ["音乐", "人声", "创作"],
        isFree: true,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    // ===== 全支持 - 音频处理 =====
    {
        id: "9",
        name: "Suno",
        description: "AI 音乐生成，输入歌词或描述就能生成完整歌曲，旋律和编曲都很专业",
        category: "audio",
        url: "https://suno.com",
        tags: ["音乐", "创作", "歌曲"],
        isFree: true,
        hasPaidPlan: true,
        featured: true,
        region: "both",
    },
    // ===== 中文站 - 音频处理 =====
    {
        id: "35",
        name: "Mureka",
        description: "国产 AI 音乐生成，支持中文歌曲，旋律和编曲质量不错",
        category: "audio",
        url: "https://www.mureka.ai",
        tags: ["音乐", "中文", "国产"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    // ===== 英文站 - 效率工具 =====
    {
        id: "11",
        name: "Perplexity",
        description: "AI 搜索引擎，直接给出带来源的答案，省去翻页查找的时间",
        category: "productivity",
        url: "https://www.perplexity.ai",
        tags: ["搜索", "研究", "信息"],
        isFree: true,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    {
        id: "12",
        name: "Gamma",
        description: "AI 生成 PPT，输入主题自动排版设计，演示文稿几分钟搞定",
        category: "productivity",
        url: "https://gamma.app",
        tags: ["PPT", "演示", "设计"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "29",
        name: "Cursor",
        description: "基于 VS Code 的 AI 编辑器，代码补全和重构能力极强，支持整个项目理解",
        category: "productivity",
        url: "https://cursor.sh",
        tags: ["编程", "代码", "编辑器"],
        isFree: true,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    {
        id: "30",
        name: "GitHub Copilot",
        description: "GitHub 出品，最知名的 AI 编程助手，支持多种编程语言和 IDE",
        category: "productivity",
        url: "https://github.com/copilot",
        tags: ["编程", "代码", "GitHub"],
        isFree: false,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    {
        id: "31",
        name: "Codeium",
        description: "免费的 AI 编程助手，支持 70+ 语言和 40+ IDE，个人版永久免费",
        category: "productivity",
        url: "https://codeium.com",
        tags: ["编程", "代码", "免费"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "32",
        name: "v0.dev",
        description: "Vercel 出品，AI 生成 React 组件和界面，前端开发神器",
        category: "productivity",
        url: "https://v0.dev",
        tags: ["编程", "前端", "React"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "36",
        name: "Otter.ai",
        description: "AI 会议记录助手，实时转录语音，自动生成会议摘要和待办",
        category: "productivity",
        url: "https://otter.ai",
        tags: ["会议", "转录", "效率"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "38",
        name: "Tldraw",
        description: "AI 驱动的无限画布，随手画草图就能生成应用原型，集成 GPT-4V",
        category: "productivity",
        url: "https://tldraw.com",
        tags: ["白板", "原型", "设计"],
        isFree: true,
        hasPaidPlan: false,
        region: "global",
    },
    {
        id: "39",
        name: "Beautiful.ai",
        description: "AI 生成精美 PPT，自动排版和设计，让演示文稿更专业",
        category: "productivity",
        url: "https://www.beautiful.ai",
        tags: ["PPT", "演示", "设计"],
        isFree: false,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "46",
        name: "Hugging Face",
        description: "最大的 AI 开源社区，提供模型、数据集、 Spaces 部署平台",
        category: "productivity",
        url: "https://huggingface.co",
        tags: ["开源", "模型", "社区"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "48",
        name: "Replicate",
        description: "运行开源 AI 模型的云平台， thousands 个模型一键运行和 API 调用",
        category: "productivity",
        url: "https://replicate.com",
        tags: ["API", "模型", "部署"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    // ===== 全支持 - 学习助手 =====
    {
        id: "40",
        name: "Elicit",
        description: "AI 研究助手，自动搜索和分析学术论文，帮你做文献综述",
        category: "learning",
        url: "https://elicit.org",
        tags: ["学术", "论文", "研究"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "41",
        name: "Consensus",
        description: "AI 学术搜索引擎，从研究论文中找到答案，每个结论都有出处",
        category: "learning",
        url: "https://consensus.app",
        tags: ["学术", "论文", "证据"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "42",
        name: "Scholarcy",
        description: "AI 阅读助手，自动提取论文要点、生成摘要和 flashcard",
        category: "learning",
        url: "https://www.scholarcy.com",
        tags: ["学术", "阅读", "摘要"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    // ===== 第三批：扩充到100+工具 =====
    // AI 对话（更多国际大模型）
    {
        id: "53",
        name: "Grok",
        description: "xAI 出品，马斯克旗下的 AI，擅长实时信息和幽默回答，集成在 X 平台",
        category: "chat",
        url: "https://grok.x.ai",
        tags: ["对话", "实时", "X"],
        isFree: true,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    {
        id: "54",
        name: "Mistral",
        description: "法国 AI 公司，开源模型性能强劲，欧洲最强大语言模型之一",
        category: "chat",
        url: "https://mistral.ai",
        tags: ["对话", "开源", "欧洲"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "55",
        name: "Cohere",
        description: "企业级大语言模型，擅长文本生成和语义搜索，API 稳定",
        category: "chat",
        url: "https://cohere.com",
        tags: ["对话", "API", "企业"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "56",
        name: "DeepSeek",
        description: "幻方量化出品，国内顶尖开源大模型，代码能力突出，性价比极高",
        category: "chat",
        url: "https://chat.deepseek.com",
        tags: ["对话", "开源", "代码"],
        isFree: true,
        hasPaidPlan: true,
        featured: true,
        region: "cn",
    },
    {
        id: "57",
        name: "百川智能",
        description: "王小川创立，中文大模型第一梯队，医疗和金融场景强",
        category: "chat",
        url: "https://www.baichuan-ai.com",
        tags: ["对话", "中文", "医疗"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    {
        id: "58",
        name: "零一万物",
        description: "李开复创立，Yi 系列模型性能优秀，开源和商业版都有",
        category: "chat",
        url: "https://www.lingyiwanwu.com",
        tags: ["对话", "中文", "李开复"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    {
        id: "59",
        name: "阶跃星辰",
        description: "国内多模态大模型新秀，图像和视频理解能力强",
        category: "chat",
        url: "https://www.stepfun.com",
        tags: ["对话", "多模态", "国产"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    // AI 图像（更多专业工具）
    {
        id: "60",
        name: "Stable Diffusion",
        description: "最流行的开源 AI 绘画模型，可本地部署，生态最丰富",
        category: "image",
        url: "https://stability.ai",
        tags: ["绘画", "开源", "本地"],
        isFree: true,
        hasPaidPlan: false,
        featured: true,
        region: "global",
    },
    {
        id: "61",
        name: "Ideogram",
        description: "专注于文字渲染的 AI 绘画工具，海报和 Logo 设计神器",
        category: "image",
        url: "https://ideogram.ai",
        tags: ["绘画", "文字", "设计"],
        isFree: true,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    {
        id: "62",
        name: "Recraft",
        description: "AI 矢量图生成，可直接导出 SVG，设计师工作流工具",
        category: "image",
        url: "https://recraft.ai",
        tags: ["绘画", "矢量", "设计"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "63",
        name: "Fooocus",
        description: "Stable Diffusion 的简化版，本地运行，操作简单效果惊艳",
        category: "image",
        url: "https://fooocus.com",
        tags: ["绘画", "开源", "本地"],
        isFree: true,
        hasPaidPlan: false,
        region: "global",
    },
    {
        id: "64",
        name: "ComfyUI",
        description: "专业级 SD 工作流工具，节点式操作，适合高级用户",
        category: "image",
        url: "https://comfyanonymous.github.io",
        tags: ["绘画", "工作流", "专业"],
        isFree: true,
        hasPaidPlan: false,
        region: "global",
    },
    {
        id: "65",
        name: "Vega AI",
        description: "国产 AI 绘画平台，支持文生图、图生图、视频生成",
        category: "image",
        url: "https://www.vegaai.net",
        tags: ["绘画", "国产", "视频"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    {
        id: "66",
        name: "通义万相",
        description: "阿里出品，AI 绘画和视频生成，中文理解能力强",
        category: "image",
        url: "https://tongyi.aliyun.com/wanxiang",
        tags: ["绘画", "阿里", "中文"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    {
        id: "67",
        name: "文心一格",
        description: "百度出品，AI 艺术和创意绘画平台，多种风格可选",
        category: "image",
        url: "https://yige.baidu.com",
        tags: ["绘画", "百度", "艺术"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    // AI 视频（更多选择）
    {
        id: "68",
        name: "Sora",
        description: "OpenAI 出品，目前最强的 AI 视频生成，理解物理世界能力惊人",
        category: "video",
        url: "https://openai.com/sora",
        tags: ["视频", "OpenAI", "物理"],
        isFree: false,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    {
        id: "69",
        name: "PixVerse",
        description: "国产 AI 视频生成，效果和速度都不错，社区活跃",
        category: "video",
        url: "https://pixverse.ai",
        tags: ["视频", "国产", "社区"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    {
        id: "70",
        name: "Vidu",
        description: "清华系出品，国产 AI 视频生成，长视频一致性表现好",
        category: "video",
        url: "https://vidu.com",
        tags: ["视频", "清华", "国产"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    {
        id: "71",
        name: "Morph Studio",
        description: "AI 视频生成社区，支持文生视频和图生视频，免费额度多",
        category: "video",
        url: "https://morphstudio.com",
        tags: ["视频", "社区", "免费"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "72",
        name: "Stable Video",
        description: "Stability AI 出品，图生视频效果稳定，支持本地部署",
        category: "video",
        url: "https://www.stablevideo.com",
        tags: ["视频", "开源", "本地"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    // AI 音频（更多音乐和语音）
    {
        id: "73",
        name: "Stable Audio",
        description: "Stability AI 出品，AI 生成音乐和音效，支持商业用途",
        category: "audio",
        url: "https://www.stableaudio.com",
        tags: ["音乐", "音效", "开源"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "74",
        name: "AIVA",
        description: "AI 作曲助手，专注影视配乐和背景音乐生成，已有版权保护",
        category: "audio",
        url: "https://www.aiva.ai",
        tags: ["音乐", "作曲", "版权"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "75",
        name: "Murf",
        description: "AI 配音工作室，50+ 语言和 100+ 音色，适合专业视频配音",
        category: "audio",
        url: "https://murf.ai",
        tags: ["配音", "多语言", "专业"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "76",
        name: "Play.ht",
        description: "超逼真的 AI 配音，支持语音克隆，播客和有声书首选",
        category: "audio",
        url: "https://play.ht",
        tags: ["配音", "语音克隆", "播客"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "77",
        name: "天工音乐",
        description: "昆仑万维出品，国产 AI 音乐生成，中文歌曲质量不错",
        category: "audio",
        url: "https://www.tiangong.cn/music",
        tags: ["音乐", "中文", "国产"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    // AI 写作（更多专业工具）
    {
        id: "78",
        name: "Jasper",
        description: "企业级 AI 写作助手，营销文案、博客、广告创意一手包办",
        category: "writing",
        url: "https://jasper.ai",
        tags: ["写作", "营销", "企业"],
        isFree: false,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    {
        id: "79",
        name: "Copy.ai",
        description: "营销文案 AI 生成，数百个模板，适合社媒和广告",
        category: "writing",
        url: "https://copy.ai",
        tags: ["写作", "营销", "模板"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "80",
        name: "Rytr",
        description: "高性价比 AI 写作工具，支持 30+ 语言，永久免费额度",
        category: "writing",
        url: "https://rytr.me",
        tags: ["写作", "多语言", "性价比"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "81",
        name: "讯飞听见",
        description: "科大讯飞出品，语音转文字准确率极高，支持多语种",
        category: "writing",
        url: "https://www.iflyrec.com",
        tags: ["转录", "语音", "中文"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    {
        id: "82",
        name: "WPS AI",
        description: "WPS 内置 AI，文档写作、PPT生成、表格处理一体化",
        category: "writing",
        url: "https://ai.wps.cn",
        tags: ["写作", "办公", "中文"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    // AI 编程（更多选择）
    {
        id: "83",
        name: "Tabnine",
        description: "老牌 AI 编程助手，支持私有模型部署，企业安全首选",
        category: "productivity",
        url: "https://tabnine.com",
        tags: ["编程", "代码", "企业"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "84",
        name: "Replit Ghostwriter",
        description: "集成在 Replit 中的 AI 编程助手，云端开发环境+AI 完美结合",
        category: "productivity",
        url: "https://replit.com",
        tags: ["编程", "云端", "教育"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "85",
        name: "Sourcegraph Cody",
        description: "企业代码库 AI 助手，理解整个代码库，回答技术问题",
        category: "productivity",
        url: "https://sourcegraph.com/cody",
        tags: ["编程", "代码库", "企业"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "86",
        name: "Amazon CodeWhisperer",
        description: "AWS 出品，AI 编程助手，对 AWS 服务支持最好",
        category: "productivity",
        url: "https://aws.amazon.com/codewhisperer",
        tags: ["编程", "AWS", "云"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "87",
        name: "通义灵码",
        description: "阿里出品，国内最强的 AI 编程助手，代码补全和解释优秀",
        category: "productivity",
        url: "https://tongyi.aliyun.com/lingma",
        tags: ["编程", "代码", "阿里"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    // AI 3D/设计（新类别内容）
    {
        id: "88",
        name: "Meshy",
        description: "AI 3D 模型生成，文字或图片生成可编辑的 3D 资产",
        category: "image",
        url: "https://meshy.ai",
        tags: ["3D", "建模", "游戏"],
        isFree: true,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    {
        id: "89",
        name: "Spline",
        description: "AI 3D 设计工具，网页端创建交互式 3D 场景和动画",
        category: "image",
        url: "https://spline.design",
        tags: ["3D", "设计", "网页"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "90",
        name: "Tripo",
        description: "国产 AI 3D 生成，文字或图片一键生成 3D 模型",
        category: "image",
        url: "https://tripo3d.ai",
        tags: ["3D", "建模", "国产"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    {
        id: "91",
        name: "Luma AI",
        description: "手机扫描生成 3D 模型，NeRF 技术领军者",
        category: "image",
        url: "https://lumalabs.ai",
        tags: ["3D", "扫描", "NeRF"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    // AI 效率/办公（更多）
    {
        id: "92",
        name: "Mem.ai",
        description: "AI 驱动的知识库，自动整理笔记和关联信息",
        category: "productivity",
        url: "https://mem.ai",
        tags: ["笔记", "知识库", "整理"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "93",
        name: "Reflect",
        description: "AI 笔记工具，自动链接相关笔记，构建知识图谱",
        category: "productivity",
        url: "https://reflect.app",
        tags: ["笔记", "知识图谱", "写作"],
        isFree: false,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "94",
        name: "Craft",
        description: "精美文档工具，内置 AI 写作和翻译，适合团队协作",
        category: "productivity",
        url: "https://craft.do",
        tags: ["文档", "协作", "设计"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "95",
        name: "飞书智能伙伴",
        description: "飞书内置 AI，文档、表格、会议全场景 AI 助手",
        category: "productivity",
        url: "https://www.feishu.cn",
        tags: ["办公", "协作", "中文"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    {
        id: "96",
        name: "钉钉魔法棒",
        description: "钉钉 AI 助手，文档、会议、日程智能化处理",
        category: "productivity",
        url: "https://www.dingtalk.com",
        tags: ["办公", "协作", "中文"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    // AI 设计（更多）
    {
        id: "97",
        name: "Figma AI",
        description: "Figma 内置 AI，设计稿生成、内容填充、自动布局",
        category: "image",
        url: "https://www.figma.com/ai",
        tags: ["设计", "UI", "协作"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "98",
        name: "Framer AI",
        description: "AI 生成网站，从设计到代码一站式，支持自定义域名",
        category: "productivity",
        url: "https://framer.com",
        tags: ["建站", "设计", "代码"],
        isFree: true,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    {
        id: "99",
        name: "Webflow AI",
        description: "可视化建站+AI，专业级响应式网站无需写代码",
        category: "productivity",
        url: "https://webflow.com",
        tags: ["建站", "无代码", "设计"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "100",
        name: "即时 AI",
        description: "国产 AI 设计工具，文生 UI、图生 UI，设计稿一键生成",
        category: "image",
        url: "https://js.design/ai",
        tags: ["设计", "UI", "国产"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    // 再加几个超值的
    {
        id: "101",
        name: "沉浸式翻译",
        description: " bilingual 网页翻译插件，AI 驱动的双语对照翻译",
        category: "learning",
        url: "https://immersivetranslate.com",
        tags: ["翻译", "双语", "阅读"],
        isFree: true,
        hasPaidPlan: true,
        featured: true,
        region: "cn",
    },
    {
        id: "102",
        name: "DeepL",
        description: "AI 翻译质量最佳，学术论文和专业文档翻译首选",
        category: "learning",
        url: "https://deepl.com",
        tags: ["翻译", "学术", "专业"],
        isFree: true,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    {
        id: "103",
        name: "Arc Browser",
        description: "AI 驱动的浏览器，标签页管理、网页总结、ChatGPT 集成",
        category: "productivity",
        url: "https://arc.net",
        tags: ["浏览器", "效率", "AI"],
        isFree: true,
        hasPaidPlan: false,
        featured: true,
        region: "global",
    },
    {
        id: "104",
        name: "Rewind",
        description: "AI 记忆助手，记录屏幕所有内容，随时搜索回忆",
        category: "productivity",
        url: "https://rewind.ai",
        tags: ["记忆", "搜索", "隐私"],
        isFree: false,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "105",
        name: "Anthropic Console",
        description: "Claude API 控制台，开发者调试和优化 Prompt 的利器",
        category: "productivity",
        url: "https://console.anthropic.com",
        tags: ["开发", "API", "Prompt"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "106",
        name: "PromptHero",
        description: "AI 提示词社区，搜索和分享 Stable Diffusion、Midjourney 提示词",
        category: "image",
        url: "https://prompthero.com",
        tags: ["提示词", "社区", "灵感"],
        isFree: true,
        hasPaidPlan: true,
        region: "global",
    },
    {
        id: "107",
        name: "LiblibAI",
        description: "国内最大的 AI 绘画模型社区，SD 模型下载和在线生图",
        category: "image",
        url: "https://liblib.art",
        tags: ["模型", "社区", "国产"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    {
        id: "108",
        name: "魔搭社区",
        description: "阿里出品，国内最大的 AI 模型社区，开源模型一键体验",
        category: "productivity",
        url: "https://modelscope.cn",
        tags: ["模型", "开源", "国产"],
        isFree: true,
        hasPaidPlan: false,
        region: "cn",
    },
    {
        id: "109",
        name: "Haiper（补充）",
        description: "免费 AI 视频生成工具，文生视频和图生视频效果都不错",
        category: "video",
        url: "https://haiper.ai",
        tags: ["视频", "免费", "AI"],
        isFree: true,
        hasPaidPlan: false,
        region: "global",
    },
    {
        id: "110",
        name: "腾讯元宝",
        description: "腾讯出品，混元大模型驱动，文档处理和中文对话能力强",
        category: "chat",
        url: "https://yuanbao.tencent.com",
        tags: ["对话", "腾讯", "中文"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    {
        id: "111",
        name: "商汤商量",
        description: "商汤科技出品，多模态能力强，文档理解和生成优秀",
        category: "chat",
        url: "https://chat.sensetime.com",
        tags: ["对话", "多模态", "国产"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    {
        id: "112",
        name: "Krea AI",
        description: "实时 AI 绘画，边画边生成，创意工作流神器",
        category: "image",
        url: "https://krea.ai",
        tags: ["绘画", "实时", "创意"],
        isFree: true,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    // ===== 第四批：手动更新测试 2025-02-26 =====
    {
        id: "113",
        name: "Lovable",
        description: "AI 全栈应用开发工具，用自然语言描述就能生成完整应用，支持一键部署",
        category: "productivity",
        url: "https://lovable.dev",
        tags: ["开发", "全栈", "无代码"],
        isFree: true,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    {
        id: "114",
        name: "Dify",
        description: "开源 LLM 应用开发平台，可视化构建 AI 工作流、Agent 和知识库",
        category: "productivity",
        url: "https://dify.ai",
        tags: ["开发", "Agent", "开源"],
        isFree: true,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    {
        id: "115",
        name: "Ollama",
        description: "本地运行大语言模型，一键下载和运行 Llama、Mistral 等开源模型",
        category: "productivity",
        url: "https://ollama.com",
        tags: ["本地", "开源", "LLM"],
        isFree: true,
        hasPaidPlan: false,
        featured: true,
        region: "global",
    },
    {
        id: "116",
        name: "AnythingLLM",
        description: "本地 AI 知识库，支持多种文档格式，完全离线运行保护隐私",
        category: "learning",
        url: "https://anythingllm.com",
        tags: ["知识库", "本地", "隐私"],
        isFree: true,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    {
        id: "117",
        name: "n8n",
        description: "开源工作流自动化平台，500+ 集成，支持 AI 节点和自托管",
        category: "productivity",
        url: "https://n8n.io",
        tags: ["自动化", "工作流", "集成"],
        isFree: true,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    // ===== 第五批：2025-03-06 更新 =====
    {
        id: "118",
        name: "Claude 3.7 Sonnet",
        description: "Anthropic 最新模型，支持扩展思考模式，编码和推理能力大幅提升",
        category: "chat",
        url: "https://claude.ai",
        tags: ["对话", "编码", "推理"],
        isFree: true,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    {
        id: "119",
        name: "Gemma 3",
        description: "Google 最新开源模型，单卡可跑，多语言支持优秀，性能媲美闭源模型",
        category: "chat",
        url: "https://ai.google.dev/gemma",
        tags: ["开源", "本地", "Google"],
        isFree: true,
        hasPaidPlan: false,
        featured: true,
        region: "global",
    },
    {
        id: "120",
        name: "Flowise",
        description: "拖拽式 AI 工作流构建工具，基于 LangChain，支持快速搭建 AI 应用",
        category: "productivity",
        url: "https://flowiseai.com",
        tags: ["工作流", "低代码", "LangChain"],
        isFree: true,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    {
        id: "121",
        name: "CrewAI",
        description: "多 Agent 编排框架，让多个 AI 角色协作完成复杂任务，企业自动化利器",
        category: "productivity",
        url: "https://crewai.com",
        tags: ["Agent", "自动化", "多智能体"],
        isFree: true,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    {
        id: "122",
        name: "AutoGen",
        description: "微软开源的多 Agent 对话框架，支持代码生成和复杂任务协作",
        category: "productivity",
        url: "https://microsoft.github.io/autogen",
        tags: ["Agent", "微软", "开源"],
        isFree: true,
        hasPaidPlan: false,
        region: "global",
    },
    {
        id: "123",
        name: "LTX Video",
        description: "Lightricks 出品，开源 AI 视频生成模型，生成速度快质量高",
        category: "video",
        url: "https://ltxv.io",
        tags: ["视频", "开源", "生成"],
        isFree: true,
        hasPaidPlan: false,
        region: "global",
    },
    {
        id: "124",
        name: "Runway Act-One",
        description: "AI 表演工具，上传视频就能让数字人模仿表情和动作，表演级效果",
        category: "video",
        url: "https://runwayml.com",
        tags: ["视频", "数字人", "表演"],
        isFree: false,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    {
        id: "125",
        name: "OpenAI Operator",
        description: "OpenAI 的 AI 代理，能自主浏览网页、填写表单、完成复杂任务",
        category: "productivity",
        url: "https://openai.com/operator",
        tags: ["Agent", "自动化", "浏览器"],
        isFree: false,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    {
        id: "126",
        name: "Deep Research",
        description: "OpenAI 的深度研究助手，能自动搜索、分析、生成综合研究报告",
        category: "learning",
        url: "https://chat.openai.com",
        tags: ["研究", "搜索", "报告"],
        isFree: false,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    {
        id: "127",
        name: "Mistral Small 3",
        description: "Mistral 最新轻量模型，80% 大模型性能但可在本地快速运行",
        category: "chat",
        url: "https://mistral.ai",
        tags: ["开源", "轻量", "本地"],
        isFree: true,
        hasPaidPlan: false,
        region: "global",
    },
    {
        id: "128",
        name: "Mureka O1",
        description: "国产 AI 音乐生成升级，支持控制曲风、节奏、歌词，音乐质量大幅提升",
        category: "audio",
        url: "https://www.mureka.ai",
        tags: ["音乐", "中文", "生成"],
        isFree: true,
        hasPaidPlan: true,
        region: "cn",
    },
    {
        id: "129",
        name: "Napkin AI",
        description: "AI 视觉笔记工具，输入文字自动生成图表、流程图、信息图",
        category: "productivity",
        url: "https://napkin.ai",
        tags: ["可视化", "图表", "笔记"],
        isFree: true,
        hasPaidPlan: true,
        featured: true,
        region: "global",
    },
    {
        id: "130",
        name: "Granite 3.2",
        description: "IBM 开源大模型，企业级性能，支持长文本和工具调用",
        category: "chat",
        url: "https://www.ibm.com/granite",
        tags: ["开源", "企业", "IBM"],
        isFree: true,
        hasPaidPlan: false,
        region: "global",
    },
];

// 状态
let activeCategory = "all";
let activeRegion = "all";
let searchQuery = "";

// 初始化
function init() {
    renderCategories();
    renderRegionFilters();
    renderFeatured();
    renderTools();
    setupEventListeners();
}

// 渲染分类筛选
function renderCategories() {
    const container = document.getElementById("categoryFilters");
    container.innerHTML = categories.map(cat => `
        <button 
            onclick="setCategory('${cat.id}')"
            class="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                    ? "bg-primary-500 text-white shadow-md shadow-primary-200"
                    : "bg-white text-warm-600 hover:bg-warm-50 border border-warm-200"
            }"
        >
            <span>${cat.icon}</span>
            <span>${cat.name}</span>
        </button>
    `).join("");
}

// 渲染地区筛选
function renderRegionFilters() {
    const container = document.getElementById("regionFilters");
    if (!container) return;
    
    const regions = [
        { id: "all", label: "🌐 全部地区" },
        { id: "cn", label: "🇨🇳 中文站" },
        { id: "global", label: "🌍 英文站" },
        { id: "both", label: "🔀 全支持" },
    ];
    
    container.innerHTML = regions.map(r => `
        <button 
            onclick="setRegion('${r.id}')"
            class="text-sm px-3 py-1.5 rounded-lg transition-all ${
                activeRegion === r.id
                    ? "bg-warm-800 text-white"
                    : "text-warm-500 hover:bg-warm-100"
            }"
        >
            ${r.label}
        </button>
    `).join("");
}

// 渲染精选推荐
function renderFeatured() {
    const container = document.getElementById("featuredGrid");
    const featured = tools.filter(t => t.featured);
    container.innerHTML = featured.map(tool => createToolCard(tool)).join("");
}

// 渲染工具列表
function renderTools() {
    const container = document.getElementById("toolsGrid");
    const noResults = document.getElementById("noResults");
    const featuredSection = document.getElementById("featuredSection");
    const toolsTitle = document.getElementById("toolsTitle");
    
    // 筛选
    const filtered = tools.filter(tool => {
        const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
        const matchesRegion = activeRegion === "all" || tool.region === activeRegion || tool.region === "both";
        const matchesSearch = searchQuery === "" ||
            tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesRegion && matchesSearch;
    });
    
    // 显示/隐藏精选区域
    if (searchQuery !== "" || activeCategory !== "all" || activeRegion !== "all") {
        featuredSection.classList.add("hidden");
    } else {
        featuredSection.classList.remove("hidden");
    }
    
    // 更新标题
    if (searchQuery) {
        toolsTitle.textContent = `搜索结果 (${filtered.length})`;
    } else if (activeCategory !== "all") {
        const cat = categories.find(c => c.id === activeCategory);
        toolsTitle.textContent = cat ? cat.name : "全部工具";
    } else {
        toolsTitle.textContent = "全部工具";
    }
    
    // 渲染
    if (filtered.length === 0) {
        container.innerHTML = "";
        noResults.classList.remove("hidden");
    } else {
        container.innerHTML = filtered.map(tool => createToolCard(tool)).join("");
        noResults.classList.add("hidden");
    }
}

// 创建工具卡片
function createToolCard(tool) {
    const regionBadge = {
        cn: "🇨🇳",
        global: "🌍",
        both: "🌐"
    }[tool.region] || "";
    
    return `
        <div class="tool-card bg-white rounded-2xl p-6 shadow-sm border border-warm-100 hover:border-primary-200">
            <div class="flex items-start justify-between mb-3">
                <div class="flex items-center gap-2">
                    <h3 class="text-lg font-semibold text-warm-800 hover:text-primary-600 transition-colors">
                        ${tool.name}
                    </h3>
                    <span class="text-sm" title="${regionLabels[tool.region]}">${regionBadge}</span>
                </div>
                <div class="flex items-center gap-1">
                    ${tool.featured ? `
                        <svg class="w-4 h-4 text-primary-400 fill-primary-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                    ` : ""}
                    ${tool.isFree ? `
                        <span class="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium">免费</span>
                    ` : ""}
                </div>
            </div>
            <p class="text-warm-600 text-sm leading-relaxed mb-4">
                ${tool.description}
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
                ${tool.tags.map(tag => `
                    <span class="text-xs bg-warm-50 text-warm-500 px-2 py-1 rounded-md">${tag}</span>
                `).join("")}
            </div>
            <a 
                href="${tool.url}" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
                访问网站
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
            </a>
        </div>
    `;
}

// 设置分类
function setCategory(id) {
    activeCategory = id;
    renderCategories();
    renderTools();
}

// 设置地区
function setRegion(id) {
    activeRegion = id;
    renderRegionFilters();
    renderTools();
}

// 设置事件监听
function setupEventListeners() {
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.trim();
        renderTools();
    });
}

// 启动
document.addEventListener("DOMContentLoaded", init);