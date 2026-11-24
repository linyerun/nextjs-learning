# prisma依赖安装
```bash
# 用这个脚本生成代码
npm install -g prisma@7
```

```bash
# 在项目中安装prisma-pg依赖
npm install prisma@prev @types/node @types/pg --save-dev
npm install @prisma/client@7 @prisma/adapter-pg pg dotenv
```

```bash
# 在项目根目录执行，生成.env、prisma7.config.ts、prisma/schema.prisma
prisma init --datasource-provider postgresql --output ../src/generated/prisma
```

```prisma
// prisma/schema.prisma加入表结构描述代码

generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model User {
  id        String   @id @default(cuid()) //主键
  name      String //用户名
  email     String   @unique //邮箱
  password  String //密码
  createdAt DateTime @default(now()) //创建时间
  updatedAt DateTime @updatedAt //更新时间
  posts     Post[] //关联文章
}

model Post {
  id        String   @id @default(cuid()) //主键
  title     String //标题
  content   String //内容
  createdAt DateTime @default(now()) //创建时间
  updatedAt DateTime @updatedAt //更新时间
  authorId  String //作者ID
  author    User     @relation(fields: [authorId], references: [id],onDelete: Cascade,onUpdate: Cascade) //一对多关联
}
```

```bash
# 只根据 schema 生成类型安全的客户端
prisma generate

# 直接把 schema 同步成数据库表，不记录迁移历史
prisma db push

# 反向操作：把已有数据库结构拉成 schema
prisma db pull
```



---

# demo07-prisma

基于 `demo06-css` 的工程配置初始化：Next.js 16 + React 19 + Tailwind CSS 4（含 sass 支持），用于学习 Prisma。demo06 里的 CSS 学习页面（home、scss、global）未复制。

## Getting Started

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

## 初始化说明

`node_modules` 直接从 `demo06-css/node_modules` 本地克隆（APFS copy-on-write），未联网下载任何依赖。

注意：`prisma` / `@prisma/client` 未安装，本地 npm 缓存中也没有，安装时需要联网。