# 项目记忆：vite-vue3-template

## 定位
基于 `pnpm create vite` 的 Vue3+TS 产物二次改造，目标「前端工程化模板」。

## 技术栈
Vite ^8.1.1 / Vue ^3.5.39 / TypeScript ~6.0.2 / vue-tsc ^3.3.5 / @vitejs/plugin-vue ^6.0.7 / sass ^1.101 / unocss ^66.7.5 / pinia ^4.0.2 / vue-router ^5.2.0 / element-plus ^2.14.3 / unplugin-auto-import ^21 / unplugin-vue-components ^32 / vite-plugin-svg-icons-ng ^1.9.2 / vite-plugin-compression2 ^2.5.3 / oxfmt ^0.59 / axios ^1.18.1 / dayjs ^1.11.21。

## 约定（已落地）
- 入口：`src/main.ts` 用 `bootstrap()` 异步，顺序 createApp→setupPlugins→setupStore(Pinia)→await setupRouter→mount；统一 `@/` 导入。
- 别名：`@/*→src/*`，tsconfig.app paths 与 vite resolve.alias 双向同步。
- Vite 插件抽离：`build/plugins/index.ts` 导出 `setupVitePlugins(): PluginOption[]`，纳入 tsconfig.node 检查；nodenext 下相对导入带 `.ts`。
- 状态：`src/store/index.ts` 导出 `createPinia()` 单例 + `setupStore(app)`；含 `store/modules/app.ts`。
- 路由（三层）：① `src/router/index.ts` 创建 `router` + `setupRouter(app)`（注册守卫→`app.use(router)`→`await router.isReady()` 再挂载）；`VITE_ROUTER_MODE==='hash'` 切 hash 否则 history。**history base 必须与 Vite `base` 对齐**：`createWebHashHistory(VITE_PUBLIC_PATH)`/`createWebHistory(VITE_PUBLIC_PATH)`，二者均传 `VITE_PUBLIC_PATH`（默认 `/`，见 `.env:8` 与 `vite.config.ts:13`），确保子路径部署下路由 base 与打包 base 一致——此点曾遗漏（仅 Vite base 支持、vue-router 未传），后已补齐。② `src/router/modules/static.route.ts` 导出常量路由 `STATIC_ROUTE_LIST`（dashboard/login/404 通配），**无 asyncRoutes/addRoute/roles 动态权限**。③ `src/router/router.guard.ts` 导出 `globalRouterBeforeGuard(to)`：白名单 `['/login']` 直接放行 → 读 `getAccessToken()` 为空则 `redirect` 到 `/login?redirect=to.fullPath` → 否则放行（仅依据 token 有无判断，无 roles）。
- UnoCSS：`presetWind3()+presetAttributify()`，自定义 rules(wh-/mtb-/mlr-/ptb-/plr-)+shortcuts(wh-full/wh-screen/flex-center/clearFix)；`main.ts` 顶部 `import 'virtual:uno.css'` 先于 `./styles/index.scss`。
- 自动导入：auto-import 配 `imports:['vue','pinia','vue-router']`+`dirs:['src/store/modules','src/hooks']`；components 的 `dirs:[]`（未扫组件目录）。d.ts 落 `src/types/auto-generate/`(gitignore)。
- SVG：`vite-plugin-svg-icons-ng` inline sprite，symbolId `icon-[name]`，组件 name=文件名(去.svg)。新增：下载→放 `src/assets/svg-icons/`→跑 `pnpm clean:svg`(`scripts/svg-clean.ts`，node 原生跑 TS)去冗余属性适配 `fill:currentColor`。全局组件手动注册于 `src/plugins/modules/global-component.ts`，类型补 `src/types/global/global-component.d.ts`，统一放 `src/components/<Name>/`。新增全局组件走 Skill `add-global-component`。
- ElementPlus（按需 + sass 主题 + 暗黑 css-vars 待切换）：两插件互补，**缺一不可**。`unplugin-vue-components` + `ElementPlusResolver({ importStyle: 'sass' })` 负责**模板组件** `<el-xxx>` 与对应 sass 源样式按需自动导入（非全量 `app.use(ElementPlus)`）；`unplugin-auto-import` + 同一 resolver 自动导入 `ElMessage` 等 API 的**名称**。`unplugin-element-plus({ useSource: true })`（`build/plugins/index.ts` 注册）负责**函数式 API 的样式注入**——`ElMessage`/`ElMessageBox`/`ElNotification`/`ElLoading` 这类从 `'element-plus'` 显式 import 的函数，其样式 **resolver 不会注入**，必须靠它（2026-07-23 曾误判其为"冗余"并删除，实测 `ElMessage` 样式丢失，已恢复）。`vite.config.ts` 的 `css.preprocessorOptions.scss.additionalData` 把 `src/styles/element-plus/el-theme-light.scss` 的主题变量（`@forward 'element-plus/theme-chalk/src/common/var.scss' with (...)` 自定义 primary `#0077ff` 等）注入每个 EP 组件样式编译完成换肤。`src/styles/element-plus/el-theme-dark.scss` 引入官方 `@use '.../dark/css-vars.scss'` 注册 `html.dark` 变量（**样式已就绪，但当前无任何代码切 `dark` 类，主题切换待做**）。注意：暗黑模式未定制 primary，切暗黑时主色会由 `#0077ff` 跳回 EP 默认蓝 `#409eff`，做切换时需在 `el-theme-dark.scss` 顶部 `@forward '.../dark/var.scss' with (...)` 对齐。
- 样式分层：`public/css/reset.css` 经 `index.html` `<link>` 引入(不进打包防 FOUC)；`src/styles/index.scss` 全局入口(当前引入暗黑 css-vars + body 字体/背景 + `.app-content` 预留类)。
- **AI 代码约束**：见根目录 `AGENTS.md`（2026-07-23 新建，三条）：①图标统一用 `<SvgIcon>`，禁引 EP 图标/裸 svg/图标字体/第三方图标库；②Element Plus 组件图标位尽量用插槽塞 `<SvgIcon>`；③复用 `src/utils` 已有方法（统一从 `@/utils` 导入，禁散装子路径 import），缺失则提醒用户补方法并在 `src/utils/index.ts` 导出，不擅自别处新建。
- 首屏 loading：`index.html` `#app` 内 `.app-loading` 占位 + `public/css/app-loading.css`(`<head>` 同步 `<link>`)，`main.ts` 靠 `app.mount` 原生 `container.textContent=""` 清空。注意：①JS 彻底失败会卡死 spinner；②依赖 client mount，SSR 需换方案；③根组件需有 template。watchdog 失败兜底已出方案(2026-07-22)用户决定暂不做。
- 环境变量：`.env`(VITE_APP_TITLE/ROUTER_MODE/REQUEST_TIMEOUT)、`.env.development`(VITE_BASE_URL/VITE_BASE_API/VITE_SERVER_PORT)、`.env.production`(VITE_DROP_CONSOLE/VITE_DROP_DEBUGGER/VITE_BASE_API)；`index.html` 用 `%VITE_APP_TITLE%`。
- 开发代理：`server.proxy` 键=`VITE_BASE_API`，target=`VITE_BASE_URL`、changeOrigin、rewrite 剥 `/dev-api`。`/dev-api` 把代理前缀与后端公共路径合一于 `VITE_BASE_API` 单变量：无公共路径写 `/dev-api`(零配置)，有则 `/dev-api/api`；dev/prod 共用 baseURL=`VITE_BASE_API`，切环境只动 `.env`。
- oxfmt：`printWidth:160/singleQuote/semi:false/trailingComma:'all'/arrowParens:'always'/endOfLine:'lf'`；ignore dist/node_modules/auto-generate/pnpm-lock；`sortImports`(internalPattern `^@/`, asc)。脚本 `format`/`format:check`。
- 构建 drop console/debugger：Rolldown `build.rolldownOptions.output.minify.compress.dropConsole/dropDebugger`，值 `VITE_DROP_*!=='false'`(默认启)。
- vendor chunk：`build.rolldownOptions.output.codeSplitting.groups` 拆 vue(含@vue,regex `/node_modules[\\/](vue|@vue)[\\/]/`,priority16)/pinia(15)/vue-router(14)/axios(13)/dayjs(12) 独立块；`chunkFileNames/entryFileNames` 用 `[name]-[hash].js`。**约束**：①Vite8+Rolldown 已无 manualChunks；②需服务端对带 hash 资源配 `Cache-Control: public,max-age=31536000,immutable` 才生效；③业务未做路由级懒加载分包；④碎块>30反噬；⑤HTTP/1.1 同域并发≈6。
- gzip：`build/plugins/dist-compression.ts` 导出 `setupCompressionPlugin()`，注册于 `setupVitePlugins()` 末尾。vite-plugin-compression2(ESM)。`algorithms:[['gzip',{level:9}]]`/`threshold:10*1024`/`deleteOriginalAssets:false`/include 匹配 js/css/json/html/ico/svg/`logLevel:'silent'`。**约束**：需服务端开 `gzip_static` 或 CDN 预压缩才发 `.gz`。
- axios：`src/utils/request/index.ts` axios.create(baseURL=`VITE_BASE_API`、timeout=`VITE_REQUEST_TIMEOUT`*1000)+三拦截器 jwt-auth(挂 Bearer)/response-transform(成功 code===200 解包 data、业务失败转 error)/response-error(按 HttpStatusCode 映射文案+401 removeAccessToken+reload)。`ApiResponse<T>` 全局 ambient(`src/types/api.d.ts`)，拦截器用 `AxiosError<ApiResponse>`；`request.get<T>` 的 T 即业务 data。
- Token：`src/utils/cache/token.cache.ts` 读写返回 `string|null`；底层 `StorageCache`(`src/utils/storage-cache.util.ts`) 统一 `app:storage:` 前缀、支持 ttl。清场由调用方负责。
  - **登录态本质**：localStorage 中的 `accessToken` 字符串即全部登录态；**无 user/auth Pinia store、无 userInfo/roles**。

