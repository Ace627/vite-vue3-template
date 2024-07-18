<template>
  <i :class="classes" v-bind="$attrs"></i>
</template>

<script setup lang="ts">
defineOptions({ name: 'IconFont' })
import { isString } from 'lodash-es'

const props = defineProps({
  /** 图标名字 */
  name: { type: String, required: true },
  /** 图标大小 */
  size: { type: [Number, String], default: '1em' },
  /** 图标颜色 */
  color: { type: String, default: 'inherit' },
})

const classes = computed(() => `iconfont icon-${props.name}  `)

/** 减少 CSS 权重 便于修改 */
const iconColor = computed(() => props.color)
const iconSize = computed(() => (isString(props.size) ? props.size : `${props.size}px`))
</script>

<style scoped>
.iconfont {
  cursor: pointer;
  color: v-bind(iconColor);
  font-size: v-bind(iconSize);
  font-style: normal;
}
</style>
