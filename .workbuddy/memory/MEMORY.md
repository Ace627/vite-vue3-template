# 项目记忆：vite-vue3-template

## 项目定位

基于 `pnpm create vite` 的 Vue3 + TS 产物二次改造，目标打造「前端工程化模板」。

## 技术栈

Vite ^8.1.1、Vue ^3.5.39、TypeScript ~6.0.2、vue-tsc ^3.3.5、@vitejs/plugin-vue ^6.0.7、@vue/tsconfig ^0.9.1、@types/node ^24、sass ^1.101.0(dev)、unocss ^66.7.5(dev)、pinia ^4.0.2、vue-router ^5.2.0、unplugin-auto-import ^21、unplugin-vue-components ^32、vite-plugin-svg-icons-ng ^1.9.2(dev)、oxfmt ^0.59.0(dev)。

## 项目约定

- **入口引导**：`src/main.ts` 用 `bootstrap()` 异步模式，顺序 `createApp` → `setupPlugins(app)` → `setupStore(app)`(Pinia) → `await setupRouter(app)` → `app.mount('#app')`。不预留/不注释未安装模块；导入统一用 `@/`（含入口文件）。
- **路径别名 `@/*` → `src/*`**：`tsconfig.app.json` 的 `compilerOptions.paths` 与 `vite.config.ts` 的 `resolve.alias` 双向同步，否则类型过但运行报找不到模块。
- **Vite 插件抽离**：`build/plugins/index.ts` 导出 `setupVitePlugins(): PluginOption[]`（无参，纯前端无 isBuild 需求），内部 `plugins.push` 注册 vue / UnoCSS / autoImport / autoComponents / svgIcons；`vite.config.ts` 调 `setupVitePlugins()`。`tsconfig.node.json` 的 include 含 `build/**/*.ts`（纳入类型检查）。nodenext 下相对导入须带 `.ts` 扩展名。
- **状态管理 Pinia**：`src/store/index.ts` 导出 `createPinia()` 单例与 `setupStore(app)`。
- **路由 vue-router 5.x**：`src/router/index.ts` 导出 `router` 单例与 `setupRouter(app)`；history 模式按 `import.meta.env.VITE_ROUTER_MODE==='hash'` 切 hash/web，`.env` 配 `VITE_ROUTER_MODE="history"`。⚠️ vue-router latest 已是 5.2.0（非 4.x），与本项目兼容，无需降级。
- **原子化样式 UnoCSS**：`uno.config.ts` 用 `presetWind3()` + `presetAttributify()`；`content.pipeline.include/exclude` 写法（unocss@66 无顶层 include）；`main.ts` 顶部 `import 'virtual:uno.css'` 置于 `./styles/index.scss` 前。preflight 仅注入 `--un-*` 变量，与 reset.css 不冲突，无需 `preflights:false`。
- **自动导入**：`unplugin-auto-import` 配 `imports: ['vue','pinia','vue-router']` + `dirs: ['src/store/modules','src/hooks']`；`unplugin-vue-components` 的 `dirs: []`（未启用全局组件目录扫描）。d.ts 落 `src/types/auto-generate/`（已 gitignore）。`vue-tsc -b` 先于 `vite build` 跑，d.ts 在 vite 阶段才生成，首次写组件用到自动导入 API 前先跑一次 dev/build。
- **SVG 图标 + 全局组件**：`vite-plugin-svg-icons-ng` 默认 `htmlMode:'inline'` 自动注入 sprite，**无需** `import 'virtual:svg-icons/register'`；`symbolId:'icon-[name]'`，故 `SvgIcon` 的 `name` **必须等于** `src/assets/svg-icons/` 下的文件名（去 `.svg`）。新增图标流程：从「阿里巴巴矢量图标库」下载或找 UI 拿 SVG → 放入 `src/assets/svg-icons/` → 跑 `pnpm clean:svg`（`scripts/svg-clean.ts`，`node --experimental-strip-types` 原生跑 TS 无需编译）去除 `fill/class/width/height/version/t/p-id` 等冗余属性，使其适配 `SvgIcon` 的 CSS `fill:currentColor`（仅支持单色图标，多色会丢色）。全局组件手动注册于 `src/plugins/modules/global-component.ts`，类型声明补 `src/types/global/global-component.d.ts`，统一放 `src/components/<Name>/`。新增全局组件走 Skill `add-global-component`。【生成代码注意】`SvgIcon` 的 `name` 只能用已存在的文件名；所需图标不存在时，须提醒开发者去阿里图标库下载或找 UI 获取，并跑 `clean:svg`。
- **样式分层**：`public/css/reset.css` 经 `index.html` `<link href="/css/reset.css">` 引入（基础重置，不进打包，避免 FOUC）；`src/styles/index.scss` 为全局样式入口（当前空白）。
- **应用标题/环境变量**：`.env` 提供 `VITE_APP_TITLE` 与 `VITE_ROUTER_MODE` 等公开变量；`index.html` 用 `%VITE_APP_TITLE%` 原生注入。`.env` 未 gitignore（仅含公开变量，加密钥需补规则）。手搓 meta 注入插件已于 2026-07-21 彻底移除，meta 注入若需做优先走 Vite 原生 `%VITE_*%`。
- **代码格式化 oxfmt**：`oxfmt.config.ts`（TS 配置，`defineConfig` 模式）。配置 `printWidth:160`、`singleQuote:true`、`trailingComma:'all'`、`semi:true`、`arrowParens:'always'`、`endOfLine:'lf'`；`ignorePatterns` 忽略 `dist/`/`node_modules/`/`src/types/auto-generate/`；启用内置 `sortImports`（`internalPattern:['^@/']`、`order:'asc'`）。`tsconfig.node.json` 的 `include` 含 `oxfmt.config.ts`（纳入类型检查）。`package.json` 脚本：`format`（`oxfmt . --write`）、`format:check`（`oxfmt . --check`）。
- **构建期移除 console/debugger（Vite 8 + Rolldown）**：`vite.config.ts` 改为函数式 `defineConfig(({ mode }) => {...})`，用 `loadEnv(mode, process.cwd())` 读取环境；在 `build.rolldownOptions.output.minify.compress` 下设 `dropConsole` / `dropDebugger`，值为 `runtimeConfig.VITE_DROP_CONSOLE !== 'false'`（即**默认启用**，仅当显式 `= false` 才保留）。开关来自 `.env.production` 的 `VITE_DROP_CONSOLE` / `VITE_DROP_DEBUGGER`（均为 `VITE_` 前缀，`loadEnv` 默认只认 `VITE_`，故能被注入；`build.minify` 默认 true，minify 生效时此 compress 配置才起作用）。⚠️ 该路径是 Rolldown 专属（Vite 8 默认 Rolldown），非 esbuild 的 `build.terserOptions`；若日后换回 esbuild 需改写法。`.env.production` 里的 `MODE = "production"` 非 `VITE_` 前缀、`loadEnv` 不加载，仅作标识无实际作用。
- **Token 存储约定（2026-07-22 确定）**：token 的过期/有效性由**服务端 Redis** 负责，前端 localStorage 只做**不透明持久化**（存字符串、请求时带出、收到 401 或登出时清掉）。因此 `src/utils/cache/token.cache.ts` 这类前端 token 封装**不需要客户端 TTL**（避免与后端重复造轮子）；前端 token 存 localStorage（关标签页仍保持登录）。评审 token 封装时仅看：读取返回类型须为 `string | null`（用 `StorageCache.get<string>` 恢复类型安全）。清场（登出 / 401 清 token）由调用方负责（登出逻辑或请求层拦截器调 `removeAccessToken`/`removeRefreshToken`），**不单开 `clearTokens()` 助手**（用户 2026-07-22 明确不需要）。
- **请求层 axios（2026-07-22 用户补充并迭代）**：`src/utils/request/index.ts` 用 `axios.create`（baseURL=`VITE_BASE_API`、timeout=`VITE_REQUEST_TIMEOUT`*1000），注册 `interceptor/jwt-auth.ts`（请求拦截器从 `@/utils/cache/token.cache` 取 `getAccessToken()` 挂 `Authorization: Bearer`，正确消费 token 约定）与 `interceptor/response-error.ts`（按 `HttpStatusCode` 映射错误文案 + `alert` 提示占位 + 后端 `response.data.message` 优先）。`axios@^1.18.1` 已进 dependencies。✅ 已修复：401 分支调 `removeAccessToken()` + `window.location.reload()` 清死 token（遵守 token 约定）；`const status = error.response?.status ?? -1` 替代废弃 `substr` 解析分支（网络错误优雅降级到 -1）；`alert` 加「后续换 toast」注释；`.env` 已声明 `VITE_BASE_API`（`.env.development` 有值、`production` 按注释待填）+ `VITE_REQUEST_TIMEOUT`（基文件显式 `=0` 无超时）。✅ `AxiosError` 收紧已完成（2026-07-22 用户落地）：把 `async (error:any)` 改为 `(error: AxiosError<ApiResponse>)`，用泛型参数让 `error.response.data` 直接获得项目统一响应类型 `ApiResponse`（定义在 `src/types/api.d.ts`，纯 `interface` 无 import/export 即全局 ambient 声明，无需 import），从而 `.message` 可类型安全访问、不再报「类型"{}"上不存在属性"message"」。比类型断言 `as { message?: string }` 更地道。同时去掉多余的 `async`（函数体内无 await）。`vue-tsc -b` 验证 exit 0 通过。注：`AxiosError`/`HttpStatusCode` 是 axios 运行期 class/enum，在 verbatimModuleSyntax 下可值导入；`AxiosInstance` 为纯接口已用 `type` 修饰。📌 响应转换拦截器 `response-transform.ts`（2026-07-22 用户新增）：`interceptors.response.use(async (response)=>{...}, (error)=>reject(error))` 负责「统一处理响应数据」——成功且 `code===200` 时 `return response.data.data`（**解包 ApiResponse、把真实业务数据返回给调用方**）；`code!==200` 业务失败时 `Promise.reject({response:{status:code, data:{message}}})` 转交 error 拦截器统一提示；并处理 Blob/ReadableStream 夹带 JSON 的情况。`ApiResponse` 强契约的真正主战场在此（解包 `data`、读 `code`/`message`），错误拦截器仅顺手取 `message` 兜底，不存在「错误拦截器耦合 ApiResponse」问题。⚠️ 类型一致性坑：`request.get<T>` 的 T 是**解包后的业务数据**（即 `ApiResponse.data` 的类型），调用方须写 `get<User>` 而非 `get<ApiResponse<User>>`（拦截器运行时解包但 axios 泛型未同步，靠约定，建议在 README/注释写明）。另：transform 的 `onRejected` 透传为冗余（error 拦截器 LIFO 先跑），可删；业务失败 reject 为手搓伪 AxiosError（非实例），功能 OK 类型略谎。📌 类型同步实测（2026-07-22 验证）：`request` 导出的是裸 `instance`（`AxiosInstance`），故 `request.get('/x')` 类型实为 `Promise<AxiosResponse<any>>`；因含 `any`，**直接赋给 `Promise<string>`（如 `function test(): Promise<string>{return request.get('/test')}`）无需 `as` 即可编译通过**（仅当显式传具体泛型 `get<{...}>` 时才 TS2322）。⚠️ 运行时铁律：必须用挂了拦截器的 `request` 实例，**不能裸 `axios.get`**——否则 transform 不生效、runtime 拿到的是 envelope 而非解包业务对象，类型因 `any` 放行但运行时已错。调用方声明返回类型即用 `Promise<业务类型>`、内部 `return request.get(...)` 即可，无需 Option A 的集中重写签名。

