# babybearai.com 邮件配置详细指南（免费方案）

这份文档教你用 **完全免费** 的方式，给域名 `babybearai.com` 启用邮件功能，并让 `send-offer.js` 能发出正式录取信。

---

## 一、先理清两件事：收信 vs 发信

很多人会混淆，其实邮件分两个独立能力：

| 能力 | 含义 | 这个夏令营需要它做什么 |
|------|------|----------------------|
| **收信（Receiving）** | 别人发到 `hello@babybearai.com` 时你能收到 | 家长来信、回复 offer |
| **发信（Sending / SMTP）** | 你的程序/邮箱能往外发邮件 | `send-offer.js` 发录取信 |

`send-offer.js` 只用到 **SMTP 发信**。所以最省心的免费组合是：

> **收信** 用 Cloudflare Email Routing（免费转发到你的 Gmail）
> **发信** 用 Brevo 免费 SMTP（每天 300 封，足够夏令营用）

下面分别配置。两部分相互独立，可以分开做。

---

## 二、发信：Brevo 免费 SMTP（最关键，先做这个）

Brevo（原 Sendinblue）免费套餐每天可发 300 封，提供标准 SMTP，且支持用自己的域名发信、自动配好 SPF/DKIM（决定邮件不进垃圾箱的关键）。

### 步骤 1 — 注册
1. 打开 https://www.brevo.com ，用邮箱注册一个免费账号。
2. 注册时填的「公司/网站」随便填，比如 `BabyBear Camp`。

### 步骤 2 — 验证你的域名（拿到 SPF/DKIM）
1. 登录后进入 **Senders, Domains & Dedicated IPs → Domains**（发件人与域名）。
2. 点 **Add a domain**，输入 `babybearai.com`。
3. Brevo 会给你 **2~3 条 DNS 记录**（一条 DKIM 的 TXT、一条 DMARC 的 TXT，有时还有 Brevo code）。形如：

   | 类型 | 主机名 / Name | 值 / Value |
   |------|--------------|-----------|
   | TXT  | `brevo._domainkey` | `k=rsa; p=MIGf...`（很长一串） |
   | TXT  | `@` 或 `babybearai.com` | `v=spf1 include:spf.brevo.com mx ~all` |
   | TXT  | `_dmarc` | `v=DMARC1; p=none;` |

4. 去你买域名的 DNS 后台（如果域名在 Cloudflare，就在 Cloudflare 的 DNS 页面），按上表 **逐条添加**。
   - 注意主机名：很多面板里只填前缀，比如 `brevo._domainkey`，不要带 `.babybearai.com`。
5. 回到 Brevo 点 **Verify / Authenticate**。DNS 生效通常几分钟，最长 1~24 小时。看到全绿的 ✓ 即成功。

### 步骤 3 — 拿到 SMTP 凭据
1. 进入 **左上角菜单 → SMTP & API**（或 Transactional → Email → SMTP）。
2. 你会看到：
   - **SMTP server**：`smtp-relay.brevo.com`
   - **Port**：`587`
   - **Login**：一串像 `8xxxxx@smtp-brevo.com` 的地址
   - **SMTP Key / Master Password**：点 **Generate a new SMTP key** 生成一串密钥
3. 把这些填进 `.env`：
   ```ini
   SMTP_HOST=smtp-relay.brevo.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=8xxxxx@smtp-brevo.com      # 上面的 Login
   SMTP_PASS=xsmtpsib-xxxxxxxx           # 上面生成的 SMTP key
   FROM_NAME=BabyBear 小熊双语夏令营
   FROM_EMAIL=admissions@babybearai.com  # 必须是已验证的 babybearai.com 地址
   REPLY_TO=hello@babybearai.com
   ```
   > 关键：`SMTP_USER` 是 Brevo 给的 login，**不是** 你的域名邮箱；而 `FROM_EMAIL` 才是收件人看到的发件地址，必须用刚验证过的 `@babybearai.com`。

