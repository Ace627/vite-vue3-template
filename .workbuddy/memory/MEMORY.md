# 项目记忆：vite-vue3-template

## 项目定位
- 目标：打造「前端工程化模板」（基于 `pnpm create vite` 的 Vue3 + TS 产物二次改造）。

## 技术栈（版本较新，选型需注意兼容）
- Vite `^8.1.1`、Vue `^3.5.39`、TypeScript `~6.0.2`、vue-tsc `^3.3.5`、@vitejs/plugin-vue `^6.0.7`、@vue/tsconfig `^0.9.1`、@types/node `^24`、sass `^1.101.0`（dev，已装）

## 项目约定
- 站点描述单一真源 = `package.json` 的 `description`（中文）；`index.html` 的 `<meta name="description">` 内容由 `vite.config.ts` 的 `transformIndexHtml` 在 dev/build 时自动注入（占位符 `__APP_DESCRIPTION__`）。**勿手改 index.html 的 description meta**，改 `package.json` 即可让两处自动一致。
- `index.html` 的 `<html lang="zh-CN">`（已本地化）。
- 已清理 create vite 的 demo 产物：`src/components/HelloWorld.vue`、`src/style.css`、`src/assets/` 下的 vite.svg/vue.svg/hero.png 已删除；`App.vue`、`main.ts` 的对应引用已清除，`src/` 现为干净空壳（App.vue 仅留根组件骨架，main.ts 仅挂载 App）。
- 全局样式入口 = `src/styles/index.scss`，由 `main.ts` 引入；当前**保持空白**，后续再填充变量/mixin/第三方样式等。
- 基础 reset 样式 = `public/css/reset.css`，通过 `index.html` 的 `<head>` 内 `<link rel="stylesheet" href="/css/reset.css" />` 引入（**不**进 `index.scss`，以免打包后加载时序靠后导致样式跳动/FOUC）。内容含 box-sizing、旧版浏览器新布局元素兼容、html/body/#app 全高、移动端点击高亮去除等。
- 入口采用 `bootstrap()` 异步引导模式（`src/main.ts`）：仅 `createApp(App)` → `app.mount('#app')` → 打印完成。不预留/不注释任何尚未安装/创建的模块（用户要求「没有的东西不要」，连 TODO 注释也不留）。当前仅依赖 vue / sass / App。
- **路径别名 `@/*` → `src/*`**（已配置，2026-07-20）：`tsconfig.app.json` 的 `compilerOptions.paths` 写 `"@/*": ["./src/*"]`；`vite.config.ts` 的 `resolve.alias` 写 `'@': fileURLToPath(new URL('./src', import.meta.url))`。**两处必须同步**，否则类型检查通过但运行时报「找不到模块」。导入统一用 `@/` 而非相对路径。

## 项目内 Skill
- `git-commit-msg`（项目级，`.workbuddy/skills/git-commit-msg/SKILL.md`）：根据 `git diff` 实际改动生成 Conventional Commits 规范的中文提交信息（格式 `<type>: <简述>`），只输出 message 不擅自 `git commit`；暂存区含 `.workbuddy/` 等工具目录时提醒用户而非擅自处理。
- `path-alias`（项目级，`.workbuddy/skills/path-alias/SKILL.md`）：Vite+Vue+TS 项目配置 `@/*` 别名的完整流程（tsconfig `paths` + vite `resolve.alias` 双向同步、ESM 安全 `fileURLToPath(new URL('./src',import.meta.url))`、`pnpm build` 验证）。
