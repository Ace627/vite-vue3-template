<template>
  <div class="md-editor-container flex-1 overflow-hidden">
    <MdEditor v-bind="$attrs" :toolbarsExclude>
      <template v-for="(_, name) in $slots" #[name]="slotData" :key="name">
        <slot :name v-bind="slotData || {}"></slot>
      </template>
    </MdEditor>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Markdown', inheritAttrs: false })
import { isString } from 'lodash-es'
import 'md-editor-v3/lib/style.css'
import { MdEditor, type ToolbarNames } from 'md-editor-v3'

const props = defineProps({
  /** 编辑器的高度 默认为自动高度 */
  height: { type: [Number, String], default: 'auto' },
})

const height = computed(() => (isString(props.height) ? props.height : `${props.height}px`))

/** 选择性不展示工具栏，内容同上 */
const toolbarsExclude = ref<ToolbarNames[]>(['github'])

// 组件方法暂未暴露出去 如有需要 请自行定义 然后 defineExpose 出去即可
// 更多使用 https://imzbf.github.io/md-editor-v3/zh-CN
</script>

<style lang="scss" scoped>
.md-editor-container {
  height: v-bind(height);
}
:deep(.md-editor) {
  --md-color: #3f4a54;
  --md-bk-color: #fff;
  --md-hover-color: #000;
  --md-toolbar-icon-size: var(--el-component-size-small);
  height: 100%;
  em {
    font-style: italic;
  }
  strong {
    font-weight: bold;
  }
  svg.md-editor-icon {
    width: var(--md-toolbar-icon-size);
    height: var(--md-toolbar-icon-size);
  }
}
</style>
