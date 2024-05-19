<template>
  <div class="iframe-container">
    <iframe v-bind="$attrs" :src frameborder="no" scrolling="auto" class="block wh-full"></iframe>
  </div>
</template>

<script setup lang="ts">
/** 禁止组件的根元素继承特性 inheritAttrs: false */
defineOptions({ name: 'InnerLink', inheritAttrs: false })
import { isString } from 'lodash-es'

/** 接收父组件传递的属性 */
const props = defineProps({
  /** 规定要嵌入到 iframe 中的文档的地址 */
  src: { type: String, required: true },
  /** 规定 iframe 的名称 */
  name: { type: String, default: '' },
  /** iframe 容器的宽度 */
  width: { type: [String, Number], default: '100%' },
  /** iframe 容器的高度 */
  height: { type: [String, Number], default: '100vh' },
})

const iframeContainerWidth = computed(() => (isString(props.width) ? props.width : `${props.width}px`))
const iframeContainerHeight = computed(() => (isString(props.height) ? props.height : `${props.height}px`))
</script>

<style lang="scss" scoped>
.iframe-container {
  width: v-bind(iframeContainerWidth);
  height: v-bind(iframeContainerHeight);
}
</style>
