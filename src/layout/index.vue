<template>
  <div class="app-container">
    <header>
      <Navbar />
    </header>

    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' })
import Navbar from './components/Navbar/index.vue'
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
