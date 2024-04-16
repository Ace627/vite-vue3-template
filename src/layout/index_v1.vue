<template>
  <div class="app-container relative wh-full" :class="classes">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' })

/** Layout 布局响应式 */
useResize()

/** 读取 Pinia 仓库 */
const appStore = useApp()

/** 用来添加到根组件的动态类的集合 */
const classes = computed(() => {
  const cls: string[] = [appStore.device]
  return cls
})
</script>

<style lang="scss" scoped>
.app-container {
  padding: 16px;
}
</style>