## 项目内 Skill

- `git-commit-msg`：依 git diff 生成中文 Conventional Commits message，只输出不擅自 commit；涉及 `.workbuddy/` 时也一并提交（用户明确要求必须提交，不得单列、不得提醒、不得询问）。**message 仅写 `type: 简洁单行描述`，不要展开多行 bullet 列表（用户明确不要）。**
- `path-alias`：配置 `@/*` 别名完整流程（tsconfig paths + vite resolve.alias 双向同步）。
- `add-global-component`：新增全局组件全流程（建 `src/components/<Name>/` + index.vue/types.ts 骨架 + 注册 + 补类型）。

## 进度与待办（截至 2026-07-21）

**已完成（构建通过：`pnpm build` 零类型错误、37 模块）**：脚手架清理、路径别名、UnoCSS、Pinia、vue-router 基础设施、unplugin 自动导入、SVG 图标/SvgIcon、Vite 插件抽离、reset.css、3 个项目 Skill、README 对齐、代码格式化 oxfmt（`oxfmt.config.ts`，替代 Prettier）。
**未做（模板常见项）**：

- 业务/示例页面（当前 App.vue=`<router-view>`，Layout 仅占位「布局测试」）
- 请求层（axios + 拦截器）、API 目录约定
- 多环境 `.env`（已加 `.env.production` 含 drop 开关；dev/test 待补）
- 路由 children / 懒加载 / 路由守卫（当前仅根路由）
- Layout 实际布局（头部/侧边栏/菜单）
- UI 组件库（Element Plus 已明确不引入）
- ESLint / husky / lint-staged
- i18n（错误页/404、本地存储封装 StorageCache 已完成）
- 构建优化（chunk 分包 / gzip / CDN）
- 单元测试（Vitest）、CI/CD

⚠️ **构建状态（2026-07-22 已修复）**：先前 `vue-tsc -b` 因 `useResize.ts` 引用未定义 `isMobile` 报错的预先存在 bug，已由用户手动在 `src/store/modules/app.ts` 补 `isMobile`/`isDesktop` 并导出修复。`vue-tsc -b && vite build` 整链已转绿（零类型错误、44 模块、dist 正常生成）。注：沙箱内 `pnpm` 经 corepack 路径损坏不可用，本地用 `node ./node_modules/vue-tsc/bin/vue-tsc.js -b` 与 `node ./node_modules/vite/bin/vite.js build` 验证；用户本机 `pnpm build` 正常。📌 2026-07-22 请求层 axios 基础封装（实例 + jwt-auth + response-error 含 401 清 token、网络错误 `?? -1` 降级）已完成，从上面「未做」清单的「请求层」项移出（line 40 的清单为 07-21 快照，不再代表当前）。
