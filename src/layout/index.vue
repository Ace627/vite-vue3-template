<template>
  <el-watermark :content="watermarkContent" class="w-full min-h-full" :gap="[16, 16]" :font>
    <div class="app-container">
      <header>
        <Navbar />
      </header>

      <AppMain />
    </div>
  </el-watermark>
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' })
import Navbar from './components/Navbar/index.vue'
import AppMain from './components/AppMain/index.vue'

const settingStore = useSettingStore()
const { isDark } = useTheme()
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE
const font = computed(() => ({ color: isDark.value ? 'rgba(255, 255, 255, .15)' : 'rgba(0, 0, 0, .15)' }))
const watermarkContent = computed<string | string[]>(() => (settingStore.showWatermark ? VITE_APP_TITLE : []))
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
