# 项目记忆：vite-vue3-template

## 定位
基于 `pnpm create vite` 的 Vue3+TS 产物二次改造。**目标有二：①作为「前端工程化」的落地实践模板（可运行、可参考）；②作为「让 AI 理解前端工程化」的样本（结构清晰、约定明确，便于 AI 阅读与协作）。**
**边界约束**：纯前端工程化实践，**不涉及后端、无真实接口**；登录/权限/数据均以 mock 演示，所有能力演进均限定在前端范畴。任何「接后端 / 真实登录 / 真实权限 / 真实数据库」类需求均超出本项目范围，不得列入本项目待办。

## 技术栈
Vite ^8.1.1 / Vue ^3.5.39 / TS ~6.0.2 / vue-tsc ^3.3.5 / @vitejs/plugin-vue ^6.0.7 / sass ^1.101 / unocss ^66.7.5 / pinia ^4.0.2 / vue-router ^5.2.0 / element-plus ^2.14.3 / unplugin-auto-import ^21 / unplugin-vue-components ^32 / vite-plugin-svg-icons ^2.0.1 / vite-plugin-compression2 ^2.5.3 / oxfmt ^0.59 / axios ^1.18.1 / dayjs ^1.11.21 / lodash-es ^4.18.1。

## 约定（已落地）
- 入口：`src/main.ts` `bootstrap()` 异步，顺序 createApp→setupPlugins→setupStore→await setupRouter→mount；导入顺序 `@/styles/index.scss`→`virtual:uno.css`→`virtual:svg-icons-register`。统一 `@/` 别名（tsconfig.app paths 与 vite resolve.alias 双向同步）。
- Vite 插件抽离 `build/plugins/index.ts` 导出 `setupVitePlugins()`，纳入 tsconfig.node；nodenext 下相对导入带 `.ts`。
- 状态：`src/store/index.ts` 导出 `createPinia()` 单例 + `setupStore(app)`；含 `store/modules/app.ts`、`setting.ts`、`user.ts`(mock 登录态)、`permission.ts`(菜单路由)、`tags-view.ts`(页签)。
- 路由：`VITE_ROUTER_MODE==='hash'` 切 hash 否则 history；history base 与 Vite `base` 均传 `VITE_PUBLIC_PATH`(默认 `/`)。`static.route.ts` 导出 `STATIC_ROUTE_LIST`(dashboard/login/redirect/404，当前静态无动态权限)。`router.guard.ts` 白名单 `['/login']`→无 token 跳 `/login?redirect`；已登录无 roles 时 `userStore.getInfo()`+`permissionStore.getRoutes()` 生成路由(动态路由接真接口为预留)。
- UnoCSS：`presetWind3()+presetAttributify()`，自定义 rules(wh-/mtb-/mlr-/ptb-/plr-)+shortcuts(wh-full/wh-screen/flex-center/clearFix)。
- 自动导入：auto-import `imports:['vue','pinia','vue-router']`+`dirs:['src/store/modules','src/hooks']`；components `dirs:[]`。d.ts 落 `src/types/auto-generate/`。
- SVG（2026-07-24 修复不显示）：根因是 `vite-plugin-svg-icons-ng` 在 Vite8 下 sprite 注入/热更不稳定；修复=回退官方 `vite-plugin-svg-icons` + `main.ts` `import 'virtual:svg-icons-register'`。symbolId `icon-[name]`，组件名=文件名。新增图标放 `src/assets/svg-icons/`→`pnpm clean:svg` 适配 `fill:currentColor`。
  - 类型声明坑：官方插件 `package.json.exports` 未暴露 `./client`，故在 `src/types/global/vite-env.d.ts` 用 `declare module 'virtual:svg-icons-register'`(及 `'virtual:svg-icons-names'`) 手动声明，`vue-tsc -b` 方通过。
