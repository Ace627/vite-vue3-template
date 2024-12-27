<template>
  <nav class="navbar">
    <!-- 侧栏折叠控制 -->
    <Hamburger class="navbar-item" @toggleClick="appStore.toggleSidebar" />
  </nav>
</template>

<script setup lang="ts">
defineOptions({ name: 'Navbar' })
import Hamburger from './Hamburger.vue'

const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--ap-navbar-height);
  background-color: var(--ap-navbar-bg-color);
  box-shadow: var(--ap-navbar-box-shadow);
}

/* 菜单项的通用样式 */
.navbar-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 8px;
  transition: background-color var(--el-transition-duration-fast);
  &:hover {
    background-color: rgba(0, 21, 41, 0.08);
  }
}
</style>
