<template>
  <div class="app-container">
    布局测试
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' })
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
