<template>
  <div class="app-container">
    <header class="fixed-header">
      <div class="navbar">
        <div class="flex items-center cursor-pointer" @click="componentName = 'Home'" title="返回首页">
          <img src="../../assets/images/logo.png" alt="logo" class="wh-32px mx-8px" srcset="" />
          <div class="fw-bold" v-if="appStore.isDesktop">{{ VITE_APP_TITLE }}</div>
        </div>

        <div class="right ml-auto h-full">
          <div class="navbar-item" :class="{ 'is-active': componentName === 'IconView' }" @click="changeView('IconView')">图标</div>
        </div>
      </div>
    </header>

    <div class="main-container">
      <Home v-if="componentName === 'Home'" v-model="componentName" />
      <TaiChi v-else-if="componentName === 'TaiChi'" />
      <Editor v-else-if="componentName === 'Editor'" />
      <MdEditor v-else-if="componentName === 'MdEditor'" />
      <IconView v-else-if="componentName === 'IconView'" />
      <WrapList v-else-if="componentName === 'WrapList'" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Dashboard' })
import Home from './components/Home/index.vue'
import TaiChi from './components/TaiChi/index.vue'
import Editor from './components/Editor/index.vue'
import MdEditor from './components/MdEditor/index.vue'
import IconView from './components/IconView/index.vue'
import WrapList from './components/WrapList/index.vue'

const appStore = useAppStore()
const componentName = ref<string>('Home')
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE

function changeView(name: string) {
  componentName.value = name
}
</script>

<style lang="scss" scoped>
.app-container {
  --ap-navbar-height: 50px;
  --ap-transition-duration-fast: 0.3s;
  position: relative;
  width: 100%;
  height: 100%;
}

.fixed-header {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 9;
  width: 100%;
  .navbar {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--ap-navbar-height);
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
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
  }
}

.main-container {
  height: 100%;
  padding-top: var(--ap-navbar-height);
  overflow-x: hidden;
}
</style>
