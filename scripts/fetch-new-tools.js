const axios = require('axios');
const fs = require('fs');
const path = require('path');

// ==================== 搜索API配置 ====================
// 支持多个搜索源，按需切换

const SEARCH_CONFIG = {
    // 方案1: Tavily (推荐，专为AI设计)
    // 注册: https://tavily.com
    // 免费额度: 1000次/月
    tavily: {
        enabled: true,  // 已启用
        apiKey: process.env.TAVILY_API_KEY || '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',
        baseUrl: 'https://api.tavily.com/search',
        price: '免费1000次/月，之后$0.025/千次'
    },
    
    // 方案2: 博查AI搜索 (国产，便宜)
    // 注册: https://open.bochaai.com
    // 价格: ¥0.001-0.003/次
    bocha: {
        enabled: false,
        apiKey: process.env.BOCHA_API_KEY,
        baseUrl: 'https://api.bochaai.com/v1/search',
        price: '约¥1-3/千次'
    },
    
    // 方案3: Azure Bing Search (微软)
    // 注册: Azure Portal -> Bing Search v7
    // 免费额度: 1000次/月
    azureBing: {
        enabled: false,
        apiKey: process.env.AZURE_BING_KEY,
        baseUrl: 'https://api.bing.microsoft.com/v7.0/search',
        price: '免费1000次/月，之后$7/千次'
    },
    
    // 方案4: Brave (原方案，较贵)
    // 注册: https://brave.com/search/api
    brave: {
        enabled: !!process.env.BRAVE_API_KEY,
        apiKey: process.env.BRAVE_API_KEY,
        baseUrl: 'https://api.search.brave.com/res/v1/web/search',
        price: '$3/千次起'
    }
};

// 获取当前启用的搜索源
function getActiveSearchProvider() {
    for (const [name, config] of Object.entries(SEARCH_CONFIG)) {
        if (config.enabled && config.apiKey) {
            return { name, ...config };
        }
    }
    return null;
}

// ==================== 搜索关键词 ====================
const SEARCH_QUERIES = {
    global: [
        'new AI tools 2025',
        'AI productivity tools launched this month',
        'Product Hunt AI tools trending',
        'AI video generation new releases',
        'open source AI tools github trending'
    ],
    cn: [
        'AI工具新品发布 2025',
        '国产AI大模型新品',
        '即刻AI工具推荐',
        '掘金AI产品',
        '36kr AI创业公司'
    ]
};

// ==================== 搜索实现 ====================

async function searchWithTavily(query, apiKey) {
    const response = await axios.post('https://api.tavily.com/search', {
        query: query,
        search_depth: 'basic',
        include_answer: false,
        include_images: false,
        include_raw_content: false,
        max_results: 5
    }, {
        headers: { 'Authorization': `Bearer ${apiKey}` },
        timeout: 15000
    });
    
    return response.data.results?.map(r => ({
        title: r.title,
        url: r.url,
        description: r.content
    })) || [];
}

async function searchWithBocha(query, apiKey) {
    const response = await axios.get('https://api.bochaai.com/v1/web-search', {
        params: {
            query: query,
            count: 5,
            freshness: 'week'
        },
        headers: { 
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        timeout: 15000
    });
    
    return response.data.data?.webPages?.value?.map(r => ({
        title: r.name,
        url: r.url,
        description: r.snippet
    })) || [];
}

async function searchWithAzureBing(query, apiKey) {
    const response = await axios.get('https://api.bing.microsoft.com/v7.0/search', {
        params: {
            q: query,
            count: 5,
            freshness: 'Week'
        },
        headers: { 'Ocp-Apim-Subscription-Key': apiKey },
        timeout: 15000
    });
    
    return response.data.webPages?.value?.map(r => ({
        title: r.name,
        url: r.url,
        description: r.snippet
    })) || [];
}

async function searchWithBrave(query, apiKey) {
    const response = await axios.get('https://api.search.brave.com/res/v1/web/search', {
        params: {
            q: query,
            count: 5,
            freshness: 'pw'
        },
        headers: {
            'Accept': 'application/json',
            'X-Subscription-Token': apiKey
        },
        timeout: 15000
    });
    
    return response.data.web?.results?.map(r => ({
        title: r.title,
        url: r.url,
        description: r.description
    })) || [];
}

// ==================== 主搜索函数 ====================

async function searchNewTools() {
    const provider = getActiveSearchProvider();
    
    if (!provider) {
        console.log('⚠️  未配置搜索API，请在环境变量中设置以下任一：');
        console.log('   - TAVILY_API_KEY (推荐，免费1000次/月)');
        console.log('   - BOCHA_API_KEY (国产，便宜)');
        console.log('   - AZURE_BING_KEY (微软，稳定)');
        console.log('   - BRAVE_API_KEY (原方案，较贵)');
        return [];
    }
    
    console.log(`🔍 使用搜索源: ${provider.name} (${provider.price})`);
    
    const allResults = [];
    const searchFn = {
        tavily: searchWithTavily,
        bocha: searchWithBocha,
        azureBing: searchWithAzureBing,
        brave: searchWithBrave
    }[provider.name];
    
    for (const [region, queries] of Object.entries(SEARCH_QUERIES)) {
        console.log(`\n📍 搜索地区: ${region === 'cn' ? '中文' : '全球'}`);
        
        for (const query of queries) {
            try {
                console.log(`   🔎 ${query}`);
                const results = await searchFn(query, provider.apiKey);
                
                for (const result of results) {
                    const tool = parseSearchResult(result, region);
                    if (tool && !isDuplicate(tool)) {
                        allResults.push(tool);
                    }
                }
                
                await sleep(1000); // 避免请求过快
                
            } catch (error) {
                console.error(`   ❌ 搜索失败: ${error.message}`);
            }
        }
    }
    
    return allResults;
}

// ==================== 工具解析和去重 ====================

function parseSearchResult(result, region) {
    // 简单解析，实际可用LLM进一步处理
    const domain = new URL(result.url).hostname.replace('www.', '');
    
    return {
        name: result.title.split(' - ')[0].slice(0, 30),
        description: result.description.slice(0, 100),
        url: result.url,
        source: domain,
        region: region === 'cn' ? 'cn' : 'global',
        raw: result
    };
}

const seenTools = new Set();

function isDuplicate(tool) {
    const key = tool.name.toLowerCase();
    if (seenTools.has(key)) return true;
    seenTools.add(key);
    return false;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ==================== 主函数 ====================

async function main() {
    console.log('🐻 BabyBear AI Daily Update');
    console.log('==========================\n');
    
    const newTools = await searchNewTools();
    
    console.log(`\n✅ 发现 ${newTools.length} 个潜在新工具`);
    
    if (newTools.length > 0) {
        // 输出到文件供人工审核
        const outputPath = path.join(__dirname, '..', 'new_tools_candidates.json');
        fs.writeFileSync(outputPath, JSON.stringify(newTools, null, 2));
        console.log(`📝 结果已保存: ${outputPath}`);
        console.log('   请审核后手动添加到 app.js');
    }
}

main().catch(console.error);