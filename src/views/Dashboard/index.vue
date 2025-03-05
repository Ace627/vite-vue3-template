<template>
  <div class="app-content">首页</div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Dashboard' })

// 全局变量获取
const VITE_APP_TITLE = __RUNTIME_CONFIG__.VITE_APP_TITLE
console.log('__RUNTIME_CONFIG__: ', __RUNTIME_CONFIG__)
console.log('VITE_APP_TITLE: ', VITE_APP_TITLE) // Vue3 Common Template
</script>

<style lang="scss" scoped></style>