## 登录/登出/守卫流程（模拟实现，2026-07-23）
- **主链路**：访问受保护页 → `router.guard.ts` 拦截 → 无 token 跳 `/login?redirect=原路径` → `login.vue` 的 `handleLogin` 读 `route.query.redirect`、`setAccessToken('mock-access-token')`、`router.replace(target)` 回跳 → 登出（`dashboard/index.vue` 的 `handleLogout`）= `removeAccessToken()` + `router.replace('/login')`。
- **关键文件**：`src/router/router.guard.ts`、`src/router/modules/static.route.ts`、`src/router/index.ts`、`src/views/core/login.vue`、`src/views/dashboard/index.vue`。
- **模拟边界（务必知晓，接入真实接口前是假实现）**：
  - 登录无接口调用：`login.vue` 写死 token `'mock-access-token'`，表单预填 `admin`/`admin123456` **仅预填、不校验账号密码对错**。
  - 登出无接口：仅清本地 token + 跳登录页。
  - 401 兜底（`response-error.ts`）：`removeAccessToken()` + `window.location.reload()` 占位，非精准跳登录页。
  - `token.cache.ts` 的 `refreshToken` 系列（`setRefreshToken`/`getRefreshToken`/`removeRefreshToken`）为**预留扩展点（有意为之，当前未启用；未来接入 token 刷新机制时启用，非待删死代码）**。
