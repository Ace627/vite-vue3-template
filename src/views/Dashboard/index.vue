<template>
  <div class="app-content">
    <p v-for="(item, index) in 200" :key="index" text="#212121 20px">{{ item }} 首页</p>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Dashboard' })
</script>

<style lang="scss" scoped>
a {
  display: block;
}
</style>
