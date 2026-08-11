<template>
  <div class="pagination-container" :class="`align-${align}`">
    <el-pagination
      v-bind="$attrs"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :background="background"
      :pager-count="pagerCount"
      :page-sizes="pageSizeList"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ProPagination', inheritAttrs: false })

const props = defineProps({
  /** 总条目数 */
  total: { type: Number, required: true },
  /** 每页显示个数选择器的选项设置 */
  pageSizeList: { type: Array as PropType<number[]>, default: [10, 20, 30, 40, 50] },
  /** 组件布局，子组件名用逗号分隔 */
  layout: { type: String, default: 'total, sizes, prev, pager, next, jumper' },
  /** 是否为分页按钮添加背景色 */
  background: { type: Boolean, default: true },
  /** 移动端页码按钮的数量端默认值 5 */
  pagerCount: { type: Number, default: 7 },
  /** 分页组件 左 中 右 */
  align: { type: String as PropType<'left' | 'center' | 'right'>, default: 'right' },
})

/** 接收父组件传递的事件 */
const emits = defineEmits(['pagination'])

const appStore = useAppStore()

const layout = computed(() => (appStore.isMobile ? `total, prev, jumper, next` : props.layout))

const pagerCount = computed(() => (appStore.isMobile ? 5 : props.pagerCount))

const currentPage = defineModel<number>('current-page', { default: 1 })

const pageSize = defineModel<number>('page-size', { default: 10 })

/** 处理当前页码数改变的操作 */
function handleCurrentChange() {
  emits('pagination')
}

/** page-size 改变时触发 */
function handleSizeChange(value: number) {
  if (currentPage.value * value > props.total) currentPage.value = Math.max(1, Math.ceil(props.total / value))
  emits('pagination')
}
</script>

<style lang="scss" scoped>
.pagination-container {
  display: flex;
  align-items: center;
  margin-top: 16px;
}
.align-left {
  justify-content: flex-start;
}
.align-center {
  justify-content: center;
}
.align-right {
  justify-content: flex-end;
}
</style>
