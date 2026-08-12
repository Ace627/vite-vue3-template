<template>
  <!-- ProTable - 基于 Element Plus Table 的封装组件 支持动态列配置、自定义插槽、加载状态等功能 -->
  <el-table ref="proTableRef" v-bind="mergeProps($attrs, nativeTableProps)" v-loading="loading" :element-loading-text :element-loading-background>
    <!-- 遍历所有列配置，动态生成表格列 -->
    <template v-for="(column, index) in columns" :key="generateColumnKey(column, index)">
      <!-- 插槽列：当列配置了 slot 属性时，使用自定义插槽渲染内容 -->
      <el-table-column v-if="column.slot" v-bind="generateBindColumn(column)">
        <template #default="scope">
          <!-- 将当前行数据和列配置透传给父组件的插槽 -->
          <slot :name="column.slot" v-bind="scope"></slot>
        </template>
      </el-table-column>

      <!-- 常规列：没有配置 slot 时，直接渲染 prop 对应的数据 -->
      <el-table-column v-else v-bind="generateBindColumn(column)"></el-table-column>
    </template>

    <!-- 透传其他插槽：支持父组件传入任意插槽（如操作列、展开行等） -->
    <template v-for="(_, name) in forwardSlotNames" :key="name" #[name]="scope">
      <slot :name="name" v-bind="scope || {}"></slot>
    </template>
  </el-table>
</template>

<script setup lang="ts">
defineOptions({ name: 'ProTable', inheritAttrs: false })
import { mergeProps } from 'vue'
import type { TableInstance } from 'element-plus'
import type { ProTableColumn, ProTableProps } from './types'

// 接收组件属性，设置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
  highlightCurrentRow: true,
  elementLoadingText: '正在加载数据，请稍候...',
  elementLoadingBackground: 'rgba(0, 0, 0, 0.72)',
})

/**
 * 提取原生 Table 属性
 * 过滤掉 ProTable 特有的属性（columns、loading 等），只保留 Element Plus Table 原生支持的属性
 */
const nativeTableProps = computed(() => {
  const { columns, loading, elementLoadingText, elementLoadingBackground, ...tableProps } = props
  return tableProps
})

// 所有列配置里用到的 slot 名
const columnSlotNames = computed(() => props.columns.filter((column): column is ProTableColumn & { slot: string } => Boolean(column.slot)).map((column) => column.slot))
// 从父传入的全部插槽里，扣掉列插槽，剩下的就是表格级原生插槽
const slots = useSlots()
// 透传给 Table 的插槽名
const forwardSlotNames = computed(() => Object.keys(slots).filter((name) => !columnSlotNames.value.includes(name)))

// 存储 Table 实例的引用
const proTableRef = shallowRef<TableInstance>()

/**
 * 生成列的唯一标识
 * 优先级：type > prop > slot
 */
function generateColumnKey(column: ProTableColumn, index: number) {
  return column.type || column.prop || column.slot || `column-${index}`
}

/**
 * 过滤列配置中的非原生属性
 * 移除 slot 属性，只保留 Element Plus Table Column 原生支持的属性
 */
function generateBindColumn(column: ProTableColumn) {
  const { slot, ...nativeColumn } = column
  return nativeColumn
}

/**
 * 暴露 Table 实例方法
 * 使用 Proxy 代理，让父组件可以直接调用原生 Table 的所有方法（如 toggleRowSelection、clearSort 等）
 */
defineExpose<TableInstance>(
  new Proxy(
    {},
    {
      get(_target, key) {
        // 代理获取属性：转发到实际的 Table 实例
        return proTableRef.value?.[key as keyof TableInstance]
      },
      has(_target, key) {
        // 代理检查属性：判断属性是否存在于 Table 实例中
        return key in (proTableRef.value || {})
      },
    },
  ) as TableInstance,
)
</script>

<style lang="scss" scoped></style>
