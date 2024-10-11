<template>
  <div class="ap-wrap-list">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ApWrapList' })
import { isString } from 'lodash-es'

const props = defineProps({
  /** 列表项间隔 */
  gap: { type: [String, Number], default: 16 },
  /** 列表项最小宽度 */
  minWidth: { type: [String, Number], default: 375 }
})

const gap = computed(() => (isString(props.gap) ? props.gap : `${props.gap}px`))
const minWidth = computed(() => (isString(props.minWidth) ? props.minWidth : `${props.minWidth}px`))
const repeat = computed(() => `repeat(auto-fill, minmax(${minWidth.value}, 1fr))`)
</script>

<style lang="scss" scoped>
.ap-wrap-list {
  display: grid;
  grid-template-columns: v-bind(repeat);
  gap: v-bind(gap);
}
</style>