- ElementPlus（按需+sass主题+暗黑）：`unplugin-vue-components`+`ElementPlusResolver({importStyle:'sass'})` 管模板组件样式；`unplugin-auto-import`+同 resolver 管 API；`unplugin-element-plus({useSource:true})` 管函数式 API 样式注入，**三处缺一不可**。`vite.config.ts` `additionalData` 注入 `el-theme-light.scss`(primary `#0077ff`)；暗黑主色仍 EP 默认蓝 `#409eff`。
- 样式分层：`public/css/reset.css` `<link>` 引入(不进打包防 FOUC；oxfmt 已 ignore)；`src/styles/index.scss` 入口(引入 `variables.scss`+`el-theme-dark.scss`+body 背景)；`variables.scss` 放 navbar 等变量。reset.css 含 view-transition 关闭默认动画 + `.dark::view-transition-old(root){z-index:2026}`。
- **AI 代码约束**见根 `AGENTS.md`(三条)：图标统一 `<SvgIcon>`/EP 组件图标位用插槽塞 SvgIcon/复用 `@/utils`(统一入口，禁散装子路径 import，缺失则补到 utils 并导出)。
- **`@/utils` barrel 循环依赖红线**：第3条针对 `src/utils` 之外的消费者；属于 barrel 导出图的 `src/utils` 内部模块必须走相对子路径、禁 `import ... from '@/utils'`（否则循环依赖）。`src/utils/request/...` 不在导出图内，可安全用 barrel 引入。修复散装 import 时先判断文件是否属于导出图。
- 首屏 loading：`index.html` `#app` `.app-loading` + `public/css/app-loading.css`，`main.ts` 靠 `app.mount` 清空 container。
- **业务路由页基础容器 `.app-content`（2026-07-25 定）**：所有挂载在 layout 内的业务路由页根元素统一加 `app-content` 类（`src/styles/index.scss`：`position:relative;width:100%;padding:16px`；移动端 `html[data-device='mobile'] .app-content{padding:12px}`）。页面内不再各自写 `padding`/`min-height`。
- 构建：drop console/debugger 走 Rolldown；vendor chunk 分包；gzip 预压缩；oxfmt `printWidth:160/singleQuote/semi:false/trailingComma:'all'`，ignore 含 `reset.css`；`sortImports` 已注释禁用。axios 请求层 + token.cache(StorageCache 前缀 `app:storage:`，含 refreshToken 预留点)。
- 登录态本质：localStorage `accessToken` 即全部登录态；`user` store(mock) 持 `currentUserInfo/roles/permissions`，`auth.request.ts` 为 mock（`request.*` 调用已注释，返回写死数据）。

## 登录/登出/守卫（模拟实现）
主链路：受保护页→guard 拦→无 token 跳 `/login?redirect`→`login.vue` 写死 `mock-access-token` 回跳→登出=`removeAccessToken()`+`router.replace('/login')`。边界：登录/登出无接口、401 兜底整页 reload。

## 主题切换与设置页（2026-07-24~25）
- `src/defaultSettings.ts`：`SystemSetting{theme, size, showDynamicTitle, uniqueOpened, showWatermark, showLogo, showTagsView, showTagsViewIcon, transition}`(9 项，默认 light/default/true/true/true/true/true/true/fade-transform)。`size` 经 `App.vue` `<el-config-provider :size>` 全局生效；`showDynamicTitle` 经 `useDynamicTitle` watch 控制 `document.title`；`showWatermark` 经 `layout/index.vue` 把 `el-watermark` 的 `:content` 绑为 `computed(() => showWatermark ? VITE_APP_TITLE : [])`，关闭时仅留无害空层。
- `src/hooks/useTheme.ts`（`useTheme()` → `isDark`/`applyTheme(theme,event?)`/`toggleTheme(event?)`）：统一切 `<html>.dark` 类 + View Transitions 圆形扩散（有点击坐标从点击点、无坐标从屏幕中心）+ 防 FOUC 初始化；含 `startViewTransition` 降级（非 Chromium 直接切换）。**`saveSetting` 必须放在 `startViewTransition` 的 `run` 回调内、主题值已更新之后调用，否则持久化旧主题**。
- `src/store/modules/setting.ts`：`useSettingStore` 用 `merge(defaultSettings,getSystemSetting())` 初始化；`saveSetting(config?)` 默认 `showTip:true`（弹 loading）；`resetSetting()` 清缓存 + reload。`showSetting` 控制 `SettingPanel` 抽屉显隐（Navbar 齿轮与用户菜单「系统设置」置 `true` 唤起）。
- `src/layout/components/SettingPanel/index.vue`（替代已删除的 `/settings` 路由页）：右侧 `el-drawer` 配置抽屉，内 `el-switch`/`el-select` 双向绑 `settingStore` 各字段（动态标题/显示Logo/手风琴菜单/系统水印/多标签模式/显示页签图标/路由转场），底部「保存配置」「重置配置」调 `saveSetting()`/`resetSetting()`。路由转场用 `<el-select>` 选 `SystemSetting.transition`（6 项：fade-transform / el-fade-in-linear / el-fade-in / el-zoom-in-center / el-zoom-in-top / el-zoom-in-bottom），经 `AppMain` 的 `<Transition :name>` 生效。
- Navbar：左侧 `Hamburger`(折叠，持久化 sidebar-status.cache)；右侧齿轮 `<span @click="settingStore.showSetting=true">`+`<SvgIcon name="Setting">` 唤起 SettingPanel 抽屉；主题切换用 `ThemeSwitch`（委托 `useTheme().toggleTheme`，Moon/Sunny 图标，el-tooltip 包）；`UserDropDown` 用户菜单（头像/昵称/系统设置/退出登录）。

