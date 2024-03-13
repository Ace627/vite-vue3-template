<template>
  <span v-if="title" :style="styles">{{ title }}</span>
</template>

<script setup lang="ts">
defineOptions({ name: 'Title' })

const props = defineProps({
  size: { type: Number, default: 20 },
  title: { type: String, default: '' },
})

const styles = computed(() => ({
  fontSize: `${props.size}px`,
  marginLeft: `8px`,
}))
</script>

<style lang="scss" scoped></style>