- **升级真实登录最小路径（备注，非当前实现）**：①`login.vue` 改为调真实登录接口写后端返回的 token；②新增 `store/modules/user.ts`（login/logout/getUserInfo actions + token/userInfo state）替代纯缓存方案；③`response-error.ts` 的 401 改为 `router.replace('/login?redirect=…')` 而非整页 reload；④权限路由再引 `asyncRoutes`+`router.addRoute`+`roles`。

## 项目 Skill
- `git-commit-msg`：两步流程(5候选message→问提交方式)+提交前强制自检(必含 `.workbuddy/`)。
- `path-alias`：`@/*` 别名完整配置流程。
- `add-global-component`：新增全局组件全流程。

## 工程化进度（2026-07-22）
已完成：脚手架清理/路径别名/UnoCSS/Pinia/vue-router(404)/unplugin自动导入/SvgIcon/Vite插件抽离/reset.css/StorageCache/axios请求层/drop console·debugger/oxfmt/3 Skill/严格TS/多环境.env/vendor chunk分包/gzip预压缩/首屏loading/`docs/前端工程化.md`/模拟登录·登出·路由守卫（mock token，非真实接口，详见「登录/登出/守卫流程」章节）/ElementPlus 按需引入+sass主题定制+暗黑css-vars(切换待做；`unplugin-element-plus` 与 resolver 互补、必需保留)。
未做：真实登录接口/user Pinia store/userInfo/动态权限路由(asyncRoutes+addRoute+roles)/业务·示例页面(Layout仅占位)/路由children·懒加载/Layout实际布局/主题切换(亮↔暗，暗黑 css-vars 已就绪、待接开关并对齐暗黑主色)/CDN·路由级业务分包/单元测试(Vitest)/CI-CD/test·staging多环境.env/i18n/ESLint·husky·lint-staged/oxlint(评估非必需暂不入)。
注：①brotli 压缩**明确不引入**（gzip 已足够）；②refreshToken 系列为**预留扩展点**，非未做项，不计入待办。
构建状态：`vue-tsc -b` 类型检查绿 + `vite build` 1618 模块全部 transform、dist 正常（含 ElementPlus 按需+sass主题，主 CSS 仅约 13KB 佐证按需）。注：本机 `pnpm` 的 corepack 垫片路径损坏（报 `D:\c\Program Files\...` 错写），且沙箱安全删除会拦截清空旧 `dist`；验证改用 `node node_modules/vite/bin/vite.js build --outDir 临时目录`，实质与 `pnpm build` 等价。
