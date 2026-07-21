<template>
  <svg class="svg-icon" :style="styles" aria-hidden="true" focusable="false">
    <use :href="`#icon-${name}`"></use>
  </svg>
</template>

<script setup lang="ts">
defineOptions({ name: 'SvgIcon' })
import { isString } from '@/utils'
import type { CSSProperties } from 'vue'

import type { SvgIconProps } from './types'

const props = withDefaults(defineProps<SvgIconProps>(), {
  color: 'currentColor',
  size: '1em',
})

/** 动态计算需要绑定的行内样式 */
const styles = computed<CSSProperties>(() => ({
  width: isString(props.size) ? props.size : `${props.size}px`,
  height: isString(props.size) ? props.size : `${props.size}px`,
  color: props.color,
}))
</script>

<style lang="scss" scoped>
.svg-icon {
  display: inline-block;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  outline: none;
}
</style>
