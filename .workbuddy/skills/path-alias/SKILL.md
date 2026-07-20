---
name: path-alias
description: 在 Vite + Vue + TypeScript 项目中配置 `@/*` 路径别名。同时修改 tsconfig 的 `compilerOptions.paths` 与 vite.config.ts 的 `resolve.alias` 保持双向同步，并附带 ESM 安全的绝对路径写法与构建验证步骤。当用户说"配置路径别名 / 加 @ 别名 / 让 @ 指向 src / 设置 @/*"时触发。
---

# path-alias · 配置路径别名

## 适用场景
- Vite（含 Vue / React / 纯 TS）项目，需要把 `@/` 映射到 `src/`，替代冗长的相对路径（如 `../../utils/xx` → `@/utils/xx`）。
- 典型触发语："配置路径别名"、"加个 @ 别名"、"让 @ 指向 src"、"设置 @/*"。

## 前置确认
1. 确认项目是 Vite + TS：`vite.config.ts` 存在、`tsconfig*.json` 存在。
2. 确认要映射的目录（默认 `src`）。若用户指定其它目录（如 `src/modules` → `@m`），按用户说的来。
3. **本项目习惯（来自用户约定）**：改文件 / 装依赖属于"落地"动作，需先给方案等用户确认，再动手。纯阅读分析可直接做。

## 实施步骤

### 步骤 1：改 tsconfig（类型层面）
找到真正 `include` 源码、且会在 `vue-tsc` / `tsc` 时被使用的那个 tsconfig（Vite Vue 模板里通常是 `tsconfig.app.json`；若项目是单一 `tsconfig.json`，就改它）。

在 `compilerOptions` 内增加：
```jsonc
"paths": {
  "@/*": ["./src/*"]
}
```
- 路径用相对写法 `"./src/*"`（相对于该 tsconfig 文件位置）即可，**无需**显式 `baseUrl`（TypeScript 4.1+ 支持 paths 不带 baseUrl）。
- 若项目 tsconfig 已存在 `paths`，在其内追加 `@/*` 条目即可，不要覆盖原有项。

### 步骤 2：改 vite.config.ts（运行时层面）
确保顶部已 import：
```ts
import { fileURLToPath } from 'node:url'
```
（若没有则加上；`node:url` 是 Node 内置模块，无需安装。）

在 `defineConfig({ ... })` 内增加 `resolve.alias`：
```ts
resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
  },
},
```
- 用 `fileURLToPath(new URL('./src', import.meta.url))` 而非 `path.resolve(__dirname, 'src')`：Vite 配置是 ESM，`__dirname` 不存在，后者会报错。
- `new URL('./src', import.meta.url)` 解析出 `file://` 绝对路径，`fileURLToPath` 转成普通绝对路径，跨平台安全。

### 步骤 3：验证（必须）
改完跑一次构建确认两边都能解析：
```bash
pnpm build        # 等价 vue-tsc -b && vite build
# 或仅类型检查：pnpm exec vue-tsc -b
```
- `vue-tsc -b` 通过 → 证明 `tsconfig` 的 `paths` 合法。
- `vite build` 通过 → 证明 `vite.config.ts` 的 `resolve.alias` 合法。
- 若想确认运行时真能解析 `@/`，可临时把某个 import 改成 `@/` 再 build，验证后还原（非必须，仅当怀疑时做）。

## 关键约定（务必同步）
- **TS 与 Vite 两处必须同步**：只改一边，会出现"类型能过但运行时找不到模块"或反之。
- **别名形式要对齐**：tsconfig 用 `"@/*"` 模式、vite 用 `'@'` 基名，二者对 `@/foo` 都解析到 `src/foo`，等价。不要一边写 `@` 一边写 `@/` 造成不一致。
- 导入统一用 `@/`（如 `import x from '@/utils/xx'`），不要混用相对路径。

## 注意
- 这是配置型改动，纯 JSON/TS 改动；`node:url` 为内置模块，一般**不需要**新增依赖。
- 注释风格（可选）：本项目偏好给每个 config 键加 `/** @description @note */` 注释，可按需补充，非强制。
- 该 Skill 为项目级，无法通过 Skill 工具按名直接加载，需按 SKILL.md 内容手动执行（与 `git-commit-msg` 同理）。
