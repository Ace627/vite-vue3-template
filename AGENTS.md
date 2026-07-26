# AI 代码约束

本文件约定 **AI 在本项目生成 / 修改代码时必须遵守** 的规则。所有 AI 协作（含自动补全、批量生成、重构）以此为准，业务同学 Review AI 产出时也按此核对。

## 0. 项目边界（硬约束）
- **纯前端工程化实践，不涉及后端**：禁止生成对接后端、真实登录、真实权限（roles / 动态路由接真接口）、真实数据库的代码；登录 / 权限 / 数据一律以 mock 演示。

## 1. 图标统一使用 SvgIcon 组件
- 所有图标必须用项目内置的 `<SvgIcon>` 组件渲染。
- **禁止**：引入 Element Plus 图标（`@element-plus/icons-vue`）、内联裸 `<svg>`、使图标字体（iconfont）或任何第三方图标库（如 `@ant-design/icons`、`lucide` 等）。
- 用法：图标名 = `src/assets/svg-icons/` 下清理后的文件名（不含 `.svg`）。
  ```vue
  <SvgIcon name="close" />          <!-- 对应 src/assets/svg-icons/close.svg -->
  <SvgIcon name="search" :size="16" />
  ```
- `color` 默认 `currentColor`（继承文字色，随主题变化），`size` 默认 `1em`；需要固定色/尺寸时显式传 `color` / `size`。
- 新增图标流程：把 svg 放入 `src/assets/svg-icons/` → 跑 `pnpm clean:svg`（`scripts/svg-clean.ts` 去冗余属性、适配 `fill:currentColor`）→ 即可按文件名引用。

## 2. Element Plus 组件尽量通过插槽使用 SvgIcon
- 用到 Element Plus 组件的图标位时（如 `<el-button>` 内容区、`<el-icon>` 插槽、`<el-input>` 的 `prefix` / `suffix` 插槽、`<el-tree>` / `el-table` 自定义列等），**优先把 `<SvgIcon>` 放进其插槽**，而不是用 EP 自带图标组件或图标字体。
- 示例：
  ```vue
  <el-button type="primary">
    <SvgIcon name="search" />
    <span>搜索</span>
  </el-button>

  <el-input>
    <template #prefix>
      <SvgIcon name="user" />
    </template>
  </el-input>
  ```
- 若某 EP 组件仅支持字符串 `icon` 属性（非插槽），评估改为支持插槽的写法；核心原则保持一致：**图标单一来源 = SvgIcon**。

## 3. 复用 `src/utils` 已有方法，缺失则提醒用户补充并导出
- 需要工具方法时，**先查 `src/utils`**（含子目录 `request/`、`cache/` 等）是否已有实现；已有则直接复用，**禁止**在组件 / 业务模块里重复造轮子或内联重写一遍。
- `src/utils/index.ts` 是**统一导出文件（barrel）**，`@/utils` 是唯一入口。导入一律写：
  ```ts
  import { TipModal, setAccessToken, validateXxx } from '@/utils'
  ```
  不要从子路径（如 `@/utils/cache/token.cache`）散装 import，也不要绕开 barrel 自己再建一层导出。
- 若所需方法在 `utils` 中**不存在**：
  - **不要擅自在别处新建一份**实现；
  - 而是**提醒用户**：补充对应方法，并在 `src/utils/index.ts` 用 `export * from './xxx'` 或显式 re-export 暴露后，再统一从 `@/utils` 引入使用；
  - 若本次确需落地该方法，把它加到 `utils` 下合适的文件，同步在 `index.ts` 补导出，并明确告知用户「已新增 XXX 方法并导出」。

---

> 关联约定详见 `docs/前端工程化.md`（「样式与 UI」章节：UnoCSS / SVG 图标 / Element Plus 按需）与 `.workbuddy/memory/MEMORY.md`。
