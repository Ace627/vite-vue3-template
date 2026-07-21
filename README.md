# vite-vue3-template

基于 `pnpm create vite`（Vue 3 + TypeScript）二次改造的**前端工程化模板**。

## 内置 SKILL（项目级）

本仓库在 `.workbuddy/skills/` 下内置了三个项目级 Skill，用于标准化常见工程操作。

> 说明：项目级 Skill 无法经 Skill 工具按名直接加载，需按对应 `SKILL.md` 的内容手动执行。

### 1. `git-commit-msg` — 生成 git 提交信息
- 路径：`.workbuddy/skills/git-commit-msg/SKILL.md`
- 作用：根据 `git diff` 实际改动，生成符合 Conventional Commits 规范的中文单行提交信息。
- 用法：
  1. 对我说「提交代码 / 生成 git 的 msg / 提交说明」触发（「提交代码」为更常用的习惯说法）；
  2. 我会给出 **5 条候选单行 msg**，你回复编号选一条；
  3. 选定后我再让你选提交方式：**提交到暂存区** / **提交并推送** / **跳过**；
  4. 确认后才执行 `git commit`（及可能的 `git push`），不擅自写操作。
- 注意：若暂存区含 `.workbuddy/` 等工具目录，会先提醒你而非擅自处理。

### 2. `path-alias` — 配置路径别名
- 路径：`.workbuddy/skills/path-alias/SKILL.md`
- 作用：在 Vite + Vue + TS 项目中配置 `@/*` 路径别名（`src/` 映射），类型层（tsconfig `paths`）与运行时层（vite `resolve.alias`）同步。
- 用法：
  1. 对我说「配置路径别名 / 加 @ 别名 / 让 @ 指向 src」触发；
  2. 按 Skill 指引在 `tsconfig.app.json` 加 `paths`、在 `vite.config.ts` 加 `resolve.alias`；
  3. 用 `fileURLToPath(new URL('./src', import.meta.url))` 做 ESM 安全映射，跑 `pnpm build` 验证。
- 约定：TS 与 Vite 两处必须同步，导入统一用 `@/`。

### 3. `add-global-component` — 新增全局组件
- 路径：`.workbuddy/skills/add-global-component/SKILL.md`
- 作用：标准化「新增全局 Vue 组件」流程——输入 PascalCase 组件名，自动建 `src/components/<Name>/` 目录、生成可编译骨架（index.vue + types.ts）、在 `global-component.ts` 注册、在 `global-component.d.ts` 补 `GlobalComponents` 类型。
- 用法：
  1. 对我说「加个全局组件 XXX / 新增全局组件 / 创建全局组件 Xxx」触发；
  2. 我会校验组件名为 PascalCase、检查是否已存在（防覆盖），然后建目录 + 生成骨架；
  3. 自动在 `src/plugins/modules/global-component.ts` 追加 `app.component` 注册，并在 `src/types/global/global-component.d.ts` 的 `GlobalComponents` 接口补一条类型；
  4. 提示你跑 `pnpm build` 验证。
- 约定：目录固定 `src/components/<Name>/`，注册走手动 `app.component()`（不启用 `unplugin-vue-components` 的 dirs 扫描），对齐现有 SvgIcon 风格。

## 快速开始

```bash
pnpm install   # 安装依赖
pnpm dev       # 启动开发服务器
pnpm build     # 类型检查 + 生产构建
```

## 已落地的工程化约定

### 引导与状态管理
- 入口采用 `bootstrap()` 异步引导骨架（`src/main.ts`）：创建 `createApp(App)` → 注册 Pinia（`setupStore(app)`）→ `app.mount('#app')`。
- 状态管理 Pinia：`src/store/index.ts` 维护模块级单例 `createPinia()` + `setupStore(app)` 注册函数；统一用 `@/` 别名导入。

