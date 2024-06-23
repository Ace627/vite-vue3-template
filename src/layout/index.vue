<template>
  <div class="app-container relative w-full" :class="classes">
    <button @click="handleRefresh">页面刷新</button>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' })

/** Layout 布局响应式 */
useResize()

/** 读取 Pinia 仓库 */
const appStore = useAppStore()
const router = useRouter()

/** 用来添加到根组件的动态类的集合 */
const classes = computed(() => [appStore.device])

function handleRefresh() {
  router.push(`/redirect/dashboard`)
}
</script>

<style lang="scss" scoped></style>
