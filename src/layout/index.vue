<template>
  <el-watermark :content="watermarkContent" class="w-full min-h-full" :gap="[16, 16]" :font :z-index="9999999">
    <div class="app-container" :class="classes">
      <!-- mobile 端侧边栏遮罩层 -->
      <div v-if="appStore.isMobile && !appStore.isCollapse" class="drawer-bg" @click="appStore.closeSidebar(true)"></div>

      <Sidebar class="sidebar-container" />

      <div class="main-container clearFix">
        <header class="fixed-header">
          <Navbar />
          <TagsView v-if="settingStore.showTagsView" />
        </header>

        <AppMain />
      </div>

      <!-- 应用配置自定义面板 -->
      <SettingPanel />
    </div>
  </el-watermark>
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' })
import Navbar from './components/Navbar/index.vue'
import AppMain from './components/AppMain/index.vue'
import Sidebar from './components/Sidebar/index.vue'
import TagsView from './components/TagsView/index.vue'
import SettingPanel from './components/SettingPanel/index.vue'

const appStore = useAppStore()
const settingStore = useSettingStore()

const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE
const font = computed(() => ({ color: settingStore.isDark ? 'rgba(255, 255, 255, .15)' : 'rgba(0, 0, 0, .15)' }))
const watermarkContent = computed<string | string[]>(() => (settingStore.showWatermark ? VITE_APP_TITLE : []))

const classes = computed(() => [
  appStore.device,
  { 'hide-sidebar': appStore.isCollapse },
  { 'open-sidebar': !appStore.isCollapse },
  { 'has-tags-view': settingStore.showTagsView },
  { withoutAnimation: appStore.withoutAnimation },
])
</script>

<style lang="scss" scoped>
.app-container {
  --el-drawer-bg-index: calc(var(--el-sidebar-index) - 1);
  --el-fixed-header-index: calc(var(--el-sidebar-index) - 2);
  position: relative;
  width: 100%;
  height: 100%;
}

/* 侧边栏区域容器 */
.sidebar-container {
  user-select: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--el-sidebar-index);
  width: var(--el-sidebar-width);
  height: 100%;
  color: var(--el-sidebar-text-color);
  background-color: var(--el-sidebar-bg-color);
  box-shadow: var(--el-sidebar-box-shadow);
  transition: width var(--el-transition-duration);
  overflow: hidden;
}

/* 主体内容区域容器 */
.main-container {
  position: relative;
  height: 100%;
  transition: margin-left var(--el-transition-duration);
  margin-left: var(--el-sidebar-width);
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: var(--el-fixed-header-index);
  width: calc(100% - var(--el-sidebar-width));
  transition: width var(--el-transition-duration);
}

/* 桌面模式 侧栏折叠 */
.hide-sidebar {
  .sidebar-container {
    width: var(--el-sidebar-hide-width);
  }
  .main-container {
    margin-left: var(--el-sidebar-hide-width);
  }
  .fixed-header {
    width: calc(100% - var(--el-sidebar-hide-width));
  }
}

/* 移动端 侧边栏展开 */
.mobile {
  .main-container {
    margin-left: 0;
  }
  .fixed-header {
    width: 100%;
  }
}

/* 移动端 侧边栏折叠 */
.mobile.hide-sidebar .sidebar-container {
  width: 0;
  pointer-events: none;
}

/* 移动端用来关闭左侧边栏抽屉的背景遮罩层 */
.drawer-bg {
  position: absolute;
  left: 0;
  top: 0;
  z-index: var(--el-drawer-bg-index); // 比 sidebar 低
  width: 100%;
  height: 100%;
  background-color: var(--el-overlay-color-lighter);
  overflow: hidden;
}

/* 移除侧栏和主容器的过渡效果 */
.withoutAnimation .sidebar-container,
.withoutAnimation .main-container {
  transition: none;
}
</style>
