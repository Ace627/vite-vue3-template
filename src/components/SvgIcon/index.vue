<template>
  <svg class="svg-icon" aria-hidden>
    <use :href="`#icon-${name}`"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  name: { type: String, required: true },
})
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
</style>
