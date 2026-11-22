---
name: add-shadcn-component
description: Add or update shadcn/ui components in the demo01-quickstart Next.js app (workspace root nextjs-learning). Use when the user asks to 新增/添加/安装 shadcn 组件（dialog、card、table、form、select、tabs、sonner、dropdown-menu 等）、用 shadcn 做一个 UI、或在这个项目里补装 UI 依赖。
---

# Add shadcn/ui Component

在 `demo01-quickstart` 中通过 shadcn CLI 安装组件，并做浏览器级验证。不要手写 `src/components/ui/` 下的组件，也不要重新 init（配置已就绪）。

## 项目事实（不要改动的前提）

- 应用目录：`demo01-quickstart/`（仓库根是 `nextjs-learning/`）。命令在应用目录执行：从仓库根先 `cd demo01-quickstart`，已在应用目录则跳过
- Next.js 16.4.6（定制版，见 `demo01-quickstart/AGENTS.md`）、React 19、App Router、`src/` 目录、别名 `@/* -> ./src/*`
- Tailwind CSS v4，经 `next.config.ts` 的 `turbopack.rules` 用 `@tailwindcss/turbopack` 加载；**没有** `tailwind.config.*`、**没有** postcss 配置，不要新建
- shadcn 4.23.0，配置在 `demo01-quickstart/components.json`：style `radix-nova`、base `radix`、baseColor `neutral`、iconLibrary `lucide`、css `src/app/globals.css`
- `src/app/globals.css` 顶部三行 import 必须保留且顺序不变：
  ```css
  @import "tailwindcss";
  @import "tw-animate-css";
  @import "shadcn/tailwind.css";
  ```
  `shadcn` 包是运行时依赖（提供上面第三行的 CSS），不要卸载
- 主题是 oklch CSS 变量（`--primary`、`--muted-foreground` 等）；写样式用语义类（`bg-primary`、`text-muted-foreground`、`border-input`），不要写死颜色
- `card` 等组件可能依赖 `src/lib/utils.ts` 的 `cn`（来自 `cn` 包），不要替换为 clsx/tailwind-merge
- 字体变量约定：`src/app/layout.tsx` 中 Geist 用 `--font-sans`、Geist_Mono 用 `--font-mono`，不要改回 `--font-geist-*`（否则 `font-sans` 解析失败）
- 已安装组件：`button`、`input`。先 `npx shadcn@latest info` 查看，避免重复添加

## 添加组件

```bash
cd demo01-quickstart
npx shadcn@latest add <component> -y
# 多个：npx shadcn@latest add card dialog table -y
```

- 组件生成到 `src/components/ui/<name>.tsx`，用 `@/components/ui/<name>` 引入
- CLI 会自动安装所需依赖（如 `radix-ui` 新子包）；不要自行换版本或改 registry
- 若需要 `sonner`、`tooltip` 等带全局 Provider/Toaster 的组件：按新增文件顶部注释或 registry 说明，把 Provider/Toaster 加到根 layout；不要为 button/input 这类纯组件加额外包装
- 只有 `components.json` 丢失时才重新 init：
  ```bash
  npx shadcn@latest init -y -b radix -p nova --no-monorepo
  ```
  前提是 `globals.css` 已含 `@import "tailwindcss";`，否则校验会报 "No Tailwind CSS configuration found"

## 验证（必须做，不能只报成功）

1. `cd demo01-quickstart && npx tsc --noEmit`
2. 建临时验证页 `src/app/<name>-check/page.tsx`：
   - **不要**用 `_` 或 `__` 开头的目录名，App Router 会当作私有目录导致 404
   - 页面里实际渲染新组件，覆盖常用 variant/props 和一次交互（打开 dialog、切换 tab、提交表单等）
3. `npm run dev`（后台启动，端口 3000）；请求页面拿到 200 后，用浏览器工具打开页面
4. 检查：组件外观符合主题、交互可用、控制台无 error/warn；需要时用 JS 读取 computed style 确认样式已生效
5. 验证完删除临时页面并停掉自己启动的 dev server

## 注意

- 本项目 Next 版本是定制版；若任务涉及 Next API（非 shadcn 组件本身），先读 `demo01-quickstart/node_modules/next/dist/docs/` 对应指南
- 不要动用户其他未提交的 WIP 页面；不要跑 `git clean`/`git reset` 之类清理
- 生产构建 `next build` 可能因仓库内 WIP 页面报无关错误，默认用 tsc + dev + 浏览器验证；用户要求构建时再跑

## 资源

无。本 skill 不需要 scripts/references。