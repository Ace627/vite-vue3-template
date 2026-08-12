# ProTable 组件

## 功能定位

`ProTable` 是基于 Element Plus `el-table` 的轻量封装，解决「列表页重复书写 `el-table` + `el-table-column` 模板」的问题。它不替代 `el-table` 的能力，而是把「列配置化、内容插槽化、原生能力全透传」收口为一个全局组件。

落地点：`src/components/ProTable/index.vue`（视图）+ `src/components/ProTable/types.ts`（类型），由 `src/plugins/modules/global-component.ts` 注册为全局组件，无需 `import` 即可在任意模板直接使用 `<ProTable>`。内部实现见源码；注册与类型声明机制见 `UI组件/全局组件注册.md`。

## 设计要点

### 1. 动态列 `columns`

通过 `columns` 配置数组声明列，每项 `ProTableColumn` 支持两种渲染方式：

- **常规列**：未配 `slot` 时，直接用 `prop` 渲染行数据对应字段；透传给 `el-table-column` 的原生属性（`label` / `width` / `fixed` / `sortable` 等）照常生效。
- **插槽列**：配置了 `slot` 时，在 `el-table-column` 内渲染 `#default` 插槽，父组件用同名插槽自定义内容（如操作列、状态标签）。

渲染前会剥离 `slot` 这一非原生属性，再 `v-bind` 给 `el-table-column`，避免把未知属性透传进底层组件。

### 2. 原生 props 与事件全透传

组件 `inheritAttrs: false`，通过 `mergeProps($attrs, nativeTableProps)` 把以下两类属性合并透传给 `el-table`：

- `nativeTableProps`：从 props 中剥离 ProTable 专有项（`columns` / `loading` / `elementLoadingText` / `elementLoadingBackground`）后剩余的 `el-table` 原生属性（如 `data` / `border` / `stripe` 等）。
- `$attrs`：父组件传入但未在 props 声明的属性，其中含 `onXxx` 事件监听器（如 `onRowClick` / `onSelectionChange`），随 `v-bind` 自动落到 `el-table`，**无需显式声明 `emits`**。

### 3. 表格级插槽透传

父组件传入的非列插槽（如 `append` / `empty`）会被动态转发到 `el-table` 对应具名插槽；列插槽（即 `columns` 里 `slot` 对应的插槽）已被识别并排除，避免重复渲染。

### 4. 加载状态 `v-loading`

内置 `el-table` 的 `v-loading` 支持，由 `loading` 控制显隐，`elementLoadingText` / `elementLoadingBackground` 可配置遮罩文案与背景（默认值见下方类型表）。

### 5. 实例方法代理（defineExpose）

通过 `defineExpose` 暴露一个 Proxy，把父组件对 `<ProTable>` ref 的访问转发到底层 `el-table` 实例。因此父组件可直接调用 `el-table` 的原生方法（如 `clearSelection` / `toggleRowExpansion` / `clearSort`），无需在 ProTable 上逐个再包一层。

## 类型 API

| 类型 | 说明 |
| --- | --- |
| `ProTableColumn<T>` | 列配置：`prop`（限为 `keyof T`，类型层防字段名手写错）+ `slot`（自定义插槽名），其余继承自 `TableColumnCtx` |
| `ProTableProps` | 继承 `el-table` 公共 props，新增 `columns`（必填）、`loading`、`elementLoadingText`（默认 `正在加载数据，请稍候...`）、`elementLoadingBackground`（默认 `rgba(0, 0, 0, 0.72)`） |

泛型 `<T>` 对应行数据类型，传入后 `prop` 会被约束为 `T` 的键名。

## 用法示例

最简用法（常规列）：

```vue
<ProTable :data="tableData" :columns="columns" v-loading="loading" />
```

```ts
const columns = [
  { prop: 'name', label: '名称', width: 160 },
  { prop: 'status', label: '状态' },
]
```

插槽列（自定义操作列）：

```vue
<ProTable :data="tableData" :columns="columns">
  <template #action="{ row }">
    <el-button type="primary" @click="onEdit(row)">编辑</el-button>
  </template>
</ProTable>
```

```ts
const columns = [
  { prop: 'name', label: '名称' },
  { slot: 'action', label: '操作', width: 120 },
]
```

调用底层实例方法：

```vue
<ProTable ref="tableRef" :data="tableData" :columns="columns" />
```

```ts
const tableRef = ref<InstanceType<typeof ProTable>>()
tableRef.value?.clearSelection()
```

## 注意事项

- **与 `ProPagination` 组合**：ProTable 不含分页，分页由业务层用 `ProPagination` 单独组合（见 `UI组件/全局组件注册.md`）。
- **default 插槽边界**：若父组件在 `<ProTable>` 标签体内直接写内容（被当作 default 插槽），会被转发到 `el-table` 的 default 插槽，可能与 `columns` 生成的列冲突；正常用法下请通过 `columns` 配置列、用具名插槽做自定义内容。
- **移动端**：当前 ProTable 未做移动端特殊处理（表格移动端适配复杂，按需另行扩展）；`ProPagination` 已内置 `isMobile` 适配。
- **图标规范**：ProTable 内部未引入任何自定义图标，loading 使用 `el-table` 原生 `v-loading`，不冲突 `AGENTS.md` 的图标统一约定。
