import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// 添加内存缓存，避免重复抓取相同的文章
const articleCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

async function fetchWeChatArticle(url) {
  // 检查缓存
  const cached = articleCache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log(`Cache hit for: ${url}`);
    return cached.data;
  }

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      },
      timeout: 10000,
    });

    const $ = cheerio.load(response.data);
    
    const title = $('meta[property="og:title"]').attr('content') || 
                  $('meta[name="twitter:title"]').attr('content') ||
                  $('h1').first().text() ||
                  '';

    const coverImage = $('meta[property="og:image"]').attr('content') ||
                       $('meta[name="twitter:image"]').attr('content') ||
                       '';

    const description = $('meta[property="og:description"]').attr('content') ||
                        $('meta[name="description"]').attr('content') ||
                        '';

    let content = '';
    $('#js_content').find('p, span').each((i, el) => {
      const text = $(el).text().trim();
      if (text && text.length > 10) {
        content += text + ' ';
      }
      return i < 20;
    });
    content = content.trim();

    const summary = description || content.substring(0, 80) + (content.length > 80 ? '……' : '');
    const finalCoverImage = coverImage || 'https://via.placeholder.com/800x450?text=No+Image';

    const result = {
      success: true,
      data: {
        title: title.substring(0, 100),
        coverImage: finalCoverImage,
        summary: summary.substring(0, 80),
        url: url,
        fetchedAt: new Date().toISOString(),
      },
    };

    // 存入缓存
    articleCache.set(url, {
      data: result,
      timestamp: Date.now()
    });

    return result;
  } catch (error) {
    console.error(`Error fetching article: ${url}`, error.message);
    return {
      success: false,
      error: error.message,
      url: url,
    };
  }
}

app.post('/api/fetch-articles', async (req, res) => {
  const { urls } = req.body;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'Invalid request: urls array required' });
  }

  if (urls.length > 10) {
    return res.status(400).json({ error: 'Maximum 10 URLs allowed per request' });
  }

  try {
    const results = await Promise.all(
      urls.map(async (url) => {
        return await fetchWeChatArticle(url);
      })
    );

    res.json({
      success: true,
      articles: results,
      total: results.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`WeChat Proxy Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Fetch articles: POST http://localhost:${PORT}/api/fetch-articles`);
});

export { app, fetchWeChatArticle };
