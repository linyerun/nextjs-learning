# demo04-ch15+

基于 `demo01-quickstart` 初始化：Next.js 16 + React 19 + Tailwind CSS 4 + shadcn/ui。只保留工具链与 UI 基础件（button、input），demo01 中的路由/API 学习页面未复制。

## Getting Started

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

## 初始化说明

`node_modules` 直接从 `demo01-quickstart/node_modules` 本地克隆（APFS copy-on-write），未联网下载任何依赖。

注：npm 包名不允许 `+`，package.json 中 name 为 `demo04-ch15`，目录名为 `demo04-ch15+`。