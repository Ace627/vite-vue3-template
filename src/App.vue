<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
defineOptions({ name: 'App' })

useResize()
useDynamicTitle()
</script>
