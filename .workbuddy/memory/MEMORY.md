# 项目记忆：vite-vue3-template

## 项目定位
基于 `pnpm create vite` 的 Vue3 + TS 产物二次改造，目标打造「前端工程化模板」。

## 技术栈
Vite ^8.1.1、Vue ^3.5.39、TypeScript ~6.0.2、vue-tsc ^3.3.5、@vitejs/plugin-vue ^6.0.7、@vue/tsconfig ^0.9.1、@types/node ^24、sass ^1.101.0(dev)、unocss ^66.7.5(dev)、pinia ^4.0.2、vue-router ^5.2.0、unplugin-auto-import ^21、unplugin-vue-components ^32、vite-plugin-svg-icons-ng ^1.9.2(dev)、oxfmt ^0.59.0(dev)、axios ^1.18.1。

## 项目约定（已落地）
- **入口引导**：`src/main.ts` 用 `bootstrap()` 异步模式，顺序 `createApp` → `setupPlugins(app)` → `setupStore(app)`(Pinia) → `await setupRouter(app)` → `app.mount('#app')`。统一用 `@/` 导入。
- **路径别名**：`@/* → src/*`，`tsconfig.app.json` 的 `paths` 与 `vite.config.ts` 的 `resolve.alias` 双向同步。
- **Vite 插件抽离**：`build/plugins/index.ts` 导出 `setupVitePlugins(): PluginOption[]`，注册 vue/UnoCSS/autoImport/autoComponents/svgIcons；`build/**/*.ts` 纳入 `tsconfig.node.json` 检查。nodenext 下相对导入须带 `.ts`。
- **状态管理**：`src/store/index.ts` 导出 `createPinia()` 单例 + `setupStore(app)`。
- **路由**：`src/router/index.ts` 导出 `router` + `setupRouter(app)`；`VITE_ROUTER_MODE==='hash'` 切 hash/web（当前 history）；含 404 兜底路由（`src/views/core/404.vue`）。
- **UnoCSS**：`uno.config.ts` 用 `presetWind3()` + `presetAttributify()`，自定义 rules（wh-/mtb-/mlr-/ptb-/plr-）+ shortcuts（wh-full/wh-screen/flex-center/clearFix）；`main.ts` 顶部 `import 'virtual:uno.css'` 置于 `./styles/index.scss` 前。
- **自动导入**：unplugin-auto-import 配 `imports:['vue','pinia','vue-router']` + `dirs:['src/store/modules','src/hooks']`；unplugin-vue-components 的 `dirs:[]`（未启用组件目录扫描）。d.ts 落 `src/types/auto-generate/`（gitignore）。
- **SVG 图标**：`vite-plugin-svg-icons-ng` 默认 inline 注入 sprite，无需 `import 'virtual:svg-icons/register'`；`symbolId:'icon-[name]'`，`SvgIcon` 的 `name` 必须等于 `src/assets/svg-icons/` 文件名（去 `.svg`）。新增图标流程：阿里图标库下载 → 放入目录 → 跑 `pnpm clean:svg`（`scripts/svg-clean.ts`，`node --experimental-strip-types` 原生跑 TS）去冗余属性适配 `fill:currentColor`（仅单色）。全局组件手动注册于 `src/plugins/modules/global-component.ts`，类型补 `src/types/global/global-component.d.ts`，统一放 `src/components/<Name>/`。新增全局组件走 Skill `add-global-component`。
- **样式分层**：`public/css/reset.css` 经 `index.html` `<link>` 引入（不进打包防 FOUC）；`src/styles/index.scss` 全局样式入口（当前空）。
- **环境变量**：`.env` 提供 `VITE_APP_TITLE`/`VITE_ROUTER_MODE`/`VITE_REQUEST_TIMEOUT`；`.env.development` 有 `VITE_BASE_URL`(真实后端地址)/`VITE_BASE_API`/`VITE_SERVER_PORT`；`.env.production` 有 `VITE_DROP_CONSOLE`/`VITE_DROP_DEBUGGER`/`VITE_BASE_API`。`index.html` 用 `%VITE_APP_TITLE%` 原生注入。`.env` 未 gitignore（仅公开变量）。
- **开发期反向代理（Vite `server.proxy`）**：`vite.config.ts` 的 `proxy` 键 = `VITE_BASE_API`，`target=VITE_BASE_URL`、`changeOrigin:true`、`rewrite` 剥掉 `/dev-api` 标记。`/dev-api` 是纯代理标记前缀（不与路由/静态资源冲突），它后面拼的才是后端真实公共路径。两种用法统一在 `VITE_BASE_API` 一个变量：①无公共路径 → `/dev-api`（浏览器 `/dev-api/x` → 剥除 → 后端根 `/x`）；②有公共路径 → `/dev-api/api` 或 `/dev-api/common`（剥 `/dev-api` → 后端 `/api/...`）。好处：开发期消跨域、配置点最少、dev/prod 共用同一 `baseURL=VITE_BASE_API` 写法（prod 由 nginx 按 `VITE_BASE_API` 反代，现已配 `VITE_BASE_API="/api"`）。**核心优势（设计取舍）**：`/dev-api` 把「代理触发前缀」与「后端公共路径」合一于 `VITE_BASE_API` 单一变量——后端无公共路径时仅写 `/dev-api` 即**零额外配置**（剥掉即直达后端根），有公共路径时只在 `/dev-api` 后追加一段（如 `/dev-api/api`）。开发者切换环境 / 换后端 / 加去公共前缀，全程只动 `.env`、不碰业务代码，**心智负担最低**。
- **代码格式化 oxfmt**：`oxfmt.config.ts`（`defineConfig`）。`printWidth:160`、`singleQuote:true`、`semi:false`、`trailingComma:'all'`、`arrowParens:'always'`、`endOfLine:'lf'`；`ignorePatterns` 忽略 `dist/`/`node_modules/`/`src/types/auto-generate/`/`pnpm-lock.yaml`；启用 `sortImports`（`internalPattern:['^@/']`、`order:'asc'`）。`tsconfig.node.json` include 含 `oxfmt.config.ts`。脚本：`format`/`format:check`。
- **构建期移除 console/debugger（Vite 8 + Rolldown）**：`vite.config.ts` 函数式 `defineConfig(({mode})=>...)` + `loadEnv`；`build.rolldownOptions.output.minify.compress` 设 `dropConsole`/`dropDebugger`，值 `runtimeConfig.VITE_DROP_* !== 'false'`（默认启用）。Rolldown 专属，换 esbuild 需改写法。
- **构建期 vendor chunk 分包（Vite 8 + Rolldown）**：`vite.config.ts` 的 `build.rolldownOptions.output.codeSplitting.groups` 将 `vue/pinia/vue-router/axios/dayjs` 拆为独立 vendor chunk；`chunkFileNames`/`entryFileNames` 用 `[name]-[hash].js`（content hash，内容不变则文件名不变）。**收益**：①浏览器长缓存命中——vendor 不随业务发版变动，二次访问免重下库代码（约 80KB 级别）；②并发下载缩短首屏——多块并行、流式解析，HTTP/2 多路复用下更优；③缓存粒度细，业务改动不波及 vendor 缓存；④失败隔离（单块失败只重下该块）+ 同类代码同块压缩率略高。**边界/约束**：①Vite 8 + Rolldown 已无传统 `build.rollupOptions.output.manualChunks`（对象形式报 `output.manualChunks object form is not supported`，函数形式亦弃用），分包只能走 `codeSplitting.groups`（或 Rolldown 新 `advancedChunks.groups`），勿再用 manualChunks。②须服务端/CDN 对带 hash 资源配 `Cache-Control: public, max-age=31536000, immutable` 才真正生效（入口 html 短缓存/不缓存）。③`vue` 运行时(`@vue/runtime-*` 等)因 group 的 `test` 正则 `/node_modules[\\/]vue[\\/]/` 仅匹配 `node_modules/vue/`、未覆盖 `node_modules/@vue/`，被 Rolldown 当未分组共享模块合并进 `pinia` 块（pinia 60.5KB 内已含 vue 运行时），`index` 入口块仅持有对 `createApp` 的引用——故 vue 未真正独立成块、缓存粒度被绑到 pinia；**修复**：将 vue 组 `test` 改为 `/node_modules[\\/](vue|@vue)[\\/]/` 即可让 `@vue/*` 归 vue 组独立成块（priority 16 最高，会从 pinia 块剥离 vue 运行时）。④业务未做路由级懒加载分包；⑤碎块过多(>30)反噬请求开销；⑥HTTP/1.1 同域并发≈6。
- **请求层 axios**：`src/utils/request/index.ts` 用 `axios.create`（baseURL=`VITE_BASE_API`、timeout=`VITE_REQUEST_TIMEOUT`*1000），注册 `jwt-auth`（取 `getAccessToken()` 挂 `Bearer`）+ `response-transform`（成功 `code===200` 解包 `response.data.data`、业务失败转交 error 拦截器）+ `response-error`（按 `HttpStatusCode` 映射文案 + `alert` 占位 + 后端 `message` 优先；401 调 `removeAccessToken()` + `reload()` 清死 token；网络错误 `status ?? -1` 降级）。`ApiResponse<T>` 定义为 `src/types/api.d.ts` 全局 ambient（`code`/`message`/`data`），拦截器用 `AxiosError<ApiResponse>` 泛型收紧类型。`request.get<T>` 的 T 是解包后业务数据，调用方写 `get<User>` 而非 `get<ApiResponse<User>>`。
- **Token 存储约定**：token 过期/有效性由服务端 Redis 负责，前端 localStorage 仅做不透明持久化（`src/utils/cache/token.cache.ts`，读写返回 `string | null`）。清场由调用方负责，不开 `clearTokens()`。底层 `StorageCache`（`src/utils/storage-cache.util.ts`）统一 `app:storage:` 前缀、支持 ttl。

