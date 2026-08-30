# vite-vue3-template

> Vue 3 + TypeScript + Vite 脚手架，把常见的工程化手段都配了一遍，而且跑得起来、说得清为什么这么配。

这个项目用最小可用的骨架，把前端工程化里「该有的配置」一项项真实落了地。每一项你都能在代码里找到实现，在 `docs/前端工程化.md` 里读到当时为什么这么选——有依据，不是拍脑袋写的。可以拿它当新项目的起步骨架，也能用来做技术分享或团队复盘。

## 这份样本展示了什么

| 能力域 | 落地的工程化手段 |
| --- | --- |
| 构建与产物优化 | vendor chunk 分包 / gzip 预压缩 / 构建期剔除 console·debugger / Vite 插件抽离 |
| 类型与代码质量 | 严格 TypeScript / Prettier 统一格式化 / 脚手架清理 |
| 开发体验 | 路径别名 `@/*` / unplugin 自动导入 / 反向代理 / 多环境 `.env` |
| 状态与路由 | Pinia / vue-router 三层结构 + 登录态守卫 / 模拟登录登出 |
| 请求层 | axios 统一实例 + 三拦截器 + `ApiResponse<T>` 契约 |
| 样式与 UI | UnoCSS / 样式分层 / SVG 图标 / Element Plus 按需 + sass 主题 / 主题切换（亮↔暗，View Transitions 圆形扩散）/ 设置页 / 全局水印 / 移动端适配 |
| 首屏体验 | 首屏加载动画（白屏兜底） |
| 工程化沉淀 | 3 个项目级 Skill（add-global-component / iterate-docs / path-alias） |

> 上面每一项「为什么这么配、带来什么好处」，都在 [`docs/前端工程化.md`](./docs/前端工程化.md) 里。

## 适合做什么

- **当新项目的起步骨架**：clone 下来按需删改就行。
- **当工程化讲解 / 复盘的样本**：每项配置都能在代码和文档里对照着讲。
- **当 AI 协作的约束样本**：`AGENTS.md` 里写死了生成代码必须遵守的规则。

## 不适合做什么

- 当成一个带业务功能的成品应用（这里没有真实业务页面，只有登录、仪表盘这类占位和模拟流程）。
- 当成 Element Plus 的「全家桶 demo」（组件库是按需接入的，只验证了换肤和基础用法）。

## 快速开始

```bash
pnpm install   # 安装依赖
pnpm dev       # 启动开发服务器
pnpm build     # 类型检查 + 生产构建（vue-tsc -b && vite build）
pnpm format    # 用 Prettier 统一格式化
```

> 如果本机 pnpm 用不了，也能直接跑本地二进制，比如 `node node_modules/vite/bin/vite.js`。

## 想看细节，看这两处

| 文档 | 内容 |
| --- | --- |
| [`docs/前端工程化.md`](./docs/前端工程化.md) | 已落地的工程化配置逐条说明，以及每条带来的好处（构建分包、gzip 预压缩、严格 TS、自动导入、SVG 图标、Element Plus 按需 + sass 主题、主题切换、首屏 loading 等）。想知道「配了什么、为什么」，看这里。 |
| [`AGENTS.md`](./AGENTS.md) | AI 在本项目生成代码时必须遵守的约束（图标统一 `SvgIcon`、Element Plus 组件用插槽塞 `SvgIcon`、复用 `src/utils` 并统一从 `@/utils` 导入等）。AI 协作或 Review AI 产出时以此为准。 |

## 项目级 Skill

`.workbuddy/skills/` 下内置了三个项目级 Skill：`add-global-component`（新增全局组件）、`path-alias`（路径别名）、`iterate-docs`（文档随代码同步），把固定流程沉淀成了可复用的步骤。具体看 [`docs/前端工程化.md`](./docs/前端工程化.md) 对应章节。

---

_本仓库会跟着工程化进度持续更新；具体的配置细节和决策记录以 `docs/前端工程化.md` 和项目记忆（`.workbuddy/memory/`）为准。_
