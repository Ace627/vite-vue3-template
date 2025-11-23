<template>
  <h1 class="app-logo">
    <transition name="sidebar-logo-fade">
      <!-- 侧栏展开状态 -->
      <router-link v-if="isShowTitle" key="expand" to="/" class="flex-center wh-full">
        <img v-if="logoImg" :src="logoImg" class="wh-32px" alt="logo" draggable="false" />
        <h1 class="app-logo-text" v-if="isShowTitle">{{ VITE_APP_TITLE }}</h1>
      </router-link>

      <!-- 侧栏折叠状态 -->
      <router-link v-else key="collapse" to="/" class="flex-center wh-full">
        <img v-if="logoImg" :src="logoImg" class="wh-32px" draggable="false" />
        <h1 v-else class="app-logo-text" v-if="isShowTitle">{{ VITE_APP_TITLE }}</h1>
      </router-link>
    </transition>
  </h1>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppLogo' })
import logoImg from '@/assets/images/logo.png'

const appStore = useAppStore()
const VITE_APP_TITLE = __RUNTIME_CONFIG__.VITE_APP_TITLE

/** 是否显示应用标题 */
const isShowTitle = computed(() => !appStore.isCollapse)
</script>

<style lang="scss" scoped>
.app-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--lx-navbar-height);
  margin: 0;
  padding: 0;
  font-weight: 500;
  letter-spacing: 1px;
  color: inherit;
  background-color: inherit;
  white-space: nowrap;
  overflow: hidden;
}
</style>
