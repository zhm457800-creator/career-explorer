# Career Explorer — 个人数字名片

> 从物理世界的审计员到数字星系的探索者，在算法的深处重构永恒的「探险者」图腾。

---

## 🎯 项目简介

**Career Explorer** 是一个精心设计的个人职业探索网站，网站首页构思来自《布鲁克林有棵树》，以「天堂树」的成长为隐喻，展现从种子萌芽、树皮沉积到花朵绽放的三个成长阶段。网站采用极简赛博朋克美学+剪纸童话手绘的风格碰撞，通过动画交互和精心设计的视觉语言，讲述一个审计转型到 AI 领域的探索故事。

### 核心理念

> "That tree is like some people. It grows best in the **dark**."

网站首页的交互设计以此为核心——鼠标移动时的「透镜」效果，让你在「黑暗」中发现「光明」的惊喜。

---

## 🎨 设计亮点

### 视觉风格

- **赛博朋克美学** — 霓虹色调、深色背景、玻璃拟态效果
- **神经网络背景** — 动态粒子连线动画，模拟神经细胞的连接与传导
- **3D 透视卡片** — 鼠标悬停产生立体倾斜效果
- **磨砂玻璃面板** — 毛玻璃模糊效果，增加层次感

### 交互设计

- **首页透镜效果** — 鼠标移动时reveal隐藏的文字（从 "dark" 到 "light"）
- **底部轮播** — 展示兴趣爱好（Playing/Watching/Reading/Listening）
- **顶部轮播** — 展示身份特质（INTRO/CITY/INFJ/AI/GOAL）
- **抽屉式导航** — 点击模块展开侧滑抽屉
- **滚动动画** — GSAP + Framer Motion 驱动的入场动画

---

## 🏗️ 技术架构

### 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | 19.0.0 | UI 框架 |
| TypeScript | ~5.8.2 | 类型安全 |
| Vite | 6.2.0 | 构建工具 |
| Tailwind CSS | 4.1.14 | 样式方案 |
| Framer Motion | 12.23.24 | 动画库 |
| GSAP | 3.14.2 | 高级动画 |
| React Router DOM | 7.13.2 | 路由管理 |
| Lucide React | 0.546.0 | 图标库 |
| Cheerio | 1.0.0 | HTML 解析 |
| Express | 4.21.2 | 本地代理服务器 |
| Axios | 1.7.9 | HTTP 请求 |

### 页面结构

```
src/
├── App.tsx                      # 路由配置
├── main.tsx                   # 入口文件
├── index.css                   # 全局样式
├── components/
│   ├── AboutCarousel.tsx      # 关于页轮播组件
│   ├── AIToolkitDrawer.tsx    # AI工具抽屉
│   ├── Assistant.tsx          # 助手组件
│   ├── CyberpunkImage.tsx      # 赛博朋克图片组件
│   ├── Layout.tsx             # 布局组件
│   ├── NarrativeDrawer.tsx      # 叙事抽屉
│   ├── NeuralBackground.tsx     # 神经网络背景
│   ├── ResearchDrawer.tsx      # 研究抽屉
│   ├── ScrollToTop.tsx        # 滚动到顶部
│   ├── TarotDrawer.tsx          # 塔罗牌抽屉
│   └── WeChatArticleCard.tsx    # 微信文章卡片
├── pages/
│   ├── Home.tsx              # 首页（种子/树皮/花朵）
│   ├── About.tsx             # 关于页（身份特质/经历）
│   ├── Archive.tsx           # 归档页
│   ├── Experience.tsx         # 经验页
│   └── Extension.tsx          # 扩展模块页（4个抽屉入口）
├── lib/
│   └── assets.ts             # 图片资源管理
└── services/
    └── imageGenerator.ts      # 图片生成服务
```

### 路由配置

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | Home | 首页，展示成长三阶段 |
| `/about` | About | 关于页，个人特质展示 |
| `/archive` | Archive | 归档页 |
| `/experience` | Experience | 职业经验展示 |
| `/extension` | Extension | 扩展模块入口 |

---

## 🚀 快速开始

### 开发环境

```bash
# 进入项目目录
cd 018_project_career-explorer（个人网站）

# 安装依赖
npm install

# 启动开发服务器（前端）
npm run dev

# 启动代理服务器（微信文章抓取）
npm run dev:server

# 同时启动前后端
npm run dev:all
```

访问 http://localhost:3000

### 构建部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 部署到本地（生成 dist）
npm run deploy:local
```

### 代码质量

```bash
# TypeScript 类型检查
npm run lint

# 运行测试
npm run test

# 测试覆盖率
npm run test:coverage
```

---

## 🎬 功能模块详解

### 01 Narrative（叙事抽屉）

展示公众号文章的模块，包含：
- 微信文章卡片展示
- 文章详情弹窗
- 文章分类筛选

### 02 AI Toolkits（AI工具抽屉）

AI 工具导航模块，包含：
- 工具分类展示
- 搜索过滤功能
- 快速跳转链接

### 03 Feeding Brain（喂养大脑）

塔罗牌抽卡与解读模块，包含：
- 每日塔罗牌抽取
- 牌义解读
- 记录抽卡历史

### 04 Researching（研究抽屉）

研究探索模块，包含：
- API 调用演示
- 代码片段展示
- 学习笔记

---

## 📱 响应式设计

网站完全响应式，适配以下屏幕尺寸：

| 断点 | 宽度 | 布局 |
|------|------|------|
| Mobile | < 768px | 单列布局 |
| Tablet | 768px - 1024px | 双列布局 |
| Desktop | > 1024px | 多列布局 |

---

## 🎨 设计系统

### 配色方案

| 颜色名称 | 用途 | Hex |
|----------|------|-----|
| background | 背景色 | `#1A1A1B` |
| surface | 表面色 | `#2A2A2B` |
| primary | 主色调 | `#D8A7B1` |
| on-surface | 文字色 | `#F4F1ED` |
| outline-variant | 边框色 | `rgba(244,241,237,0.08)` |

