---
name: add-global-component
description: 在 vite-vue3-template 项目中新增一个全局 Vue 组件：创建 src/components/<Name>/ 目录与可编译骨架文件（index.vue + types.ts），并自动在 global-component 插件与全局类型声明中注册。当用户说"加个全局组件 XXX"、"新增全局组件"、"创建全局组件 Xxx"、"注册全局组件 Xxx" 或显式调用本 Skill 时使用。
---

# 新增全局组件（add-global-component）

在项目中新增一个**全局可用**的 Vue 组件：生成目录与骨架文件，并自动完成插件注册与类型声明，省去手动改两处（plugin + d.ts）的重复劳动。

## 触发场景
- 用户说："加个全局组件 XXX" / "新增全局组件" / "创建全局组件 Xxx" / "注册全局组件 Xxx"
- 用户显式调用本 Skill，并给出一个 PascalCase 组件名

## 输入
- 一个 **PascalCase** 组件名（首字母大写、仅字母与数字），如 `GlobalDialog`、`ThemeSwitch`。

## 前置约定（本项目已定稿，切勿擅自改动）
- **目录**：`src/components/<Name>/`（维持现状，不挪到 `src/global-components` 等独立目录）
- **注册方式**：手动 `app.component()` 注册，**不启用** `unplugin-vue-components` 的 `dirs` 扫描（`registerAutoComponents` 的 `dirs` 保持 `[]`）
- **生成内容**：带**可编译骨架**（非纯空文件）
- 命名、`defineOptions({ name })`、`@/` 别名、中文注释均对齐现有 `SvgIcon` 组件

## 执行步骤

1. **校验组件名**：必须 PascalCase（首字母大写，其余仅字母与数字）。不符合 → 提示用户修正后重试，**不继续**。
2. **防覆盖检查**：若 `src/components/<Name>/` 已存在 → 中止并提示"组件 <Name> 已存在，未覆盖"，**不继续**。
3. **创建目录** `src/components/<Name>/`。
4. **生成 `src/components/<Name>/index.vue`**（骨架，见下方「骨架模板」）。模板根元素的 class 名用 kebab-case（如 `GlobalDialog` → `global-dialog`）。
5. **生成 `src/components/<Name>/types.ts`**（骨架，见下方「骨架模板」）。
6. **改 `src/plugins/modules/global-component.ts`**：
   - 在顶部 import 区追加：`import <Name> from '@/components/<Name>/index.vue'`
   - 在 `registerGlobalComponent` 函数体内、已有 `app.component(...)` 之后追加一行：`app.component('<Name>', <Name>)`
7. **改 `src/types/global/global-component.d.ts`**：在 `declare module 'vue'` 的 `GlobalComponents` 接口内追加一行：
   `<Name>: (typeof import('../components/<Name>/index.vue'))['default']`
   （注意相对路径 `../components/` 源自该 d.ts 位于 `src/types/global/`，不能写错）
8. **输出改动小结**（列明新建/修改了哪些文件），并提示用户运行 `pnpm build` 验证（`vue-tsc -b` 会校验类型、`vite build` 验证打包）。

## 骨架模板

**`index.vue`**：
```vue
<template>
  <div class="<name-kebab>">
    <!-- 业务内容 -->
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: '<Name>' })
import type { <Name>Props } from './types'

const props = defineProps<<Name>Props>()
</script>

<style lang="scss" scoped>
.<name-kebab> {
}
</style>
```

**`types.ts`**：
```ts
/**
 * <Name> 组件属性
 */
export interface <Name>Props {
  // 按需补充属性
}
```

## 约束
- 不自动 `git commit`；不改动与本次无关的其它文件。
- `types.ts` 的接口默认空，仅留注释引导用户按需补字段。
- 所有代码注释用中文；技术关键词（`app.component`、`defineOptions`、`PascalCase` 等）保留英文。

## 风险与注意
- `global-component.d.ts` 的相对路径 `../components/` 不能写错（它位于 `src/types/global/`）。
- 当前 `registerAutoComponents` 的 `dirs` 为 `[]`，手动注册安全；若将来把 `dirs` 设为 `src/components`，会与手动注册重复（Vue 仅警告），届时需重新评估本 Skill。

## 验证
- `pnpm build` 通过（`vue-tsc -b` 无类型报错、`vite build` 成功）。
- 在任意模板（如 `src/layout/index.vue`）用 `<Name />` 验证全局可用（无需 import）。
