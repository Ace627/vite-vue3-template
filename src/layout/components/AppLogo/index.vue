<template>
  <div class="flex-center overflow-hidden h-[--app-navbar-height]">
    <transition name="app-logo-fade">
      <!-- 侧栏展开状态 -->
      <router-link v-if="isShowTitle" key="expand" to="/" class="flex-center wh-full">
        <img v-if="logoImg" :src="logoImg" class="wh-32px" alt="logo" draggable="false" />
        <h1 class="app-logo-text">{{ VITE_APP_TITLE }}</h1>
      </router-link>

      <!-- 侧栏折叠状态 -->
      <router-link v-else key="collapse" to="/" class="flex-center wh-full">
        <img v-if="logoImg" :src="logoImg" class="wh-32px" draggable="false" />
        <h1 v-else class="app-logo-text">{{ VITE_APP_TITLE }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppLogo' })
import logoImg from '@/assets/images/logo.png'

const appStore = useAppStore()
const { VITE_APP_TITLE } = useEnv()

/** 是否显示应用标题 */
const isShowTitle = computed(() => appStore.isDesktop)
</script>

<style lang="scss" scoped>
.app-logo-text {
  white-space: nowrap;
  font-weight: bold;
  font-size: 18px;
  color: #262626;
}
</style>
