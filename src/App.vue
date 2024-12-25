<template>
  <RouterView />
</template>

<script setup lang="ts">
defineOptions({ name: 'App' })

useResize()
useDynamicTitle()
</script>

<style lang="scss" scoped></style>
