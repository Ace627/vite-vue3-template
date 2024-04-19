<template>
  <div class="iframe-container wh-full">
    <iframe v-bind="$attrs" :src frameborder="no" scrolling="auto" class="block wh-full"></iframe>
  </div>
</template>

<script setup lang="ts">
/** 禁止组件的根元素继承特性 inheritAttrs: false */
defineOptions({ name: 'IFrame', inheritAttrs: false })

/** 接收父组件传递的属性 */
const props = defineProps({
  /** 规定要嵌入到 iframe 中的文档的地址 */
  src: { type: String, required: true },
  /** 规定 iframe 的名称 */
  name: { type: String, default: '' },
})
</script>

<style lang="scss" scoped></style>