## 项目内 Skill
- `git-commit-msg`（触发即「提交代码」习惯说法，详情见 `.workbuddy/skills/git-commit-msg/SKILL.md`）：**严格两步流程 + 最终提交前强制自检**。① 基于真实 `git diff` 生成 5 条彼此有差异的单行中文候选 message（`<type>: <简述>`，中文动词开头、≤50字、无句号），纯文本列出 1-5 让用户回复编号选（候选超 4 项不能用快捷组件，必须纯文本）；② 用户选定后单独再问一次提交方式：提交到暂存区 / 提交并推送 / 跳过；③ **最终提交前强制自检**：执行 `git status --short`，若输出为空则停止并告知用户无改动；若输出非空则列出未提交文件，重点检查 `.workbuddy/` 是否有新增改动，必须一并纳入本次提交（不单列、不询问），再次确认后再执行 `git add` 与 `git commit`。所有写操作必须用户确认，绝不自动执行；`.workbuddy/` 一并提交。
- `path-alias`：`@/*` 别名完整配置流程。
- `add-global-component`：新增全局组件全流程。

## 工程化进度（截至 2026-07-22）
**已完成**：脚手架清理、路径别名、UnoCSS（含自定义 rules/shortcuts）、Pinia、vue-router（含 404 兜底）、unplugin 自动导入、SVG 图标 + SvgIcon、Vite 插件抽离、reset.css、StorageCache 封装、axios 请求层（实例 + 三拦截器 + ApiResponse 契约 + 类型收紧）、构建期 drop console/debugger、代码格式化 oxfmt、3 个项目 Skill、严格 TS 配置（noUnusedLocals/Parameters、erasableSyntaxOnly、tsconfig.node 用 verbatimModuleSyntax/nodenext）、多环境 .env（dev/prod）、构建期 vendor chunk 分包（Rolldown `output.codeSplitting.groups`：vue/pinia/vue-router/axios/dayjs 独立成块、文件名带 content hash）。
**未做（模板常见项）**：业务/示例页面（App.vue=`<router-view>`、Layout 仅占位）、路由 children/懒加载/路由守卫、Layout 实际布局（头部/侧边栏/菜单）、UI 组件库（Element Plus 明确不引入）、ESLint/husky/lint-staged、i18n、构建优化（gzip/brotli 压缩、CDN、路由级业务分包懒加载）、单元测试（Vitest）、CI/CD、test/staging 多环境 .env。

## 后续计划
- **整理「可直接落地的前端工程化配置文档」**：用户明确有此意向，将基于本项目已落地的约定（脚手架清理 / 路径别名 / UnoCSS / Pinia / vue-router / axios 请求层 / 开发期反向代理 `/dev-api` / 构建期 drop console/debugger / oxfmt / 严格 TS / 多环境 .env）沉淀为一份开箱即用的工程化配置手册。触发时再细化结构，当前为待启动状态。
**构建状态**：`vue-tsc -b && vite build` 整链已转绿（零类型错误，44 模块，dist 正常生成）。