### 字体系统

| 字体 | 用途 | 字重 |
|------|------|------|
| font-headline | 标题 | Black / Bold |
| font-body | 正文 | Regular |
| font-label | 标签 | Medium |
| font-serif-italic | 引用 | Italic |

### 动画系统

| 动画名称 | 触发 | 效果 |
|----------|------|------|
| lens-mask | 鼠标移动 | 圆形裁切 reveal |
| marquee-vertical | 自动 | 垂直滚动文字 |
| signal-blink | 自动 | 信号闪烁 |
| grid-lines-bg | 鼠标悬停 | 网格背景显现 |
| particle-drift | 鼠标悬停 | 粒子飘动 |

---

## 📸 截图预览

> 以下截图展示网站的各个页面和模块：

### 首页（Home）

![[screenshots/f81f27cc-43cd-4553-8c5b-3b5aeccc3cce.png]]
首页主视觉，展示「天堂树」的隐喻

### 关于页（About）

![[screenshots/Pasted image 20260415143216.png]]
顶部轮播，展示身份特质

### 经历页（Experience）

![[screenshots/588ef528-6121-4b00-ba29-57d6ef2ae777.png]]
个人经历

### 扩展页（Extension）

![[screenshots/511c9f6d-9e36-4823-b347-b2d71a93f8ae.png]]
四个抽屉模块入口

### 扩展页（更多）

![[screenshots/Pasted image 20260415143401.png]]
AI 工具抽屉

![[screenshots/Pasted image 20260415143432.png]]
塔罗牌抽屉

---

## 🌐 部署

### GitHub Pages 部署

1. 构建项目：`npm run build`
2. 将 `dist` 目录内容推送到 GitHub 仓库
3. 在仓库 Settings → Pages 中设置：
   - Source: `Deploy from a branch`
   - Branch: `main` / `gh-pages`
   - Folder: `/ (root)`
4. 访问 `https://你的用户名.github.io/仓库名/`

### 自定义域名

如果使用自定义域名：
1. 在仓库 Settings → Pages 中添加自定义域名
2. 在域名提供商处配置 CNAME 记录指向 GitHub Pages URL

---

## 🔧 配置说明

### 开发端口

默认端口：`3000`

在 `package.json` 中修改：
```json
"dev": "vite --port=3000 --host=0.0.0.0"
```

### 代理服务器

微信文章代理服务器默认端口：`3001`

如需修改，检查 `server/wechat-proxy.ts` 文件。

---

## 🛠️ 项目结构详解

### 图片资源（assets.ts）

所有图片资源在 `src/lib/assets.ts` 中集中管理：

```typescript
export const IMAGE_ASSETS = {
  home: { /* 首页图片 */ },
  about: { /* 关于页图片 */ },
  experience: { /* 经验页图片 */ },
  extension: { /* 扩展页图片 */ }
};
```

图片命名规范：
- `{页面}_{序号}_{描述}.webp`
- 示例：`home_01_hero_bg.webp`, `about_01_intro.webp`

### 图片格式

- 生产环境使用 `.webp` 格式以获得最佳压缩
- 开发环境可使用其他格式

---

## 📦 依赖管理

### 生产依赖

```json
"dependencies": {
  "@google/genai": "^1.29.0",
  "axios": "^1.7.9",
  "cheerio": "^1.0.0",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "express": "^4.21.2",
  "gsap": "^3.14.2",
  "lucide-react": "^0.546.0",
  "motion": "^12.23.24",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^7.13.2",
  "vite": "^6.2.0"
}
```

### 开发依赖

```json
"devDependencies": {
  "@testing-library/react": "^16.2.0",
  "@types/cors": "^2.8.17",
  "@types/express": "^4.17.21",
  "@types/node": "^22.14.0",
  "autoprefixer": "^10.4.21",
  "jsdom": "^25.0.1",
  "sharp": "^0.34.5",
  "tailwindcss": "^4.1.14",
  "tsx": "^4.21.0",
  "typescript": "~5.8.2",
  "vitest": "^3.1.1"
}
```

---

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建分支：`git checkout -b feature/你的功能`
3. 提交更改：`git commit -m 'Add: 你的功能描述'`
4. 推送分支：`git push origin feature/你的功能`
5. 提交 Pull Request

---

## 📄 版权声明

© 2026 zhm457800. All rights reserved.

未经授权，禁止转载或商用。

---

## 🙏 致谢

- [React](https://react.dev/) — UI 框架
- [Tailwind CSS](https://tailwindcss.com/) — 样式方案
- [Framer Motion](https://www.framer.com/motion/) — 动画库
- [GSAP](https://greensock.com/gsap/) — 高级动画
- [Vite](https://vite.dev/) — 构建工具

---

## 📞 联系方式

- GitHub: [zhm457800-creator](https://github.com/zhm457800-creator)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/zhm457800-creator">zhm457800-creator</a>
</p>