### 路径与样式
- 路径别名 `@/*` → `src/*`：`tsconfig.app.json` 的 `paths` 与 `vite.config.ts` 的 `resolve.alias` 双向同步，导入统一用 `@/`。
- 原子化样式 UnoCSS：`build/plugins/index.ts` 的 `setupVitePlugins()` 注册 `UnoCSS()`，`src/main.ts` 顶部引入 `virtual:uno.css`（置于 `index.scss` 之前）；根目录 `uno.config.ts` 配置 `presetWind3()` + `presetAttributify()` 及自定义 rules（`wh-/mtb-/mlr-/ptb-/plr-`）与 shortcuts（`wh-full/wh-screen/flex-center/clearFix`）。UnoCSS 的 preflight 仅含 `--un-*` 变量预设、无传统样式重置，与 `public/css/reset.css` 零冲突。
- 全局样式入口 `src/styles/index.scss` 由 `main.ts` 引入（当前留空）；基础重置 `public/css/reset.css` 通过 `index.html` 的 `<link>` 引入（不进 `index.scss`，避免加载时序靠后导致样式跳动/FOUC）。

### 自动导入
- API 自动导入 `unplugin-auto-import`（`imports: ['vue','pinia','vue-router']`，d.ts 落 `src/types/auto-generate/auto-import.d.ts`，`dirs: ['src/store/modules','src/hooks']`）。
- 组件自动导入 `unplugin-vue-components`（d.ts 落 `src/types/auto-generate/auto-components.d.ts`，`dirs: []` 暂未启用目录扫描；全局组件改用手动注册 + 手写类型声明，详见下节）。
- Vite 插件统一抽离到 `build/plugins/`：导出 `setupVitePlugins()` 在 `vite.config.ts` 的 `plugins` 调用，并纳入 `vue-tsc -b` 类型检查（见 `tsconfig.node.json` 的 `include`）。

### 全局组件与 SVG 图标
- SVG 图标：`build/plugins/svg-icons-plugin.ts` 接入 `vite-plugin-svg-icons-ng`（`iconDirs: src/assets/svg-icons`，`symbolId: 'icon-[name]'`）；该插件默认 `htmlMode: 'inline'`，构建/dev 自动把雪碧 sprite 注入 HTML，**无需** `import 'virtual:svg-icons/register'`。图标 `.svg` 放在 `src/assets/svg-icons/`，内部用 `fill="currentColor"` 以便受 `color` 控制。
- 全局组件 `SvgIcon`（`src/components/SvgIcon/`）：封装 `<svg class="svg-icon"><use :href="#icon-${name}"></use></svg>`，props `name`(必填) / `color`(默认 `currentColor`) / `size`(默认 `'1em'`，number 自动补 `px`)；配套 `types.ts` 的 `SvgIconProps`。模板中直接用 `<SvgIcon name="Lock" />` 即可，无需 import。
- 全局注册（手动，非自动扫描）：`src/plugins/index.ts` 的 `setupPlugins(app)` → `app.use(registerGlobalComponent)`；`src/plugins/modules/global-component.ts` 内 `app.component('SvgIcon', SvgIcon)`；`main.ts` 的 `bootstrap()` 在 `createApp` 之后、`setupStore` 之前调用 `setupPlugins(app)`。
- 类型声明：`src/types/global/global-component.d.ts` 扩展 `vue` 的 `GlobalComponents` 接口声明 `SvgIcon`（被 `tsconfig.app.json` 的 `src/**/*.ts` 覆盖），与 `auto-components.d.ts` 互补。
- 新增全局组件：使用项目级 Skill `add-global-component`（说「加个全局组件 XXX」触发），自动完成「建目录 + 生成骨架 + 注册 + 补类型」，详见「内置 SKILL」第 3 条。

### 构建期变量与工程配置
- 应用标题：根 `.env` 提供 `VITE_APP_TITLE`，`index.html` 用 Vite 原生 `<title>%VITE_APP_TITLE%</title>` 占位符注入（dev/build 自动替换）。
  - 注：此前自研的 HTML meta 注入插件已移除，`index.html` 仅保留 title 注入；如需 meta 注入优先走 Vite 原生（`.env` 加 `VITE_*` 变量即可被 `%VAR%` 命中），纯动态值（如构建时间戳）Vite 原生无法提供。
- 仓库根 `.gitattributes` 统一文本行尾为 `eol=lf`。
- `.gitignore` 已忽略自动生成的 `src/types/auto-generate/`。
