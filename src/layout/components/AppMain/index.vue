<template>
  <main class="app-main">
    <!-- key 采用 route.path 和 route.fullPath 有着不同的效果，大多数时候 path 更通用 -->
    <RouterView v-slot="{ Component, route }">
      <Transition :name="settingStore.transition" mode="out-in">
        <KeepAlive :include="[]">
          <component :is="Component" :key="route.path" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </main>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppMain' })

const settingStore = useSettingStore()
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  width: 100%;
  overflow: hidden;
}
</style>
