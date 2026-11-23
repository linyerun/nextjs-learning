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
  - Static           : (1)就是静态组件;(2)加了缓存的动态组件, "use cache";、cacheLife
  - Partial Prerender: 动态组件配合Suspense标签达到的效果
  - Dynamic          : 本身是动态组件，然后export const instant = false;不写这个直接报错,一般也不会这么用

# 关于组件渲染
