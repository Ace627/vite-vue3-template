<template>
  <div class="app-container relative w-full clearFix" :class="classes">
    <header :class="{ 'fixed-header': settingStore.fixedHeader }">
      <Navbar />
    </header>

    <div class="main-container">
      <AppMain />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' })
import { Navbar, AppMain } from './components'

/** Layout 布局响应式 */
useResize()

/** 读取 Pinia 仓库 */
const appStore = useAppStore()
const settingStore = useSettingStore()

/** 用来添加到根组件的动态类的集合 */
const classes = computed(() => [appStore.device])
</script>

<style lang="scss" scoped>
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 100%;
}

.fixed-header + .main-container {
  max-height: calc(100vh - var(--app-header-height));
  margin-top: var(--app-header-height);
  overflow: auto;
}
</style>
