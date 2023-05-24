<template>
  <svg :style="{ width: `${size}px`, height: `${size}px` }" class="svg-icon">
    <use :href="`#icon-${name}`" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  name: { type: String, required: true },
  color: { type: String, default: '' },
  size: { type: Number, default: 20 },
})
</script>

<style lang="scss" scoped>
.svg-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
