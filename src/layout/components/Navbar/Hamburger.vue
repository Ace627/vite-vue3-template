<template>
  <div @click="emits('toggleClick')">
    <SvgIcon :name :size />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Hamburger' })

const emits = defineEmits(['toggleClick'])

const appStore = useAppStore()
const size = ref(24)
const name = computed(() => (appStore.isCollapse ? `Expand` : `Fold`))
</script>

<style lang="scss" scoped></style>
