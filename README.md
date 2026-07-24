# vite-vue3-template

> 一份**可展示的前端工程化实践样本**：用 Vue 3 + TypeScript + Vite 的最小骨架，把常见工程化手段逐项落地、跑通、并讲清理由。

本项目不是业务应用，而是一份把前端工程化配置**逐项落地、可运行、可解释**的实践样本。目标：用最小可运行的骨架，把"该有的工程化配置"都真实配一遍——每一项都能在代码里看到实现、在文档里读到「为什么这么配、带来了什么收益」。它既能作为新项目的工程化起步骨架，也能作为工程化能力的**可验证样本**：配置真实可用、决策有依据、收益可量化，适合用于技术分享、团队复盘或能力佐证。

## 这份样本展示了什么

| 能力域 | 落地的工程化手段 |
| --- | --- |
| 构建与产物优化 | vendor chunk 分包 / gzip 预压缩 / 构建期剔除 console·debugger / Vite 插件抽离 |
| 类型与代码质量 | 严格 TypeScript / oxfmt 统一格式化 / 脚手架清理 |
| 开发体验 | 路径别名 `@/*` / unplugin 自动导入 / 反向代理 / 多环境 `.env` |
| 状态与路由 | Pinia / vue-router 三层结构 + 登录态守卫 / 模拟登录登出 |
| 请求层 | axios 统一实例 + 三拦截器 + `ApiResponse<T>` 契约 |
| 样式与 UI | UnoCSS / 样式分层 / SVG 图标 / Element Plus 按需 + sass 主题 / 主题切换（亮↔暗） |
| 首屏体验 | 首屏加载动画（白屏兜底） |
| 工程化沉淀 | 3 个项目级 Skill（git-commit-msg / path-alias / add-global-component） |

> 每一项配置的「为什么」与「带来的好处」都在 [`docs/前端工程化.md`](./docs/前端工程化.md) 逐条展开。

## 它适合用来做什么

- 作为新项目的**工程化起步骨架**：clone 后按需删改即可。
- 作为**前端工程化能力展示 / 复盘**的样本：每一项配置都能在代码与文档里对照查看、可直接讲解。
- 作为 AI 协作的**约束样本**：`AGENTS.md` 里固化了本项目的 AI 代码约束。

## 它不适合做什么

- 直接当成一个带业务功能的成品应用（这里没有真实业务页面，只有登录/仪表盘等占位与模拟流程）。
- 当成 Element Plus / 某 UI 库的"全家桶 demo"（组件库是按需接入、仅验证了换肤与基础用法）。

## 快速开始

```bash
pnpm install   # 安装依赖
pnpm dev       # 启动开发服务器
pnpm build     # 类型检查 + 生产构建（vue-tsc -b && vite build）
pnpm format    # 用 oxfmt 统一格式化
```

> 注：本机若 `pnpm` 不可用，可直接用 `node node_modules/vite/bin/vite.js` 等本地二进制跑构建。

## 延伸阅读（真正的细节在这两处）

| 文档 | 内容 |
| --- | --- |
| [`docs/前端工程化.md`](./docs/前端工程化.md) | 已落地的工程化配置逐条说明 + 每条带来的好处（构建分包 / gzip 预压缩 / 严格 TS / 自动导入 / SVG 图标 / Element Plus 按需 + sass 主题 / 主题切换 / 首屏 loading 等）。**想了解"配了什么、为什么"，看这里。** |
| [`AGENTS.md`](./AGENTS.md) | AI 在本项目生成代码时必须遵守的约束（图标统一 `SvgIcon`、Element Plus 组件用插槽塞 `SvgIcon`、复用 `src/utils` 并统一从 `@/utils` 导入等）。**AI 协作 / Review AI 产出时以此为准。** |

## 项目级 Skill

`.workbuddy/skills/` 下内置了 `git-commit-msg` / `path-alias` / `add-global-component` 三个项目级 Skill，把「提交规范」「别名配置」「新增全局组件」等固定流程沉淀为可复用步骤。详见 [`docs/前端工程化.md`](./docs/前端工程化.md) 对应章节。

---

_本仓库随工程化推进持续更新；配置细节与决策记录以 `docs/前端工程化.md` 与项目记忆（`.workbuddy/memory/`）为准。_
