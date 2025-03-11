<template>
  <div class="app-content">
    <div>{{ VITE_APP_TITLE }}</div>
    <div>设备 DPI {{ getDeviceDpi() }}</div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Dashboard' })
import { getDeviceDpi } from '@/utils'

// 全局变量获取
const VITE_APP_TITLE = computed(() => __RUNTIME_CONFIG__.VITE_APP_TITLE)
</script>

<style lang="scss" scoped></style>