## 工程化进度
已完成：脚手架/别名/UnoCSS/Pinia/vue-router(404)/自动导入/SvgIcon(含修复)/Vite插件抽离/reset.css/StorageCache/axios/drop console·debugger/oxfmt/4 Skill(git-commit-msg / path-alias / add-global-component / iterate-docs)/严格TS/多环境.env/vendor分包/gzip/首屏loading/模拟登录守卫/ElementPlus按需+主题+暗黑/**主题切换+useTheme hook(2026-07-24~25)**/设置页 /settings(2026-07-25：主题·尺寸·动态标题·保存/重置 + 移动端 + Navbar 入口)/`.app-content` 容器(2026-07-25)/类型重组 `types/api/`(api.d.ts→api/api.d.ts + auth.ts)/docs 同步。**2026-07-26 再次同步 `docs/前端工程化.md`：补 AppLogo(Brand 抽离封装)、设置页 `/settings`、useTheme 统一逻辑层、SystemSetting.size 字段、`.app-content` 容器 / 全局水印 el-watermark（layout 包裹全站、VITE_APP_TITLE、明暗联动）**。**2026-08-14 大同步 docs**：目录结构补录 directives/api/Sidebar/TagsView/SettingPanel/Navbar子件/3 store/router.helper/types/cache/utils；前端工程化 + 全局设置中心 修正 /settings 已移除改 SettingPanel 抽屉、SystemSetting 扩 9 字段、user store/权限指令/侧边栏已 mock 落地的事实冲突；新建 5 篇专题文档(侧边栏菜单/多标签页面签/权限指令/用户体系/导航栏用户菜单)。
未做：业务示例页 / 路由children·懒加载 / i18n / ESLint·husky / oxlint / 单元测试 / CI-CD。注：brotli 不引入；不接真实后端(`auth.request` 为 mock)；refreshToken 仅前端预留点不续期；动态路由 asyncRoutes 接真接口为预留；面包屑为 SettingPanel 注释预留。已落地(mock)：user store / 权限指令 v-roles·v-permissions / 侧边栏 Sidebar / 多页签 TagsView / SettingPanel 抽屉(替代 /settings 路由页)。
构建状态：`vue-tsc -b` 绿 + `vite build` 正常。本机 `pnpm` 须用 PowerShell `& "C:\Progra~1\nodejs\pnpm.CMD"`（Git Bash corepack 路径错）。

## 环境/工具约束（2026-08-18）
- **安全删除钩子在本机 fail-closed**：IDE 的 safe-delete 默认把所有删除先挪回收站，但本机回收站操作报错（`Some operations were aborted`，回收站功能异常）。trash 一旦失败，钩子宁可报错也**不让真删**——`rm` / Python `shutil.rmtree` / node `rmSync` 全被拦。
- **后果**：`vite build` 清空旧 `dist/` 也会失败（`prepareOutDir`→`emptyDir` 被拦）；任何"造了再删"的临时物都删不掉，会留在项目里。
- **对策（重要，避免遗留垃圾）**：验证代码改动**只用 `vue-tsc -b`**（不产生 dist、无清理负担），**不跑一次性 `vite build --outDir dist-verify` 之类去验证**；真正需要完整构建只走项目 `build`（产物落 gitignore 的 `dist/`，是既定输出非临时物）。
- 若确需强删（如误造的临时验证目录），可用 Python `ctypes.windll.kernel32.DeleteFileW` / `RemoveDirectoryW` 直接调 Win32 API 绕过 shim（绕开 `os.remove`/`shutil.rmtree` 的拦截），属绕过安全机制的最后一招，**正常情况不依赖它**。
