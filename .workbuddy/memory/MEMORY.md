# 项目记忆：vite-vue3-template

## 项目定位
- 目标：打造「前端工程化模板」（基于 `pnpm create vite` 的 Vue3 + TS 产物二次改造）。

## 技术栈（版本较新，选型需注意兼容）
- Vite `^8.1.1`、Vue `^3.5.39`、TypeScript `~6.0.2`、vue-tsc `^3.3.5`、@vitejs/plugin-vue `^6.0.7`、@vue/tsconfig `^0.9.1`、@types/node `^24`、sass `^1.101.0`（dev，已装）、unocss `^66.7.5`（dev，已装，2026-07-20 集成）、pinia `^4.0.2`（运行时依赖，已装，2026-07-21 集成）

## 项目约定
- 站点描述单一真源 = `package.json` 的 `description`（中文）；`index.html` 的 `<meta name="description">` 内容由 `vite.config.ts` 的 `transformIndexHtml` 在 dev/build 时自动注入（占位符 `__APP_DESCRIPTION__`）。**勿手改 index.html 的 description meta**，改 `package.json` 即可让两处自动一致。
- `index.html` 的 `<html lang="zh-CN">`（已本地化）。
- 已清理 create vite 的 demo 产物：`src/components/HelloWorld.vue`、`src/style.css`、`src/assets/` 下的 vite.svg/vue.svg/hero.png 已删除；`App.vue`、`main.ts` 的对应引用已清除，`src/` 现为干净空壳（App.vue 仅留根组件骨架，main.ts 仅挂载 App）。
- 全局样式入口 = `src/styles/index.scss`，由 `main.ts` 引入；当前**保持空白**，后续再填充变量/mixin/第三方样式等。
- 基础 reset 样式 = `public/css/reset.css`，通过 `index.html` 的 `<head>` 内 `<link rel="stylesheet" href="/css/reset.css" />` 引入（**不**进 `index.scss`，以免打包后加载时序靠后导致样式跳动/FOUC）。内容含 box-sizing、旧版浏览器新布局元素兼容、html/body/#app 全高、移动端点击高亮去除等。
- 入口采用 `bootstrap()` 异步引导模式（`src/main.ts`）：`createApp(App)` → `setupStore(app)`（注册 Pinia，2026-07-21 接入）→ `app.mount('#app')` → 打印完成。不预留/不注释任何尚未安装/创建的模块（用户要求「没有的东西不要」，连 TODO 注释也不留）。
- **路径别名 `@/*` → `src/*`**（已配置，2026-07-20）：`tsconfig.app.json` 的 `compilerOptions.paths` 写 `"@/*": ["./src/*"]`；`vite.config.ts` 的 `resolve.alias` 写 `'@': fileURLToPath(new URL('./src', import.meta.url))`。**两处必须同步**，否则类型检查通过但运行时报「找不到模块」。导入统一用 `@/` 而非相对路径。
- **状态管理 = Pinia**（已集成，2026-07-21）：目录 `src/store/`，`index.ts` 导出模块级 `createPinia()` 单例与 `setupStore(app)` 注册函数；`main.ts` 的 `bootstrap()` 在 `createApp(App)` 之后、`app.mount` 之前调用 `setupStore(app)`，调用上方保留独立注释 `// 配置 Store 状态管理 https://pinia.web3doc.top`。`main.ts` 内从 `@/store` 导入，遵循统一 `@/` 约定（用户 2026-07-21 最终确认：入口文件也统一 `@/`，不再用相对路径）。
- **原子化样式 = UnoCSS**（已集成，2026-07-20）：`unocss` 作为 devDependency；`vite.config.ts` 的 `plugins` 数组加入 `UnoCSS()`（需 `import UnoCSS from 'unocss/vite'`）；`src/main.ts` 顶部 `import 'virtual:uno.css'`（置于 `./styles/index.scss` 之前）；配置文件 `uno.config.ts` 位于项目根（Vite 插件自动发现，无需手动引用路径）。预设 `presetWind3()` + `presetAttributify()`，含自定义 rules（`wh-`/`mtb-`/`mlr-`/`ptb-`/`plr-`）与 shortcuts（`wh-full`/`wh-screen`/`flex-center`/`clearFix`）。**版本坑**：参考的 `vite-electron-template` 的 `uno.config.ts` 是旧版写法，`unocss@66.x` 已不支持——`content` 必须用 `content.pipeline.include/exclude`（无顶层 `include`）；`cache:true` 顶层字段已移除（缓存默认开启，无需声明）。`uno.config.ts` 未纳入 node 端 tsconfig 的 `include`（按用户意见，配置文件类型错误由 IDE 检查即可，`vue-tsc -b` 不必覆盖；`vite.config.ts` 仍保留）。`virtual:uno.css` 的模块类型由 UnoCSS 自带声明，`vue-tsc` 无需额外 `.d.ts`。注：UnoCSS 注入的 preflight 仅含 `--un-*` CSS 变量预设（供 rotate/scale/ring 等原子类默认值），**不含**传统样式重置（`margin`/`box-sizing`/`normalize` 均无），与 `public/css/reset.css` 完全不重叠、零冲突；"双重 preflight 重置"担忧系误报（已核实 dist 产物与 `preset-wind3` 源码），无需 `preflights:false` 或删 reset.css。

## 项目内 Skill
- `git-commit-msg`（项目级，`.workbuddy/skills/git-commit-msg/SKILL.md`）：根据 `git diff` 实际改动生成 Conventional Commits 规范的中文提交信息（格式 `<type>: <简述>`），只输出 message 不擅自 `git commit`；暂存区含 `.workbuddy/` 等工具目录时提醒用户而非擅自处理。
- `path-alias`（项目级，`.workbuddy/skills/path-alias/SKILL.md`）：Vite+Vue+TS 项目配置 `@/*` 别名的完整流程（tsconfig `paths` + vite `resolve.alias` 双向同步、ESM 安全 `fileURLToPath(new URL('./src',import.meta.url))`、`pnpm build` 验证）。