### 步骤 4 — 测试
```bash
cd email-service
npm install
node send-offer.js --verify                          # 应显示 ✅ SMTP connection OK
node send-offer.js --preview --child "测试"           # 本地看看长什么样
node send-offer.js --to 你的私人邮箱@gmail.com --child "Emma" --parent "Ms. Li"
```
收到邮件、且没进垃圾箱，就成功了。

---

## 三、收信：Cloudflare Email Routing（免费转发到 Gmail）

这样别人发到 `hello@babybearai.com` 会自动转到你的私人 Gmail，**完全免费、无限地址**。

> 前提：把域名的 DNS 托管在 Cloudflare（免费）。如果 `babybearai.com` 当前不在 Cloudflare，可在 cloudflare.com 免费添加站点，按提示把域名的 Nameserver 改成 Cloudflare 给的两个地址。

1. Cloudflare 控制台选中 `babybearai.com` → 左侧 **Email → Email Routing**。
2. 点 **Get started / Enable**，Cloudflare 会自动添加所需的 **MX 记录** 和一条 SPF。点确认即可。
3. 在 **Routing rules → Custom addresses** 添加：
   - `hello@babybearai.com` → 转发到 `你的@gmail.com`
   - 可以再加 `admissions@babybearai.com`、`info@…` 等，都转到同一个 Gmail。
4. Cloudflare 会给你的 Gmail 发一封验证信，点确认链接激活。
5. 之后所有发到这些地址的邮件都会进你的 Gmail 收件箱。

> ⚠️ SPF 合并：如果你两个服务（Brevo 发信 + Cloudflare 收信）都要往同一条 SPF 记录里加东西，**SPF 只能有一条**，要合并写，例如：
> `v=spf1 include:spf.brevo.com include:_spf.mx.cloudflare.net ~all`

---

## 四、（可选）想要一个真正的网页邮箱？用 Zoho 免费版

如果你希望有个能登录网页/手机收发的「正式邮箱」(而不只是转发)，可以用 **Zoho Mail 免费版**（Forever Free：1 个域名、最多 5 个用户、每人 5GB）。

1. https://www.zoho.com/mail/ → 注册 → 选 **Free Plan**。
2. 添加并验证域名 `babybearai.com`（按提示加一条 TXT 验证记录）。
3. 按 Zoho 提示配置 **MX 记录**（`mx.zoho.com` 等）和 **SPF/DKIM**。
4. 创建邮箱如 `admissions@babybearai.com`，设置登录密码。
5. 网页登录 mail.zoho.com 即可收发。

> 注意：Zoho 免费版对 IMAP/POP/SMTP 客户端访问时有限制，且策略时有调整。若免费版无法用 SMTP，发信仍建议走上面的 **Brevo**，Zoho 只用来做网页收信。
> 另外 Zoho 的 MX 和 Cloudflare Email Routing 的 MX **二选一**，同一个域名不能同时用两套收信。

---

## 五、三种方案怎么选？

| 你的需求 | 推荐 |
|---------|------|
| 只想让脚本能发 offer（最少配置） | **只配 Brevo（第二节）** |
| 既要发 offer，又要能收家长来信 | **Brevo 发信 + Cloudflare 收信（第二、三节）** ← 推荐 |
| 还想要一个能网页登录的正式邮箱 | **Brevo 发信 + Zoho 免费收信（第二、四节）** |

---

## 六、常见问题

- **邮件进了垃圾箱？** 多半是 SPF/DKIM 没配好或没验证通过。回到 Brevo 确认域名是全绿 ✓，并确保 SPF 只有一条且包含 `include:spf.brevo.com`。
- **`--verify` 报认证失败？** 检查 `SMTP_USER` 用的是 Brevo 的 login（`…@smtp-brevo.com`），`SMTP_PASS` 用的是 SMTP key 而不是网站登录密码。
- **DNS 改了不生效？** 等几分钟到几小时；可用 https://mxtoolbox.com 查 TXT/MX 是否已传播。
- **想换成 Resend / SendGrid？** 同理：注册 → 验证域名拿 SPF/DKIM → 在它们后台找 SMTP host/port/user/pass 填进 `.env` 即可，`send-offer.js` 不用改。
