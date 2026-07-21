# vite-vue3-template

基于 `pnpm create vite`（Vue 3 + TypeScript）二次改造的**前端工程化模板**。

## 内置 SKILL（项目级）

本仓库在 `.workbuddy/skills/` 下内置了两个项目级 Skill，用于标准化常见工程操作。

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

## 快速开始

```bash
pnpm install   # 安装依赖
pnpm dev       # 启动开发服务器
pnpm build     # 类型检查 + 生产构建
```

## 已落地的工程化约定
- `index.html` 本地化（`lang="zh-CN"`），站点描述单一真源为 `package.json.description`，经 Vite 插件自动注入 `<meta name="description">`。
- `public/css/reset.css` 通过 `<head>` 的 `<link>` 引入（不走 `index.scss`，避免样式跳动）。
- 全局样式入口 `src/styles/index.scss` 由 `main.ts` 引入（当前留空）。
- 路径别名 `@/*` → `src/*`（tsconfig + vite 双向同步）。
- 仓库根 `.gitattributes` 统一文本行尾为 `eol=lf`。
- 入口采用 `bootstrap()` 异步引导骨架（`src/main.ts`）。
- 原子化样式 UnoCSS：已集成 `unocss`（devDependency），`vite.config.ts` 的 `plugins` 加入 `UnoCSS()`（`import UnoCSS from 'unocss/vite'`），`src/main.ts` 引入 `virtual:uno.css`，根目录 `uno.config.ts` 配置 `presetWind3()` + `presetAttributify()` 及自定义 rules（`wh-/mtb-/mlr-/ptb-/plr-`）与 shortcuts（`wh-full/wh-screen/flex-center/clearFix`）。UnoCSS 注入的 preflight 仅含 `--un-*` 变量预设、无传统样式重置，与 `public/css/reset.css` 零冲突。
