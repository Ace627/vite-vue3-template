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

## 项目内 Skill

- `git-commit-msg`：依 git diff 生成中文 Conventional Commits message，只输出不擅自 commit；涉及 `.workbuddy/` 时也一并提交（用户明确要求必须提交，不得单列、不得提醒、不得询问）。**message 仅写 `type: 简洁单行描述`，不要展开多行 bullet 列表（用户明确不要）。**
- `path-alias`：配置 `@/*` 别名完整流程（tsconfig paths + vite resolve.alias 双向同步）。
- `add-global-component`：新增全局组件全流程（建 `src/components/<Name>/` + index.vue/types.ts 骨架 + 注册 + 补类型）。

## 进度与待办（截至 2026-07-21）

**已完成（构建通过：`pnpm build` 零类型错误、37 模块）**：脚手架清理、路径别名、UnoCSS、Pinia、vue-router 基础设施、unplugin 自动导入、SVG 图标/SvgIcon、Vite 插件抽离、reset.css、3 个项目 Skill、README 对齐、代码格式化 oxfmt（`oxfmt.config.ts`，替代 Prettier）。
**未做（模板常见项）**：

- 业务/示例页面（当前 App.vue=`<router-view>`，Layout 仅占位「布局测试」）
- 请求层（axios + 拦截器）、API 目录约定
- 多环境 `.env`（dev/prod/test）
- 路由 children / 懒加载 / 路由守卫（当前仅根路由）
- Layout 实际布局（头部/侧边栏/菜单）
- UI 组件库（Element Plus 已明确不引入）
- ESLint / husky / lint-staged
- i18n、错误页/404、存储与通用工具封装
- 构建优化（chunk 分包 / gzip / CDN）
- 单元测试（Vitest）、CI/CD
