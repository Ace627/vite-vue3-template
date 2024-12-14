<template>
  <div class="navbar">
    <div class="flex items-center cursor-pointer" @click="emits('changeView', 'Home')" title="返回首页">
      <img src="@/assets/images/logo.png" alt="logo" class="wh-32px mx-8px" srcset="" />
      <div class="fw-bold" v-if="appStore.isDesktop">{{ VITE_APP_TITLE }}</div>
    </div>

    <div class="right ml-auto h-full flex items-center"></div>

    <Screenfull :size="24" class="navbar-item" />

    <div class="navbar-item" @click="handleRefreshPage" title="刷新页面">
      <SvgIcon name="Refresh" :size="24" />
    </div>
    <div class="navbar-item" @click="hanleOpenURL('https://github.com/Ace627/vite-vue3-template')" title="仓库地址">
      <SvgIcon name="Github" :size="24" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Navbar' })
import { REDIRECT_PAGE_URL } from '@/router/router.constant'

/** 接收父组件传递的事件 */
const emits = defineEmits<{
  (event: 'changeView', name: string): void
}>()

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE

function hanleOpenURL(url: string) {
  window.open(url, '_blank')
}
function handleRefreshPage() {
  router.replace({ path: `${REDIRECT_PAGE_URL}` + route.path, query: route.query })
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--ap-navbar-height);
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

/* 菜单项的通用样式 */
.navbar-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 8px;
  transition: background-color var(--ap-transition-duration-fast);
}
.navbar-item.is-active,
.navbar-item:hover {
  color: var(--ap-color-primary);
  background-color: rgba(0, 21, 41, 0.08);
}
</style>
