<template>
  <div>
    <p v-for="(item, index) in 999" :key="index">{{ index + 1 }}、Dashboard</p>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Dashboard' })
</script>

<style lang="scss" scoped></style>
