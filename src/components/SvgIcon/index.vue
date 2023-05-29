<template>
  <svg class="svg-icon" aria-hidden :style="`width: ${size}; height: ${size};`">
    <use :href="`#icon-${name}`" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  name: { type: String, required: true },
  color: { type: String, default: '' },
  size: { type: String, default: '1em' },
})
</script>

<style lang="scss" scoped>
.svg-icon {
  display: inline-block;
  outline: none;
  width: 1em;
  height: 1em;
  /* 因 icon 大小被设置为和字体大小一致，而 span 等标签的下边缘会和字体的基线对齐，故需设置一个往下的偏移比例，来纠正视觉上的未对齐效果 */
  vertical-align: -0.15em;
  /* 定义元素的颜色，currentColor 是一个变量，其值就是当前元素的 color 值，如果当前元素未设置 color 值，则从父元素继承 */
  fill: currentColor;
  overflow: hidden;
}
</style>
