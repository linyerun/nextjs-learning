# demo08-better-auth

基于 `demo07-prisma` 初始化，用于学习 better-auth。

## 继承内容

- 工具链：Next.js 16 + React 19 + Tailwind CSS 4（含 sass）
- Prisma 完整配置：`prisma/schema.prisma`（User/Post）、`prisma7.config.ts`、`src/lib/prisma.ts`、`src/generated/prisma`（已生成的 client）、`/api/v1/users` 示例接口
- `.env` 原样继承（`DATABASE_URL` 指向 demo07 同一个库），接入 better-auth 时建议改到独立数据库并补充 `BETTER_AUTH_SECRET`、`BETTER_AUTH_URL`

## Getting Started

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

## 常见问题

- [GitHub OAuth 登录问题排查（redirect_uri / invalid_code / 数据被清空）](docs/troubleshooting-github-oauth.md)

## 初始化说明

`node_modules` 直接从 `demo07-prisma/node_modules` 本地克隆（APFS copy-on-write），未联网下载任何依赖。

注意：`better-auth` 未安装，本地 npm 缓存中也没有，安装时需要联网。