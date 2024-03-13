<template>
  <el-image :src="src" alt="logo" :style="styles" fit="fill" />
</template>

<script setup lang="ts">
defineOptions({ name: 'Logo' })
const props = defineProps({
  size: { type: Number, default: 24 },
  /** 图片源地址，同原生属性一致 */
  src: { type: String, default: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg' },
})

const styles = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
}))
</script>

<style lang="scss" scoped></style>
