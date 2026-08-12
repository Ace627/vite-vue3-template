<template>
  <h1 class="app-logo w-full">
    <transition name="sidebar-logo-fade">
      <!-- 侧栏展开状态 -->
      <router-link v-if="showTitle" key="expand" to="/" class="flex-center wh-full">
        <img src="/favicon.svg" alt="logo" draggable="false" />
        <span v-if="Boolean(title)">{{ title }}</span>
      </router-link>

      <!-- 侧栏折叠状态 -->
      <router-link v-else key="collapse" to="/" class="flex-center wh-full">
        <img src="/favicon.svg" alt="logo" draggable="false" />
        <span v-if="Boolean(title)">{{ title }}</span>
      </router-link>
    </transition>
  </h1>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppLogo' })
import type { AppLogoProps } from './types'

const props = withDefaults(defineProps<AppLogoProps>(), {
  showTitle: true,
  title: import.meta.env.VITE_APP_TITLE,
})
</script>

<style lang="scss" scoped>
.app-logo {
  --el-app-logo-size: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  height: var(--el-navbar-height);
  margin: 0;
  padding: 0;
  font-weight: 500;
  letter-spacing: 1px;
  color: inherit;
  background-color: inherit;
  white-space: nowrap;
  overflow: hidden;
  img {
    width: var(--el-app-logo-size);
    height: var(--el-app-logo-size);
  }
  span {
    font-size: 16px;
    margin-left: 4px;
  }
}
</style>
