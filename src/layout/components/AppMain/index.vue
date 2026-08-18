<template>
  <main class="app-main">
    <!-- key 采用 route.path 和 route.fullPath 有着不同的效果，大多数时候 path 更通用 -->
    <RouterView v-slot="{ Component, route }">
      <Transition :name="settingStore.transition" mode="out-in">
        <KeepAlive :include="tagsViewStore.cachedViews">
          <component :is="Component" :key="route.path" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </main>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppMain' })

const settingStore = useSettingStore()
const tagsViewStore = useTagsViewStore()
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  width: 100%;
  min-height: calc(100vh - var(--el-navbar-height));
  overflow: hidden;
}

.fixed-header + .app-main {
  height: calc(100vh - var(--el-navbar-height));
  min-height: 0px;
  margin-top: var(--el-navbar-height);
  overflow-y: auto;
  scrollbar-gutter: auto;
}

.has-tags-view .fixed-header + .app-main {
  height: calc(100vh - var(--el-navbar-height) - var(--el-tags-view-height));
  margin-top: calc(var(--el-navbar-height) + var(--el-tags-view-height));
}
</style>
