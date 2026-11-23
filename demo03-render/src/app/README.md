# 客户端组件和服务端组件简介
- 客户端组件: 带交互的，不能嵌套服务端组件
- 服务的组件：不带交互的，它里面可以嵌套客户端组件


# 关于服务端组件
- 下面说明都以配置了next.config.ts的组件缓存为基础
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /*cacheComponents + partialPrefetching 是一套组合（PPR / 组件级缓存 + 局部预取），负责服务端渲染、路由预加载加速*/
    /*关闭缓存需要cacheComponents、partialPrefetching都设置为缓存*/
    cacheComponents: true,
    partialPrefetching: true
};

export default nextConfig;
```

---

```text
Route (app)                   Revalidate  Expire
┌ ○ /
├ ○ /_not-found
├ ƒ /blocking
├ ○ /client
├ ƒ /server/dynamic
├ ○ /server/prerendered               1h      1d
├ ◐ /server/prerendered/db
├ ◐ /server/prerendered/imgs
└ ○ /server/static


○  (Static)             prerendered as static content
◐  (Partial Prerender)  prerendered as static HTML with dynamic server-streamed content
ƒ  (Dynamic)            server-rendered on demand
```

- 服务端组件都可以进行一个区分: 
  - Static           : (1)静态服务端组件;(2)加了缓存的动态组件, "use cache";、cacheLife
  - Partial Prerender: 动态服务端组件
  - Dynamic          : 本身是动态服务端组件，然后export const instant = false;不写这个直接报错,一般也不会这么用

# 客户端组件与服务端组件的用法
## 客户端组件
- 编写这个组件时需要在文件首行加上 "use client"
- 客户端组件函数不能是异步函数，获取请求数据可以放在useEffect中进行获取

## 服务端组件
- “静态”服务端组件, 组件函数可以是异步的也可以是同步的
- “动态”服务的组件
    - dynamic类型, 加不加loading.tsx和Suspense标签都可以, 不过能加还是加一下
    - 加缓存的类型("use cache"), 加不加loading.tsx和Suspense标签都可以, 不过能加还是加一下
    - 加“await connection()”的预渲染类型, “await connection()”之前的逻辑服务端预渲染后面的逻辑是服务端后渲染逻辑, 走的是Partial Prerender, 必须加loading.tsx或者Suspense标签
    - 被nextjs判断为动态内容, 走的是Partial Prerender, 必须加loading.tsx或者Suspense标签
## 服务端组件的实现原理
Next.js 会通过(Partial Prerendering/PPR)技术,实现静态外壳(Static Shell)渲染，提供占位符，当用户请求时，再通过流式传输(Streaming)填充里面的动态内容，以此提升首屏加载速度和用户体验。
