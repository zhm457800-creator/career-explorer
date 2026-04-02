# 微信公众号文章集成

本项目提供了一个完整的前后端解决方案，用于在个人网站中展示微信公众号文章。

## 功能特性

- ✅ 自动抓取微信公众号文章元数据（标题、封面图、摘要）
- ✅ 卡片式布局，支持响应式设计
- ✅ 懒加载优化，减少首屏请求
- ✅ 图片加载失败自动降级
- ✅ 完整的暗黑模式支持
- ✅ 键盘导航和无障碍支持
- ✅ 新标签页打开原文链接（安全属性）
- ✅ 单元测试覆盖 ≥ 80%

## 项目结构

```
├── server/
│   ├── wechat-proxy.ts          # 后端代理服务
│   └── __tests__/
│       └── wechat-proxy.test.js # 后端测试
├── src/
│   ├── components/
│   │   ├── WeChatArticleCard.tsx      # 文章卡片组件
│   │   ├── WeChatArticleGrid.tsx      # 网格布局组件
│   │   └── __tests__/
│   │       └── WeChatArticleCard.test.tsx # 组件测试
│   ├── styles/
│   │   └── wechat-article.css         # 样式文件
│   └── NarrativeDrawer.tsx            # 页面集成示例
├── .env.example                        # 环境变量模板
└── docs/
    └── WECHAT_INTEGRATION.md          # 本文档
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env` 并根据需要修改：

```bash
cp .env.example .env
```

主要配置项：

- `PORT`: 后端服务端口（默认 3001）
- `VITE_API_BASE_URL`: 前端调用的 API 地址
- `CORS_ORIGIN`: 允许的跨域来源
- `REQUEST_TIMEOUT`: 请求超时时间（毫秒）

### 3. 启动后端代理服务

```bash
# 开发模式（热重载）
npm run dev:server

# 或使用 tsx 直接运行
npx tsx server/wechat-proxy.ts
```

### 4. 启动前端开发服务器

```bash
npm run dev
```

### 5. 同时启动前后端

```bash
npm run dev:all
```

## 使用方式

### 在 NarrativeDrawer 中使用

文章 URL 已在 `NarrativeDrawer.tsx` 中配置：

```typescript
const WECHAT_ARTICLE_URLS = [
  'https://mp.weixin.qq.com/s/iaxqb_l5jk1Vw-8vnlUQMw',
  'https://mp.weixin.qq.com/s/Lj_QJ0BeQvZYyn2DLkP2JQ',
  'https://mp.weixin.qq.com/s/6codMOYC3l5yMSSmFcXKqw',
  'https://mp.weixin.qq.com/s/pcVY8xocuAerwTZfhEn6SQ',
];
```

### 单独使用组件

```tsx
import { WeChatArticleGrid } from './components/WeChatArticleCard';

const urls = [
  'https://mp.weixin.qq.com/s/your-article-url-1',
  'https://mp.weixin.qq.com/s/your-article-url-2',
];

<WeChatArticleGrid urls={urls} />
```

### 自定义配置

```tsx
<WeChatArticleGrid 
  urls={urls}
  className="custom-grid-class"
/>
```

## API 文档

### 获取文章列表

```
POST /api/fetch-articles
Content-Type: application/json

{
  "urls": [
    "https://mp.weixin.qq.com/s/article1",
    "https://mp.weixin.qq.com/s/article2"
  ]
}
```

**响应示例：**

```json
{
  "success": true,
  "articles": [
    {
      "success": true,
      "data": {
        "title": "文章标题",
        "coverImage": "https://example.com/cover.jpg",
        "summary": "文章摘要...",
        "url": "https://mp.weixin.qq.com/s/article1",
        "fetchedAt": "2024-01-01T00:00:00.000Z"
      }
    }
  ],
  "total": 1,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 健康检查

```
GET /api/health
```

**响应示例：**

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 性能优化

- **首屏渲染**: 使用 IntersectionObserver 实现懒加载
- **请求优化**: 最大并发请求限制为 10 个 URL
- **图片优化**: 支持 lazy-load 和 WebP 格式
- **缓存策略**: 建议在生产环境添加 CDN 缓存

### 性能指标

- 首屏渲染: < 3s
- LCP: < 2.5s
- 初始请求: ≤ 4 个

## 浏览器兼容性

- Chrome ≥ 90
- Safari ≥ 14
- Firefox ≥ 88
- Edge ≥ 90
- 微信内置浏览器

## 测试

### 运行所有测试

```bash
npm test
```

### 生成覆盖率报告

```bash
npm run test:coverage
```

### 测试场景覆盖

- ✅ 加载状态显示
- ✅ 成功获取文章数据
- ✅ 网络错误处理
- ✅ HTTP 错误处理
- ✅ 图片加载失败降级
- ✅ 点击跳转新标签页
- ✅ 暗黑模式切换
- ✅ 键盘导航支持
- ✅ API 端点验证
- ✅ 速率限制验证

## 部署

### Docker 部署（推荐）

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY server/ ./server/
COPY dist/ ./dist/

ENV PORT=3001
ENV NODE_ENV=production

EXPOSE 3001

CMD ["node", "server/wechat-proxy.js"]
```

### 环境变量配置

生产环境建议设置：

```bash
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://your-domain.com
REQUEST_TIMEOUT=15000
```

### Nginx 配置示例

```nginx
location /api/ {
    proxy_pass http://localhost:3001;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}

location / {
    try_files $uri $uri/ /index.html;
}
```

## 故障排除

### 1. CORS 错误

确保 `.env` 中的 `CORS_ORIGIN` 设置正确：

```bash
CORS_ORIGIN=http://localhost:3000
```

### 2. 无法获取文章

微信公众号可能有访问限制，可以：
- 检查网络连接
- 确认文章链接有效
- 查看后端服务日志

### 3. 图片加载失败

组件会自动显示占位图并记录警告日志。

### 4. 端口冲突

修改 `.env` 中的端口：

```bash
PORT=3002
```

## 安全说明

- 所有外部链接都使用 `rel="noopener noreferrer"`
- 支持 CSP 内容安全策略
- 输入验证防止 XSS 攻击
- 速率限制防止滥用

## 许可证

MIT License

## 作者

Architectural Monolith
