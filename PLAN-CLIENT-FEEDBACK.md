# Mandy Express 客户意见改造计划

> 来源：2026-07-27 客户反馈（共 20 条）
> 状态标记：`[ ]` 待办 · `[x]` 完成 · `❓` 需客户确认后才能动手
> 行号基于 2026-07-27 的代码（HEAD = `9ebdd26 换算成英制`）

---

## 0. 待客户确认（8 个中已答 4 个）

| # | 问题 | 卡住哪几条 |
|---|---|---|
| ~~Q1~~ | ✅ **已答（07-27）**：438-921-7268 | A2 已完成 |
| Q2 | **实际车型是什么？**（车型名 + 最好给真车照片）现在全站用的是 2025 Mercedes-Benz Sprinter 加长高顶 | B1 |
| ~~Q3~~ | ✅ **已答（07-27）**：客户给了三条禁运品类（温控／危险品／活体），货品类型选项整组删掉 | C5 已完成 |
| Q4 | **车厢内部实际尺寸是多少？**（长×宽×高，以及最多能放几个标准板） | C6 |
| ~~Q5~~ | ✅ **已答（07-27）**：两个都改成下拉，只有多伦多／蒙特利尔两个选项 | C3 已完成 |
| ~~Q6~~ | ✅ **已答（07-27）**：整条删，电话／邮箱／官网／报价按钮一起删 | D1 已完成 |
| Q7 | **"about 页面路线图需要更新"** —— about 页面目前**没有**路线图（只有一个空的配图占位）。是指 Route 页面的地图，还是首页那张 `route-map-complete.png`？ | E1 |
| Q8 | **沿线小镇要列哪些？** 我可以先给一版候选（见 E3），客户圈定即可 | E3 |

---

## A. 全站 / Header / Footer

