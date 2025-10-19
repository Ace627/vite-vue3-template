<template>
  <RouterView />
</template>

<script setup lang="ts">
defineOptions({ name: 'App' })

useResize()
useDynamicTitle()

const getterStore = useGetterStore()

console.log(getterStore.isMobile)
console.log(getterStore.isDesktop)
</script>

<style lang="scss" scoped></style>
