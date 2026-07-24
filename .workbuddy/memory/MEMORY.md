# 项目记忆：vite-vue3-template

## 定位
基于 `pnpm create vite` 的 Vue3+TS 产物二次改造，目标「前端工程化模板」。

## 技术栈
Vite ^8.1.1 / Vue ^3.5.39 / TS ~6.0.2 / vue-tsc ^3.3.5 / @vitejs/plugin-vue ^6.0.7 / sass ^1.101 / unocss ^66.7.5 / pinia ^4.0.2 / vue-router ^5.2.0 / element-plus ^2.14.3 / unplugin-auto-import ^21 / unplugin-vue-components ^32 / vite-plugin-svg-icons ^2.0.1 / vite-plugin-compression2 ^2.5.3 / oxfmt ^0.59 / axios ^1.18.1 / dayjs ^1.11.21 / lodash-es ^4.18.1(2026-07-24 新增)。

## 约定（已落地）
- 入口：`src/main.ts` `bootstrap()` 异步，顺序 createApp→setupPlugins→setupStore→await setupRouter→mount。导入顺序（2026-07-24 定）：`@/styles/index.scss` → `virtual:uno.css` → `virtual:svg-icons-register` 末尾。统一 `@/` 导入。
- 别名 `@/*→src/*`，tsconfig.app paths 与 vite resolve.alias 双向同步。
- Vite 插件抽离 `build/plugins/index.ts` 导出 `setupVitePlugins()`，纳入 tsconfig.node；nodenext 下相对导入带 `.ts`。
- 状态：`src/store/index.ts` 导出 `createPinia()` 单例 + `setupStore(app)`；含 `store/modules/app.ts`、`store/modules/setting.ts`(2026-07-24 新增，主题设置)。
- 路由：`VITE_ROUTER_MODE==='hash'` 切 hash 否则 history；history base 与 Vite `base` 均传 `VITE_PUBLIC_PATH`(默认 `/`) 对齐。`static.route.ts` 导出 `STATIC_ROUTE_LIST`(dashboard/login/404，无动态权限)。`router.guard.ts` 白名单 `['/login']`→无 token 跳 `/login?redirect`→否则放行（仅 token 有无）。
- UnoCSS：`presetWind3()+presetAttributify()`，自定义 rules(wh-/mtb-/mlr-/ptb-/plr-)+shortcuts(wh-full/wh-screen/flex-center/clearFix)。
- 自动导入：auto-import `imports:['vue','pinia','vue-router']`+`dirs:['src/store/modules','src/hooks']`；components `dirs:[]`。d.ts 落 `src/types/auto-generate/`。
- SVG（2026-07-24 修复不显示）：**根因是 `vite-plugin-svg-icons-ng` 在 Vite8 下 sprite 注入/热更不稳定、图标全不显示；组件本身一直正确**（用 `SvgIconProps` 类型、`color` 默认 `currentColor`、`isString` 来自 `@/utils`）。修复=回退官方 `vite-plugin-svg-icons` + `main.ts` `import 'virtual:svg-icons-register'`（官方插件必需项，已就位）。symbolId `icon-[name]`，组件名=文件名。新增图标放 `src/assets/svg-icons/`→`pnpm clean:svg`(`scripts/svg-clean.ts`)适配 `fill:currentColor`。
  - **类型声明坑（2026-07-24 晚，已修）**：`vite-plugin-svg-icons@2.0.1` 的 `package.json.exports` 只暴露 `"."`、**未暴露 `./client`**，故 `/// <reference types="vite-plugin-svg-icons/client" />` 在 nodenext 解析下找不到（`vue-tsc -b` 报 TS2882）。已在 `src/types/global/vite-env.d.ts` 用 `declare module 'virtual:svg-icons-register'`(及 `'virtual:svg-icons-names'`) 手动声明，`vue-tsc -b` 方通过。`virtual:uno.css` 由 `vite/client` 覆盖，无需额外声明。
