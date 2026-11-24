# GitHub OAuth 登录问题排查（redirect_uri 不匹配 / invalid_code / 数据库被清空）

## 问题一：redirect_uri 不匹配（redirect_uri is not associated with this application）

### 现象

点击「GitHub 登录」后，GitHub 授权页显示：

> Be careful!
> The `redirect_uri` is not associated with this application.
> The application might be misconfigured or could be trying to redirect you to a website you weren't expecting.

### 原因

这个问题已经不是代码问题了。GitHub 授权页报错，说明 better-auth 发出去的：

```
http://localhost:3000/api/auth/callback/github
```

和 GitHub OAuth App 里登记的「Authorization callback URL」不一致，GitHub 拒绝跳回。

### 解决步骤

1. 打开 <https://github.com/settings/developers>（或在 GitHub → Settings → Developer settings → **OAuth Apps**）
2. 点开 Client ID 为 `Ov23liF0blK2FEc9yMwT` 的那个应用
3. 把 **Authorization callback URL** 改成下面这个值，一字不差：

   ```
   http://localhost:3000/api/auth/callback/github
   ```

4. 点 **Update application** 保存
5. 回到 <http://localhost:3000/github> 重新点「GitHub 登录」

### 匹配规则（容易踩坑）

GitHub 对这个地址做**精确字符串匹配**，以下都算不一致：

| 错误写法 | 原因 |
| --- | --- |
| `http://127.0.0.1:3000/api/auth/callback/github` | host 不同，`127.0.0.1` ≠ `localhost` |
| `http://localhost:3000/api/auth/callback/github/` | 多了一个尾部斜杠 |
| `https://localhost:3000/...` | 协议不同（本地是 http） |
| `http://localhost:3001/...` | 端口不同 |

### 补充说明

如果这个 App 之前是给线上环境用的、callback 已经填了别的域名：OAuth App 只支持**一个**回调地址，建议给本地开发单独新建一个 OAuth App，把新的 Client ID/Secret 填到 `.env` 的 `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` 即可，改完不用重启 dev server。

改完 GitHub 设置后刷新页面重试即可。如果仍报同样错误，把 App 设置页里 callback URL 的实际值拿来逐字比对。

## 问题二：回调后报 invalid_code（授权码兑换失败）

### 现象

GitHub 授权完成后，浏览器落到：

```
http://localhost:3000/api/auth/error?error=invalid_code
```

### 原因

`invalid_code` 表示 better-auth 拿回调里的 `code` 去 GitHub 换 token 时失败了（`node_modules/better-auth/dist/oauth2/callback.mjs` 中 `validateAuthorizationCode` 抛错即映射为 `INVALID_CODE`）。GitHub 的 authorization code 是**一次性**的，有效期约 10 分钟，以下操作都会触发：

| 触发场景 | 说明 |
| --- | --- |
| 刷新/回退旧的回调地址 | `/api/auth/callback/github?code=...` 里的 code 已被消费，二次请求必然失败 |
| 重复兑换 | 同一个 code 被兑换两次 |
| 超时 | 从点击登录到授权完成超过约 10 分钟（better-auth 的 state cookie 只有 5 分钟） |

这个问题与数据库无关：实测库被清空后重新走一遍 GitHub 登录，user/account/session 均正常创建。

### 解决

不要刷新或回退回调地址。回到 <http://localhost:3000/github> 重新点「GitHub 登录」，每次从入口页发起新流程即可。

## 排查记录：数据库数据被 DBeaver 手动清空

### 现象

登录成功后，`user` / `account` / `session` 三张表全部为空，`verification` 表的行数在两次查询之间从 2 变成 0。

### 排查

查询数据库连接活动：

```sql
select pid, usename, application_name, state, left(query, 80) as query
from pg_stat_activity
where datname = 'auth';
```

结果中有两个 `application_name = 'DBeaver 26.1.2 - Main <auth>'` 的连接，其中一个最后执行的查询是：

```
DELETE FROM public.verification WHERE id=$1
```

带 `$1` 占位符的 DELETE 是 DBeaver 数据网格里删行时生成的参数化 SQL。结合三张表全空、`_prisma_migrations` 的 `finished_at` 没有变化（可排除 `prisma migrate reset`），可以确定是**在 DBeaver 里手动删行**导致。

### 影响

- 旧账号（credential 密码凭证、GitHub 关联、session）全部丢失，邮箱密码登录需要重新注册
- 之后再走 GitHub 登录时按邮箱找不到老用户，会创建一个**全新用户**（昵称、头像直接取 GitHub 资料），不会恢复旧账号

### 建议

- 想重置数据优先用 `npx prisma migrate reset`（会重放迁移）；手动删行会同时丢掉 account/session 的关联关系
- 删完不需要重启 dev server；浏览器里的旧 session cookie 已失效，重新登录即可