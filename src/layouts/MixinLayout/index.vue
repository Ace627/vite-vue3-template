<template>
  <el-container class="w-full h-screen">
    <el-header class="layout-mix-header flex items-center justify-between">
      <div class="flex items-center">
        <Logo />
        <Title title="后台管理" />
      </div>
      <div>右侧</div>
    </el-header>

    <el-container class="layout-mix--container">
      <el-aside>Aside</el-aside>
      <el-main>
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
defineOptions({ name: 'MixinLayout' })
import { Logo, Title } from '../common'
</script>

<style lang="scss" scoped>
.layout-mix-header {
  height: var(--navbar-height);
  background-color: #ccc;
}

.layout-mix--container {
  height: calc(100vh - var(--navbar-height));
}

.el-aside {
  width: var(--sidebar-width);
  color: var(--sidebar-menu-text-color);
  background-color: var(--sidebar-menu-bg-color);
}

.el-main {
  background-color: lightpink;
}
</style>
