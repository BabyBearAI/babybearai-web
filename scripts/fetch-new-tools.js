const axios = require('axios');
const fs = require('fs');
const path = require('path');

// 配置
const BRAVE_API_KEY = process.env.BRAVE_API_KEY;
const SEARCH_QUERIES = [
  'AI tools 2025 new releases',
  'best new AI productivity tools',
  'AI video generation tools 2025',
  'AI image generation new tools',
  'AI coding assistants new',
  'new AI chatbots 2025',
  'AI music generation tools',
  'AI 工具推荐 2025 最新',
  '国产AI工具新品',
  'AI效率工具新发布'
];

// 读取现有工具
function loadExistingTools() {
  const appJsPath = path.join(__dirname, '..', 'app.js');
  const content = fs.readFileSync(appJsPath, 'utf8');
  
  // 提取现有工具名称
  const nameMatches = content.match(/name:\s*"([^"]+)"/g);
  if (!nameMatches) return new Set();
  
  return new Set(
    nameMatches.map(m => m.replace(/name:\s*"/, '').replace(/"$/, '').toLowerCase())
  );
}

// 搜索新工具
async function searchNewTools() {
  if (!BRAVE_API_KEY) {
    console.log('⚠️  BRAVE_API_KEY not set, skipping search');
    return [];
  }
  
  const newTools = [];
  
  for (const query of SEARCH_QUERIES) {
    try {
      console.log(`🔍 Searching: ${query}`);
      
      const response = await axios.get('https://api.search.brave.com/res/v1/web/search', {
        params: {
          q: query,
          count: 5,
          freshness: 'pw'  // 过去一周
        },
        headers: {
          'Accept': 'application/json',
          'Accept-Encoding': 'gzip',
          'X-Subscription-Token': BRAVE_API_KEY
        },
        timeout: 10000
      });
      
      const results = response.data.web?.results || [];
      
      for (const result of results) {
        // 简单解析工具信息
        const tool = parseToolFromResult(result);
        if (tool && !isExistingTool(tool.name)) {
          newTools.push(tool);
        }
      }
      
      // 避免请求过快
      await sleep(1000);
      
    } catch (error) {
      console.error(`Error searching "${query}":`, error.message);
    }
  }
  
  return newTools;
}

// 从搜索结果解析工具信息
function parseToolFromResult(result) {
  // 这里需要更复杂的解析逻辑
  // 目前只是占位符
  return null;
}

// 检查是否已存在
function isExistingTool(name, existingTools) {
  return existingTools.has(name.toLowerCase());
}

// 休眠
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 主函数
async function main() {
  console.log('🐻 BabyBear AI Daily Update');
  console.log('==========================');
  
  const existingTools = loadExistingTools();
  console.log(`📊 Existing tools: ${existingTools.size}`);
  
  const newTools = await searchNewTools();
  console.log(`🆕 New tools found: ${newTools.length}`);
  
  if (newTools.length > 0) {
    // 添加到 app.js
    console.log('📝 Adding new tools to app.js...');
    // TODO: Implement tool addition logic
  }
  
  console.log('✅ Done');
}

main().catch(console.error);