- ElementPlus（按需+sass主题+暗黑，已接切换）：`unplugin-vue-components`+`ElementPlusResolver({importStyle:'sass'})` 管模板组件样式；`unplugin-auto-import`+同 resolver 管 API 名称；`unplugin-element-plus({useSource:true})` 管函数式 API(`ElMessage`等)样式注入，**三处缺一不可**（2026-07-23 误删后者致 ElMessage 样式丢，已恢复）。`vite.config.ts` `additionalData` 注入 `el-theme-light.scss`(primary `#0077ff`)；`el-theme-dark.scss` 注册 `html.dark` 变量。主题切换已接：切 `dark` 类即生效（暗黑主色未定制，仍 EP 默认蓝 `#409eff`）。
- 样式分层：`public/css/reset.css` `<link>` 引入(不进打包防 FOUC；oxfmt 已 ignore)；`src/styles/index.scss` 入口(引入 `variables.scss`+`el-theme-dark.scss`+body 背景)；`variables.scss` 放 navbar 等变量。reset.css 含 view-transition 关闭默认动画 + `.dark::view-transition-old(root){z-index:2026}`（配合主题圆形扩散）。
- **AI 代码约束**见根 `AGENTS.md`(三条)：图标统一 `<SvgIcon>`/EP 组件图标位用插槽塞 SvgIcon/复用 `@/utils`(统一入口，禁散装子路径 import，缺失则补到 utils 并导出)。
- 首屏 loading：`index.html` `#app` `.app-loading` + `public/css/app-loading.css`，`main.ts` 靠 `app.mount` 清空 container。
- 环境变量/代理/.env 同前。oxfmt：`printWidth:160/singleQuote/semi:false/trailingComma:'all'`，ignore 含 `reset.css`；`sortImports` 已注释禁用(2026-07-24)。构建 drop console/debugger 走 Rolldown；vendor chunk 分包；gzip 预压缩。axios 请求层 + token.cache(StorageCache 前缀 `app:storage:`，含 refreshToken 预留点)。
- 登录态本质：localStorage `accessToken` 即全部登录态，无 user/auth store。

## 登录/登出/守卫（模拟实现，2026-07-23）
主链路：受保护页→guard 拦→无 token 跳 `/login?redirect`→`login.vue` 写死 `mock-access-token` 回跳→登出=`removeAccessToken()`+`router.replace('/login')`。边界：登录无接口、登出无接口、401 兜底为整页 reload。升级真实登录最小路径：login.vue 调真接口 / 新增 user store / 401 改精准跳登录 / 引 asyncRoutes+roles。

## 主题切换（2026-07-24 新增，已落地）
- `src/defaultSettings.ts`：`SystemSetting{theme:'light'|'dark', showDynamicTitle:boolean}`(默认 `light`/`true`)。
- `src/store/modules/setting.ts`：`useSettingStore` 用 `merge(defaultSettings, getSystemSetting())` 初始化；computed `isDark`；`saveSetting`/`resetSetting`(持久化到 StorageCache `systemSetting`)。
- `src/utils/cache/system-setting.cache.ts`：基于 `StorageCache` 的 get/set/remove `systemSetting`。`src/utils/index.ts` 已导出（含 `tip-modal` 的 `TipModal`）；另 `export { isString } from 'lodash-es'` 统一出口。`useDynamicTitle.ts` 现 watch `settingStore.showDynamicTitle` 控制动态标题开关。
- `src/layout/components/Navbar/ThemeSwitch.vue`：点按切 `document.documentElement.classList.toggle('dark', isDark)` 并 `saveSetting`；用 View Transitions API(`startViewTransition`+clipPath 圆形扩散，苹果风缓动)。Moon/Sunny 图标。**注意：无 `startViewTransition` 降级（仅 Chromium 系有动画，否则直接切换无过渡）**。
- `src/layout/components/Navbar/index.vue` + `layout/index.vue`：Navbar 挂 header，el-tooltip 包 ThemeSwitch。

## 工程化进度
已完成：脚手架/别名/UnoCSS/Pinia/vue-router(404)/自动导入/SvgIcon(含本次修复)/Vite插件抽离/reset.css/StorageCache/axios/drop console·debugger/oxfmt/3 Skill/严格TS/多环境.env/vendor分包/gzip/首屏loading/模拟登录守卫/ElementPlus按需+主题+暗黑css-vars/**主题切换(2026-07-24)**/SvgIcon 不显示修复(2026-07-24)/`docs/前端工程化.md`同步/Layout 接入 Navbar。
未做：真实登录接口/user store/userInfo/动态权限(asyncRoutes+addRoute+roles)/业务示例页/路由children·懒加载/Layout完整布局/i18n/ESLint·husky/oxlint/单元测试/CI-CD。注：brotli 明确不引入；refreshToken 为预留点。
构建状态：`vue-tsc -b` 绿 + `vite build` 正常。本机 `pnpm` 经 Git Bash 调 corepack 路径错写，须用 PowerShell `& "C:\Progra~1\nodejs\pnpm.CMD"`。
