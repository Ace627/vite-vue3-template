<template>
  <div class="app-container" :class="classes">
    <p>当前设备类型： {{ appStore.device }}</p>
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
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
