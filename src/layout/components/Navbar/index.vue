<template>
  <nav class="navbar pl-8px">
    <!-- 应用 logo 及标题展示组件 -->
    <AppLogo />

    <div class="right-nav h-full ml-auto">
      <!-- 页面刷新控件 -->
      <div class="nav-item" @click="handleRefresh" title="刷新页面">
        <SvgIcon name="Refresh" :size="18" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineOptions({ name: 'Navbar' })
import { AppLogo } from '..'

const router = useRouter()

function handleRefresh() {
  router.push(`/redirect/dashboard`)
}

/** 组件挂载完成后执行的操作 */
async function handleMounted() {}

/** 组件实例被卸载之前执行的操作 */
async function handleUnmounted() {}

/** 注册一个回调函数，在组件挂载完成后执行 */
onMounted(handleMounted)
/** 注册一个回调函数，在组件实例被卸载之前调用 */
onUnmounted(handleUnmounted)
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--app-navbar-height);
  background-color: var(--app-navbar-bgc);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.nav-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 8px;
  transition: background-color 0.28s;
  &:hover {
    background-color: rgba(0, 21, 41, 0.08);
  }
}
</style>
