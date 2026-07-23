<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
defineOptions({ name: 'App' })
import zhCn from 'element-plus/es/locale/lang/zh-cn'

useResize()
useDynamicTitle()
</script>
