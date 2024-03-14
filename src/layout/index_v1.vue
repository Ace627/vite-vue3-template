<template>
  <div class="app-container wh-full">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' })
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
}
</style>
