<template>
  <div class="app-container">
    <header class="fixed-header">
      <Navbar @changeView="changeView" />
    </header>

    <div class="main-container">
      <Home v-if="componentName === 'Home'" @changeView="changeView" />
      <TaiChi v-else-if="componentName === 'TaiChi'" />
      <Editor v-else-if="componentName === 'Editor'" />
      <MdEditor v-else-if="componentName === 'MdEditor'" />
      <IconView v-else-if="componentName === 'IconView'" />
      <WrapList v-else-if="componentName === 'WrapList'" />
      <Download v-else-if="componentName === 'Download'" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Dashboard' })
import Home from './components/Home/index.vue'
import Navbar from './components/Navbar/index.vue'
import TaiChi from './components/TaiChi/index.vue'
import Editor from './components/Editor/index.vue'
import MdEditor from './components/MdEditor/index.vue'
import IconView from './components/IconView/index.vue'
import WrapList from './components/WrapList/index.vue'
import Download from './components/Download/index.vue'
import { CacheService } from '@/utils/cache/cache.service'

const componentName = ref<string>()

function changeView(name: string) {
  componentName.value = name
  CacheService.local.set('ACYIVE_VIEW', name)
}

componentName.value = CacheService.local.get('ACYIVE_VIEW') ?? 'Home'
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
}

.main-container {
  height: 100%;
  padding-top: var(--ap-navbar-height);
  overflow-x: hidden;
}
</style>
