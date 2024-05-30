<template>
  <svg class="svg-icon" aria-hidden :style="styles">
    <use :href="`#icon-${name}`" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
defineOptions({ name: 'SvgIcon' })
import { isString } from 'lodash-es'
import { type CSSProperties } from 'vue'

const props = defineProps({
  name: { type: String as PropType<SvgIconName>, required: true },
  /** Svg 的 fill 颜色 */
  color: { type: String, default: 'inherit' },
  /** Svg 图标的大小，size x size */
  size: { type: [String, Number], default: '1em' },
})

/** 动态计算需要绑定的行内样式 */
const styles = computed<CSSProperties>(() => ({
  width: isString(props.size) ? props.size : `${props.size}px`,
  height: isString(props.size) ? props.size : `${props.size}px`,
}))
</script>

<style scoped>
.svg-icon {
  cursor: pointer;
  display: inline-block;
  outline: none;
  /* 因 icon 大小被设置为和字体大小一致，而 span 等标签的下边缘会和字体的基线对齐，故需设置一个往下的偏移比例，来纠正视觉上的未对齐效果 */
  vertical-align: -0.15em;
  /* 定义元素的颜色，currentColor 是一个变量，其值就是当前元素的 color 值，如果当前元素未设置 color 值，则从父元素继承 */
  fill: currentColor;
  overflow: hidden;
}

.svg-icon ~ .svg-icon {
  margin-left: 8px;
}
</style>