### [x] A1. Logo 放大
- **客户原话**：logo 放大
- **现状**：[Header.tsx:70](components/Header.tsx#L70) `w-[205px] md:w-[236px]`，另有 4 处断点用 `!important` 覆盖宽度：
  - [globals.css:1977](app/globals.css#L1977) 1024–1279px → 200px
  - [globals.css:2008](app/globals.css#L2008) ≤1023px → `clamp(160px, 38vw, 220px)`
  - [globals.css:2847](app/globals.css#L2847) ≤430px → `clamp(126px, 34vw, 150px)`
  - [globals.css:2878](app/globals.css#L2878) ≤389px → `clamp(116px, 35vw, 140px)`
- **改法**：五处同步等比放大约 20–25%；`.header-inner` 高度 108px（[globals.css:49](app/globals.css#L49)）需一起提到 ~124px，否则 logo 撑爆导航条。移动端要重新量，logo + 报价按钮 + 汉堡菜单在 389px 宽下已经很挤。
- **验收**：1440 / 1280 / 1024 / 768 / 430 / 375 六个宽度下 header 不换行、不溢出。

### [x] A2. 换电话号码 → 438-921-7268（2026-07-27 完成）
- **现状**：`514-623-5486` 共 **11 个文件 19 处**：
  - [Footer.tsx:33](components/Footer.tsx#L33)、[Footer.tsx:69](components/Footer.tsx#L69)（含 `tel:5146235486`）
  - [contact/page.tsx:33-34](app/[locale]/contact/page.tsx#L33)
  - [en.ts:62](lib/dictionaries/en.ts#L62)、[:163](lib/dictionaries/en.ts#L163)、[:201](lib/dictionaries/en.ts#L201)
  - [fr.ts:64](lib/dictionaries/fr.ts#L64)、[:165](lib/dictionaries/fr.ts#L165)、[:203](lib/dictionaries/fr.ts#L203)
  - [api/quote/route.ts](app/api/quote/route.ts) 5 处（含确认邮件正文 :291）
  - [api/contact/route.ts](app/api/contact/route.ts) 4 处
- **改法**：建议顺手抽成 `lib/contact-info.ts` 常量（`PHONE_DISPLAY` / `PHONE_TEL` / `EMAIL`），以后再改一处就够。
- **验收**：`grep -rn "623-5486\|5146235486"` 全站 0 命中。

### [x] A3. Header 字体调整（现在看不清楚）
- **现状**：[globals.css:106-114](app/globals.css#L106) `.nav-link` 用 `Impact, Haettenschweiler, "Arial Narrow Bold"`，18px，深蓝字；1024–1279px 还会缩到 16px（[:1973](app/globals.css#L1973)）。移动端 [.mobile-nav-link:96](app/globals.css#L96) 同一套字体。
- **问题根因**：Impact 字面窄、字重假粗，Windows / Android 常回退到 Arial Narrow，18px 下几乎糊成一团。
- **改法**（建议）：导航链接换成正常无衬线 + `font-weight:700`、`font-size:17→18px`、`letter-spacing:.02em`，保留大写。Logo 和标题保持 Impact 不动，只改导航。
- **验收**：移动端和桌面端导航文字清晰可读；`Route`/`About Us` 不换行。

### [x] A4. 版权年份 2024 改成动态
- **现状**：写死在字典里 —— [en.ts:98](lib/dictionaries/en.ts#L98) `"© 2024 Mandy Express Freight Service. All Rights Reserved."`、[fr.ts](lib/dictionaries/fr.ts) 同位置法语版。渲染点 [Footer.tsx:50](components/Footer.tsx#L50)。
- **改法**：字典改成带占位符的模板（如 `copyright: "© {year} Mandy Express …"`），Footer 里 `new Date().getFullYear()` 替换。Footer 是 server component，直接取当前年份即可，不会有 hydration 不一致问题。
- **验收**：页脚显示 `© 2026 …`；跨年自动变。

---

## B. 图片素材

### [ ] B1. 车型图与实际不符，需重新生成 ❓Q2
- **受影响图片**（`public/images/`）：
  - `hero-large.png` — 首页大图，画的是 2025 Sprinter 加长高顶，车身还印着 "2025 SPRINTER"
  - `fleet-hero.png` — Fleet 页 + About 页 hero 共用
  - `fleet-cargo-van.png` — Fleet 页产品图
  - `service-cargo-van-driving.png` / `service-van-interior.png` / `service-door-loading.png` / `service-highway-401.png`
  - `about-hero.png` / `hero-reference.png` / `home-reference.png`
- **同时要改的文案**（都写死了车型名）：
  - [en.ts:67](lib/dictionaries/en.ts#L67) `home.heroAlt` "…2025 Mercedes-Benz Sprinter Extended High Roof"
  - [en.ts:211](lib/dictionaries/en.ts#L211) `servicesPage.heroImageAlt`
  - [en.ts:281](lib/dictionaries/en.ts#L281) `fleetPage.heroImageAlt`、[:283](lib/dictionaries/en.ts#L283) `vanImageAlt`、[:284](lib/dictionaries/en.ts#L284) `vanName: "Sprinter Cargo Van"`
  - `fr.ts` 对应的 5 处
- **改法**：拿到真车型／真照片前**不动手**。首页那张是带排版文字的合成图，替换成本最高，最好让客户直接给真车照片，我这边重排文字层。
- **验收**：全站不再出现 Sprinter 字样；`grep -rn "Sprinter"` 0 命中。

---

## C. Request a Quote 表单（改动最集中）

> 涉及三处联动：[QuoteModal.tsx](components/QuoteModal.tsx) 表单 UI + [api/quote/route.ts](app/api/quote/route.ts) 校验和邮件模板 + `en.ts`/`fr.ts` 文案。**任何一处删字段，另外两处必须同步删**，否则邮件模板会渲染 `undefined`。

### [x] C1. 删掉 Company Name 字段
- **改动清单**：
  - [QuoteModal.tsx:144-147](components/QuoteModal.tsx#L144) 删 label；[:57](components/QuoteModal.tsx#L57) payload 删 `company`
  - [route.ts:10](app/api/quote/route.ts#L10) 类型、[:60](app/api/quote/route.ts#L60) 必填校验、[:122](app/api/quote/route.ts#L122) 去重 key、[:313](app/api/quote/route.ts#L313) 垃圾内容检测、[:326](app/api/quote/route.ts#L326) normalize、[:458](app/api/quote/route.ts#L458) 邮件表格行
  - 字典删 `quote.company` / `quote.companyPlaceholder`（en + fr）
- **注意**：`companyWebsite` 是**蜜罐反垃圾字段**，长得像但不能删（[QuoteModal.tsx:135](components/QuoteModal.tsx#L135)）。
- **验收**：表单联系人区剩 3 个字段；提交后公司收到的邮件没有 "Company" 行。

### [x] C2. Phone 和 Email 强制二选一（2026-07-27 完成）
- **前端**：两个 input 都去掉 `required`，标签上的 `*` 也去掉；改为提交时校验「至少填一个」，不满足就停在表单上显示错误。联系人区底部加了一行橙色提示 `contact-hint`：「* Phone or email — please fill in at least one so we can reach you.」（法语同步）。
- **后端**：`REQUIRED_FIELD_MESSAGES` 移除 phone/email，改成 `!phone && !email` 才报错（新增 `MESSAGES.contactRequired`）；`isValidEmail` 改成**只在 email 非空时**才校验 —— 原来是无条件校验，不改的话只填电话会被空邮箱卡死。
- **⚠️ 那个关键连锁已处理**：确认邮件收件人和公司邮件的 `replyTo` 原本都写死用 `payload.email`。现在改成先构造 `companyEmail`（email 为空时**不带** `replyTo` 字段），再按 `payload.email` 是否存在决定批量数组是 1 封还是 2 封。只填电话时不再往空地址发确认信。
- **实测**：只填电话 ✅ 通过校验 · 只填邮箱 ✅ 通过 · 两个都空 ❌ 前后端都拦下（中英法文案都对）· 填了电话但邮箱格式错 ❌ 仍然拦下（不会因为有电话就放过烂邮箱）。
- **未实测**：真实发信那一步没跑 —— 本地 `.env.local` 配了 Resend，跑完整提交会真发一封到公司邮箱。逻辑已逐行核对，要不要做一次真实提交测试等确认。

### [x] C3. Pick-up / Delivery 改成下拉（✅ 客户 2026-07-27 定：两个都改下拉，只有多伦多和蒙特利尔两个选项）
- **原状**：两个自由输入框，均必填。
- **已改**：`pickupLocation` / `deliveryLocation` 都换成 `<select>`，选项来自新增的字典键 `quote.locationOptions` —— en 是 `["Toronto", "Montreal"]`，fr 是 `["Toronto", "Montréal"]`；placeholder 改成「Select pick-up / delivery location」。两个仍必填。
- **后端一并加了白名单**：字段现在是封闭枚举了，`app/api/quote/route.ts` 直接 import 两份字典拼出 `ALLOWED_LOCATIONS`，非清单内的值返回 400（新增 `MESSAGES.invalidLocation`，中英法都有）。这样以后往字典里加城市，后端自动跟着放行，不用改两处。
- **同城选择**：✅ 客户 2026-07-27 定 —— **不用改**，允许「多伦多 → 多伦多」这种选法，不加限制。

### [x] C4. Pick-up Date → 服务日期（Service Date）
- **改动**：字典 `quote.pickupDate` 文案改 "Service Date" / "Date de service"；邮件模板行标签 [route.ts:465](app/api/quote/route.ts#L465) `"Pickup date"` 一起改。
- **字段名 `pickupDate` 建议保留不动**（改名要动 4 个文件，收益为零）。
- **验收**：表单和邮件里都显示"服务日期"。

### [x] C5. Type of Goods 改成禁运清单（✅ 客户 2026-07-27 给了三条禁运品类）
- **已删**：6 个货品类型单选卡片（`quote.goodsTypes` en+fr）、CSS `.goods-grid` / `.choice-card` / `.quote-full-label` 及其移动端覆盖。
- **已加**：新面板「FLEET SECURITY & CARGO RESTRICTIONS / Sécurité de la flotte et marchandises refusées」，跨整行，三张红色警示卡：
  1. No Temperature-Controlled Goods（冷冻/冷藏/温控）
  2. No Hazardous Materials (Hazmat)（易燃化学品、爆炸物、锂电池组、挥发性工业品）
  3. No Live Animals / Sanitary Contraband（活体、宠物、生物制品、受限农产品）
  字典键：`quote.restrictionsHeading` / `restrictionsIntro` / `restrictions[]`，法语已翻译。CSS 新增 `.restrictions-panel` / `.restrictions-intro` / `.restrictions-list`，桌面 3 列、≤767px 单列。
- **`typeOfGoods` 字段整个删掉**（表单 + payload + API 类型/去重 key/normalize/邮件行 + en/fr 字典）。这一整块就是用来**声明不承运什么**的，不再收集客户填的货品类型。客户要描述货物可以写在 Additional Notes。
- **验收**：桌面/移动/中英法三种组合都实测过渲染正常；`/api/quote` 不带 `typeOfGoods` 提交能正常通过校验。

### [ ] C6. Number of Pallets 改成按我们的车厢尺寸 ❓Q4
- **现状**：纯数字输入 `type="number"`（[QuoteModal.tsx:203](components/QuoteModal.tsx#L203)），placeholder 是 "Select pallet quantity" 但其实不是下拉框。
- **改法**：拿到实际内部尺寸后，改成有上限的下拉（如 1–N 板），并在旁边标注车厢内部尺寸供客户比对。
- **验收**：不能填超过车能装的板数。

### [x] C7. Special Requirements 整块删除
- **改动清单**：
  - [QuoteModal.tsx:216-226](components/QuoteModal.tsx#L216) 删整个 section；[:68](components/QuoteModal.tsx#L68) payload 删 `specialRequirements`
  - [route.ts:21](app/api/quote/route.ts#L21) 类型、[:133](app/api/quote/route.ts#L133) 去重 key、[:338](app/api/quote/route.ts#L338) normalize、[:446](app/api/quote/route.ts#L446) `requirements` 变量、[:474](app/api/quote/route.ts#L474) 邮件 section
  - 字典删 `quote.specialRequirements` / `specialRequirementOptions`（en + fr）
  - CSS `.requirements-grid`（[globals.css:1867-1885](app/globals.css#L1867)）可一并清掉
  - `asStringArray` 若无其他调用方，一起删（[route.ts:159](app/api/quote/route.ts#L159)）
- **验收**：表单少一整块；邮件没有 "Special Requirements" 段落。

---

## D. 页脚

### [x] D1. 删掉 "Ready to ship today?" 整行（✅ 客户 2026-07-27 定：整条删，含电话/邮箱/官网/Get a Quote）
- **已删**：`Footer.tsx` 里整个 `.footer-cta-bar` 区块；`QuoteButton` 的 import 随之去掉（页脚已无别处用到）。
- **连带清理**：
  - 字典 `footer.ctaTitle` / `ctaLine1` / `ctaLine2`（en + fr）
  - CSS `.footer-cta-bar` / `.footer-cta-inner` / `.footer-cta-intro` / `.footer-cta-title` / `.contact-round` / `.footer-small` / `.footer-contact` / `.footer-quote-button`，含 ≤1023px 和 ≤767px 两处断点覆盖
  - `.footer-cta-title, .footer-heading` 和 `.footer-contact, .footer-list-contact` 这两条是共用选择器，只摘掉被删的那半边，保留 `.footer-heading` / `.footer-list-contact`
- **联系方式没丢**：页脚下半部分的 CONTACT US 栏仍有电话 / 邮箱 / 官网。

---

## E. Fleet / Route / About 页面

### [ ] E1. About 页面路线图更新 ❓Q7
- **现状核对**：About 页面（[about/page.tsx](app/[locale]/about/page.tsx)）**没有路线图**，`.story-image-wrap` 里是一个空占位 `<div class="story-image-needed">`（[:88-90](app/[locale]/about/page.tsx#L88)）。
- 站内地图有两处：首页 [RouteMap.tsx](components/RouteMap.tsx) 用图片 `route-map-complete.png`；Route 页 [route/page.tsx:49-165](app/[locale]/route/page.tsx#L49) 是手写 SVG。
- **待确认后再动**。如果客户其实是想给 About 页补一张图，那就是填 `story-image-needed` 这个占位。

### [x] E2. Daily Service 下的 "Montreal to Toronto" 删掉
- **客户原话**："raily service 把 montreal to toronto 删掉"（应为 daily service）
- **现状**：`Daily Service / ["Montreal to Toronto", "Every Business Day"]` 出现在**两处**：
  - [en.ts:331](lib/dictionaries/en.ts#L331) `routePage.highlights[0]`
  - [en.ts:384](lib/dictionaries/en.ts#L384) `aboutPage.highlights[0]`
  - `fr.ts` 对应两处（"De Montréal à Toronto"）
- **改法**：删掉第一行，只留 "Every Business Day"。**两处都改**（客户只提了一处，但两处文案一样，不同步会显得前后矛盾）。
- **验收**：Route 页和 About 页的 Daily Service 卡片都只剩一行。

### [ ] E3. Route Details 整块删除，换成沿线小镇 ❓Q8
- **现状**：[route/page.tsx:210-229](app/[locale]/route/page.tsx#L210) 的 `.route-details-section`，5 个卡片（Distance / Drive Time / Major Stops / Frequency / Capacity），数据在 [en.ts:346-368](lib/dictionaries/en.ts#L346)。
- **改法**：整块换成「服务城镇」清单 —— 蒙特利尔↔多伦多之间 401 沿线所有小镇，末尾加一句「其他城市敬请期待 / More cities coming soon」。
- **候选小镇清单**（请客户圈定，按 401 由西向东）：
  > Toronto · Pickering · Ajax · Whitby · Oshawa · Bowmanville · Port Hope · Cobourg · Brighton · Trenton · Belleville · Napanee · Kingston · Gananoque · Brockville · Prescott · Morrisburg · Cornwall · Vaudreuil-Dorion · Montreal
- **连带**：`.route-details-grid` 是写死的 5 列（[globals.css](app/globals.css)），改成城镇清单后布局要重做（建议 tag/chip 流式排版，不用等宽栅格）；`detailIcons` 数组（[route/page.tsx:33](app/[locale]/route/page.tsx#L33)）随之删除。
- **顺带**：被删的 Capacity 卡片里写着 "Up to 7,700 lbs"，正好和 E4 的 3,500 lbs 冲突，删掉省事。

### [x] E4. Payload Capacity 改成 3,500 lbs（2026-07-27 完成）
- **现状**：[en.ts:288](lib/dictionaries/en.ts#L288) `{ label: "Payload Capacity", value: "Up to 7,700 lbs" }`，fr.ts 同位置。
- **同一个数字还出现在**：
  - [en.ts:47](lib/dictionaries/en.ts#L47) `meta.fleet.description` "7,700 lbs payload"（SEO 描述，必须一起改）
  - [en.ts:366](lib/dictionaries/en.ts#L366) `routePage.details` Capacity（随 E3 删掉）
  - fr.ts 对应 3 处
- **改法**：全部改成 3,500 lbs / 3 500 lb（法语）。
- **⚠️ 顺带核对**：3,500 lbs 载重明显不是加长高顶 Sprinter 的规格，这条和 B1「车型不符」是同一个问题的两面 —— 其余规格（477 cu ft 货箱、165×75×67 in）也**很可能一起要改**。建议一次性向客户要齐真实车辆规格表，别改两轮。
- **验收**：`grep -rn "7,700\|7 700"` 0 命中。

### [x] E5. About 页 highlights 整块删掉（客户 2026-07-27 追加：整体删，不只是 Canadian Owned）
- **现状**：[en.ts:393-396](lib/dictionaries/en.ts#L393) `aboutPage.highlights[3]` = `{ title: "Canadian Owned", lines: ["Local Business.", "Personal Service."] }`，fr.ts 同。
- **改法**：删掉这个卡片。**`.about-highlights` 是写死的 4 列**（[globals.css](app/globals.css) `grid-template-columns: repeat(4, 1fr)`），删成 3 个后必须改成 3 列，否则右边空一格。
- **❓顺带确认**："Canadian-owned" 在另外两处也出现 —— [en.ts:376](lib/dictionaries/en.ts#L376) About 页 hero 正文、[en.ts:57](lib/dictionaries/en.ts#L57) `meta.about.description`（SEO）。客户是**只删那个卡片**，还是**全站不再提"加拿大本土企业"**？
- **验收**：About 页 highlights 剩 3 个且均分宽度。

---

## 执行顺序建议

| 批次 | 内容 | 前置条件 |
|---|---|---|
| **第 1 批** ✅ **已完成 2026-07-27** | A4 年份动态 · A3 header 字体 · A1 logo 放大 · C1 删 company · C7 删 special requirements · C4 服务日期 · E2 删 Montreal to Toronto · E5 删 Canadian Owned | 无 |
| **第 2 批**（要一次问答） | A2 换电话（Q1）· C2 手机/邮箱二选一 · E4 载重 3500（连带 Q2 车辆规格） | Q1 |
| **第 3 批**（要客户给内容） | C3 方向选择（Q5）· C5 禁运清单（Q3）· C6 板数尺寸（Q4）· D1 页脚横条（Q6）· E3 沿线小镇（Q8） | Q3–Q6, Q8 |
| **第 4 批**（素材） | B1 全套车辆图重做 · E1 路线图（Q7） | Q2, Q7 |

**每批完成后**：`npm run build` + `npm run lint` 必须通过；en/fr 两套字典键必须完全对齐（`Dictionary` 类型由 `en` 推导，fr 少键会直接编译报错，这点有类型保护）。

---

## 第 1 批完工记录（2026-07-27）

**改动文件**：`components/Header.tsx` · `components/Footer.tsx` · `components/QuoteModal.tsx` · `app/[locale]/about/page.tsx` · `app/api/quote/route.ts` · `app/globals.css` · `lib/dictionaries/en.ts` · `lib/dictionaries/fr.ts`

**实际做法与计划的出入**：
- Logo 放大约 20%：桌面 236→288px，1024–1279 区间 200→216px，移动各断点等比上调；`.header-inner` 高度 108→124px（移动 96→108px）；`next/image` 的 intrinsic width 一并从 236 提到 288，避免放大后糊。
- 导航字体：Impact 换成 `"Helvetica Neue", Helvetica, Arial`，桌面 700 字重 17px + `letter-spacing:.03em`；移动菜单 19px 同样处理。1024–1279 区间降到 15px 以防换行。
- **额外修的**：删掉 Special Requirements 面板后，报价弹窗 3 列栅格里「Additional Notes」只占 2 列，右下角空一格。已把 `.notes-panel` 从 `grid-column: span 2` 改成 `1 / -1`，并删掉 ≤1023px 那条现在多余的覆盖。
- 顺带清理：`asStringArray()`、`.requirements-grid` 三条 CSS、`validatePayload` 里对数组的判断分支 —— 都随 Special Requirements 一起没了调用方。

**验证方式**：`npm run build` 通过；起 `next start` 实测渲染 —— 页脚显示「© 2026」（en/fr 都对）、报价弹窗确认 Company 字段消失/Service Date 生效/Special Requirements 整块消失、About 页 highlights 三卡等分、Route 与 About 的 Daily Service 都只剩一行；header 在 1440/1024/430/390/360 五个宽度截图检查无溢出；`/api/quote` 用缺字段的 payload 实测：company 已不再必填、蜜罐仍生效。

**已知遗留（非本批引入）**：
- ~~`npm run lint` 有 1 个 error 在 `components/CookieConsent.tsx:14`~~ ✅ 已于 2026-07-27 修复（见下）。
- Route 页 SVG 地图上「TORONTO」和「OSHAWA」两个城市标签重叠（[route/page.tsx:51-52](app/[locale]/route/page.tsx#L51) 的 labelX 太近）。E3 要重做这一块时一并修。

---

## 第 2 批完工记录（2026-07-27，客户当场答完 Q5/Q6 后追加）

**D1 页脚横条整条删除** + **C3 取货/送货改下拉**，详见上面两条的更新。

**改动文件**：`components/Footer.tsx` · `components/QuoteModal.tsx` · `app/api/quote/route.ts` · `app/globals.css` · `lib/dictionaries/en.ts` · `lib/dictionaries/fr.ts`

**验证**：`npm run build` 通过；起 `next start` + CDP 实测 ——
- 页脚横条确认消失，CONTACT US 栏的电话/邮箱/官网仍在，`© 2026` 正常；
- 弹窗里两个字段确认是 `<select>`、`required=true`、选项分别为 `["", "Toronto", "Montreal"]`（en）和 `["", "Toronto", "Montréal"]`（fr）；
- `/api/quote` 实测：`Ottawa` / `Quebec City` 被 400 拦下（中英法文案都对），`Toronto`+`Montreal` 与 `Toronto`+`Montréal` 均放行。

---

## 第 3 批完工记录（2026-07-27）

**C5 禁运清单**，详见上面 C5 条目。

**改动文件**：`components/QuoteModal.tsx` · `app/globals.css` · `lib/dictionaries/en.ts` · `lib/dictionaries/fr.ts`

**验证**：`npm run build` 通过；CDP 实测桌面 1200px（en + fr）与移动 390px 三种渲染，禁运面板跨整行、三卡布局正确、移动端自动堆叠。

**VALUED STRATEGIC PARTNERS**（Natural Market / Flashbird / Mergi Groceries / Station Axia）：✅ 客户 2026-07-27 定 —— **不用加**，这段不做。

---

## 第 4 批完工记录（2026-07-27）

**C2 电话/邮箱二选一** · **A2 换电话号码** · **E4 载重改 3,500 lbs** · 两个 UI 修正。

- **A2**：`514-623-5486` / `tel:5146235486` 全站 **20 处**换成 `438-921-7268` / `tel:4389217268`，涉及 6 个文件（Footer、contact 页、en/fr 字典、quote API、contact API）。`grep` 确认旧号 0 命中。
  - 没有抽成 `lib/contact-info.ts` 常量 —— 大部分出现位置嵌在翻译好的整句里（如 "Please call 514-623-5486 or email…"），抽常量反而要引入模板插值，得不偿失。
- **E4**：`7,700 lbs` / `7 700 lb` 全部改成 `3,500 lbs` / `3 500 lb`，共 6 处 —— Fleet 页规格卡、Fleet 页 SEO description、Route 页 Capacity 卡（en + fr 各 3 处）。
- **UI 修正 1**：联系人区三个字段原本是两列栅格（姓名｜电话一行、邮箱半宽吊在下面），改成单列，三个字段各占一整行。
- **UI 修正 2**：`.quote-form label` 原本是 `display: grid`，导致 label 文字、`*`、输入框各占一行 —— `*` 单独一行很难看。改成 `display: block`，文字和 `*` 回到同一行，间距由控件的 `margin-top` 接管。一条 CSS 修好全部 11 个字段。

**验证**：`npm run build` 通过；起服务实测首页页脚 / Contact 页电话都是新号，Fleet 页和 Route 页载重都是 3,500 lbs；表单 `*` 位置桌面 + 390px 移动端都截图确认。

---

## 第 5 批（2026-07-27）：客户决定 + lint 修复

**客户决定（均为不改）**：
- 同城选择「多伦多 → 多伦多」：**不用改**，不加限制。
- **VALUED STRATEGIC PARTNERS** 合作方展示区：**不用加**。

**lint error 修复** —— `components/CookieConsent.tsx`
- 原问题：`useEffect` 里直接 `setState`（`react-hooks/set-state-in-effect`）。这是"读 localStorage 决定要不要显示 cookie 横幅"的老写法，会多触发一次渲染。
- 改法：换成 `useSyncExternalStore` —— `subscribe` 挂 `storage` 事件 + 一个模块级监听表，`getSnapshot` 读 localStorage，`getServerSnapshot` 返回非 null 让服务端渲染时横幅不出现，水合后客户端再决定。点接受/拒绝时写 localStorage 并 `notify()` 通知订阅者。
- 附带好处：`storage` 事件让多标签页同步 —— 在一个标签页点接受，其他标签页的横幅也会消失。
- **实测**：SSR HTML 里无 `cookie-banner` ✅ · 首次访问（无存储）显示 ✅ · 点 Accept 后消失且写入 `accepted` ✅ · 已有存储时不显示 ✅
- **`npm run lint` 现在 0 error 0 warning。**

---

## 第 6 批（2026-07-27）：About 页 highlights 整块删除

**客户追加要求**：About 页那四张卡片（Daily Service / 100% / 401 Corridor / Canadian Owned）**整体删掉**，不只是删 Canadian Owned 那张。

**已删**：
- `app/[locale]/about/page.tsx` 里整个 `<section className="about-highlights">`，以及随之无用的 `highlightIcons` 数组和 `CalendarDays` / `MapPin` 两个图标 import。
- 字典 `aboutPage.highlightsAria` + `aboutPage.highlights`（en + fr）。
- CSS `.about-highlights` / `.about-highlight-item` 全部规则（基础 + ≤1023px + ≤767px 三处），以及共用选择器里的 `.about-highlight-item h3`。

**顺带修的布局回归**：原来那块卡片带 `margin: -26px 0 36px`，既压在 hero 上又给下方留白。删掉后 Our Story 直接顶到 hero 底边。已给 `.about-story` 补 `margin-top: 56px`（≤767px 为 36px）。

**Route 页的 highlights 没动** —— 那是另一个组件，客户只说 About 页。

**验证**：`npm run build` + `npm run lint` 均通过；桌面 1440px 和移动 390px 都截图确认间距正常。

**⚠️ 现在更明显的老问题**：Our Story 右侧那个 `story-image-needed` 空白占位框（[about/page.tsx](app/[locale]/about/page.tsx) 的 `.story-image-wrap`）现在孤零零地很显眼 —— 这块一直没有配图。跟 Q7「About 页路线图」很可能就是同一件事，等客户答复。

---

## 第 7 批（2026-07-27）：About 页底部 CTA 删除

**客户要求**：About 页底部「Let's Move Forward Together / Contact us today to experience reliable freight service you can trust.」+ Get a Quote 按钮，整条删掉。

**已删**：
- `app/[locale]/about/page.tsx` 里整个 `<section className="container about-bottom-cta">`，以及随之无用的 `Phone` 图标和 `QuoteButton` 两个 import。
- 字典 `aboutPage.ctaAria` / `ctaTitle` / `ctaText`（en + fr）。
- CSS `.about-bottom-cta` / `.about-bottom-cta-copy` / `.about-phone-icon` 及 ≤1023px、≤767px 两处断点覆盖；共用选择器里的 `.about-bottom-cta h2` 也摘掉。

**顺带修的布局回归**：CTA 原来在 Our Values 和页脚之间起隔断作用，删掉后 Our Values 直接贴上深色页脚。已把 `.about-values-section` 底部内边距从 24px 提到 64px（≤767px 为 48px）。

**其他页的 CTA 没动** —— Fleet 页的「Need Freight Service?」仍在（实测确认）。客户只说 About 页。

**验证**：`npm run build` + `npm run lint` 均通过；About 页实测已无该文案，Fleet 页 CTA 仍在。

**About 页现在的结构**：Hero → Our Story → Our Values → 页脚。

---

## 首页 hero 图更换（2026-07-27）

- 客户提供了新的 Gemini 生成图，尺寸 1380×752，**宽高比 1.835 与原 `hero-large.png`（2048×1116）完全一致**，所以直接替换没有裁切问题。
- 新图存为 `public/images/hero-large-v2.png`，`components/Hero.tsx` 的 `src` 和 intrinsic `width`/`height` 一并更新。**原 `hero-large.png` 保留未删**，要回退改一行即可。
- 第一版（`Gemini_Generated_Image_qgvmtvqgvmtvqgvm.png`）车身 logo 下那行标语是 AI 乱码（`More Than Cargs. Yiaa Trast, Our Piferig`），已弃用；改用第二版（`Gemini_Generated_Image_5qnazu5qnazu5qna.png`），车身只有干净的 MANDY EXPRESS logo，无小字。
- **注意**：新图分辨率 1380px < 容器最大 1440px，桌面满宽时会轻微放大，肉眼基本无感；若要完全锐利需要 ≥1440px 宽的原图。
- **车型文案仍未改**：`home.heroAlt` 还写着 "2025 Mercedes-Benz Sprinter Extended High Roof"，但新图里是标准轴距高顶。等 B1（真实车型）确认后一并处理。

**全站铺开新 hero 图（同日追加）**

新图自带烘焙文字（SAME-DAY FREIGHT DELIVERY 等），而各页面 hero 都有自己的 HTML 标题叠在上面，直接套用会文字撞文字。所以按用途派生了两张：

| 文件 | 尺寸 | 做法 | 用在 |
|---|---|---|---|
| `hero-large-v2.png` | 1380×752 | 原图不动 | 首页 Hero、OG 分享图 |
| `hero-large-v2-clean.png` | 1380×752 | 左侧盖深蓝渐变遮住烘焙文字 | Services 页 hero |
| `fleet-hero-v2.png` | 1380×497 | 裁到 2.778 比例（与旧 `fleet-hero.png` 一致）+ 左侧同款遮罩 | Fleet / About / Contact 页 hero |

- 遮罩做法：取图片自身左上角天空的平均色作底色，x≤645 完全不透明、645→725 缓出到 0。645 是文字最右边界，725 是车头最左边界，所以文字全盖住、车一点没碰到。
- **比旧图还干净** —— 旧 `fleet-hero.png` 左侧还能看见上一版文字的残影，新的没有。
- **旧图全部保留未删**（`hero-large.png` / `fleet-hero.png`），随时可回退。
- OG 分享图（`app/[locale]/layout.tsx`）也一并指向新图，否则分享到社交平台还是旧车。

---

## Route 页「The 401 Corridor」换成真实地图嵌入（2026-07-27）

**客户原话**：那个部分完全错了，删了，换成 Google 地图之类的、把 401 标出来。

**删掉**：整个手绘 SVG `CorridorMap` 组件（约 115 行）—— 那是一条随手画的曲线配六个城市标签，地理上不准，而且 TORONTO / OSHAWA 两个标签还重叠。连带清掉字典 `mapSvgAria` / `lakeLabel` / `cities`（en + fr）和 CSS `.route-map-illustration` / `.route-lake-label` / `.route-city-label` / `.route-map-shield-text`。

**换成**：Google 地图官方 iframe 嵌入（「分享 → 嵌入地图」用的那个 `/maps/embed` 端点）
```
https://www.google.com/maps/embed?origin=mfe&pb=!1m6!4m5!4m1!2sToronto,ON!4m1!2sMontreal,QC!3e0
```
- **免 API key、免注册、零成本** —— 不是 Google Maps Platform 那套要开通计费的 API。
- 给起终点，Google 自动画出实际行车路线，也就是 401；地图上直接显示 **547 km / 5 hr 30 min**，401/407/404 路牌、Kingston / Cornwall / Ottawa 等沿线地名都是真实地图数据。
- `pb` 参数里能直接读出两个地名，以后要改路线改地名即可。
- `loading="lazy"`，不拖慢首屏。

**容器用固定高度而非 `aspect-ratio`**（桌面 560px / ≤767px 440px）：iframe 加载时必须拿到确定尺寸，否则 Google 会按初次布局宽度渲染画布。`.route-corridor-section` 也补了左右内边距，地图不再贴边。

**验证踩的一个坑（记下来免得下次白查）**：用 CDP `Emulation.setDeviceMetricsOverride` 截图时，地图右侧总有一条灰带，看着像布局 bug。实际是**视口模拟不会传进跨域 iframe** —— 改用真实 `--window-size` 启动 headless 后地图铺满，无灰带。桌面 1440 和移动 390 都已用真实窗口尺寸确认正常。

**Route Details 五个卡片仍未动** —— 那是 E3（换成沿线小镇清单），还等客户圈定 Q8 的候选名单。

**补：只留驾车路线（同日）**

第一版嵌入进去后，Google 在地图上同时列出了三种出行方式的时间 —— 航班 1 hr 15 min、公共交通 6 hr 40 min、驾车 5 hr 30 min。货运公司页面上出现航班时间显然不对。

修法：`pb` 参数末尾加 `!3e0`（3e0 = 驾车，3e1 单车 / 3e2 步行 / 3e3 公交 / 3e4 航班），同时把外层计数从 `!1m5!4m4` 改成 `!1m6!4m5`。现在只剩一条沿 401 的驾车路线，显示 **547 km / 5 hr 33 min**。

排查过程中试过 `output=embed` + `dirflg=d`（旧版接口），不管用 —— 旧接口仍会渲染整套出行方式对比 UI。另外单独建静态测试页试 URL 是行不通的：Google 对 `file://` 和随手起的 http 服务都拒绝在 iframe 里加载，只能在站点本身上验。

---

## Route 页四个服务亮点删除（2026-07-27）

**客户要求**：Daily Service / Same-Day Delivery / Door-to-Door / Dedicated Cargo Van 这四张卡片删掉。

**已删**：
- `app/[locale]/route/page.tsx` 里整个 `<section className="container route-highlights">`，以及 `highlightIcons` 数组和随之无用的 `DoorOpen` / `Truck` 两个图标 import。
- 字典 `routePage.highlightsAria` + `routePage.highlights`（en + fr）。
- CSS `.route-highlights` 及 `.route-info-column` 的全部规则（基础 + ≤1279px + ≤767px 三处）。

**注意共用选择器**：`.route-info-column` 和 `.route-detail-column` 在四条规则里是共用的（`text-align` / `svg` / `h3` / `p`），Route Details 区块还在用，所以只摘掉 `.route-info-column` 那一半，`.route-detail-column` 全部保留。`.route-column-divider` 也保留。

**Route 页现在的结构**：Toronto ↔ 401 ↔ Montreal 标题 → 真实地图 → Route Details → 页脚。

**验证**：`npm run build` + `npm run lint` 通过；1440px 实测渲染，地图和 Route Details 均正常，无残留空白区块。

---

## Fleet 页 Our Cargo Van 换图（2026-07-27）

客户提供 `~/Downloads/70.png`（1920×1080）。

**做了两步处理，不是直接拷进去**：
1. **裁掉留白** —— 原图是 RGBA，车只占画面中间约 45%，四周大片透明区。按 alpha 通道求出内容包围盒（624,280,1472,817），四周留一点余量后裁成 914×643，再合成到白底（与 `.fleet-van-image-panel` 背景一致）。存为 `public/images/fleet-cargo-van-v2.png`。
   - 踩了个小坑：一开始直接 `convert("RGB")`，透明区变成黑色。要先按 alpha 定位、再 `alpha_composite` 到白底。
2. **移除 CSS 滤镜** —— `.fleet-van-image` 上原有 `filter: brightness(1.18) saturate(0.5) contrast(1.02)`，那是给旧图（556×318，偏暗）调的。新图本来就是干净的白底产品图，套上去整台车被洗得发灰发白。已删掉该滤镜。

**分辨率提升明显**：旧图 556×318 → 新图 914×643，面板里最大显示 590px 宽，之前是拉伸显示的。

**旧图 `fleet-cargo-van.png` 保留未删**，可随时回退。

**验证**：`npm run build` + `npm run lint` 通过；桌面 1440px 和移动 390px 都实测渲染正常。

---

## 首页地图删除（2026-07-27）

**已删**：
- `components/RouteMap.tsx` 整个文件（组件只有一张 `route-map-complete.png`，删图即删组件）。
- `app/[locale]/page.tsx` 里的 import 和 `<RouteMap />` 调用。
- 字典 `home.routeAria` + `home.routeMapAlt`（en + fr）。
- CSS `.route-section` / `.route-shell` / `.route-map-image`（基础 + ≤767px 断点）。
- 确认过没有任何链接指向该区块的 `id="route"` 锚点。

**注意**：Route 页的 `.route-section-heading` 是**另一个类**，名字像但无关，保留未动。

**顺带修的布局回归**：地图原来是浅色背景，在白色服务卡和深色页脚之间起过渡作用。删掉后卡片直接贴上页脚。已给 `.services-grid` 补底部内边距 48px（≤767px 为 32px）。

**首页现在的结构**：Hero 大图 → 四个服务卡 → 页脚。

**图片文件 `route-map-complete.png` 保留未删**（另外几张 `route-map-*.png` 也都在），可随时恢复。

**验证**：`npm run build` + `npm run lint` 通过；1440px 实测渲染正常。

---

## Route Details 删除（2026-07-28）

**客户要求**：Distance / Drive Time / Major Stops / Frequency / Capacity 五张卡片删掉。

（原计划 E3 是把这块换成 401 沿线小镇清单，客户改主意直接删了，所以 Q8「沿线小镇要列哪些」这个问题也随之作废。）

**已删**：
- `app/[locale]/route/page.tsx` 里整个 `<section className="container route-details-section">`、`detailIcons` 数组，以及至此已全部无用的 lucide 图标 import（整行 import 都去掉了）。
- 字典 `routePage.detailsHeading` + `routePage.details`（en + fr）。
- CSS `.route-details-section` / `.route-details-grid` / `.route-detail-column` / `.route-column-divider` 全部规则（基础 + ≤1279px + ≤767px 三处）。
- `.route-section-heading` **保留** —— 地图那一节还在用。

**Route 页现在的结构**：Toronto ↔ 401 ↔ Montreal 标题 → 真实地图 → 页脚。页面变得相当精简，只剩一屏多一点。

**验证**：`npm run build` + `npm run lint` 通过；1440px 实测渲染正常，无残留空白区块。

**补：地图下方加服务范围说明（2026-07-28）**

客户指定文案：「Montreal 到多伦多之间沿线所有小镇，其他城市敬请期待」，样式自由发挥。

- 新增字典键 `routePage.coverageNote` / `coverageSoon`：
  - en: "We serve every town along the corridor between Montreal and Toronto." / "More cities coming soon."
  - fr: "Nous desservons toutes les villes situées le long du corridor entre Montréal et Toronto." / "D'autres villes à venir."
- 样式 `.route-coverage`：地图下方居中，最宽 720px。主句深蓝 18px 加粗；「敬请期待」另起一行，用品牌橙 + Impact 大写，做次级信息，和站内其他强调文字一致。移动端字号收到 16/15px。
- 是**一句声明**而不是列小镇清单 —— 客户明确说「文案就是这个」。
