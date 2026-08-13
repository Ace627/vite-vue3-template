<template>
  <div @click="emits('toggleClick')">
    <SvgIcon :size :name="appStore.isCollapse ? 'Expand' : 'Fold'" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Hamburger' })

const emits = defineEmits(['toggleClick'])

const appStore = useAppStore()

/** 导航栏图标大小 */
const size = ref('1.16em')
</script>

<style lang="scss" scoped></style>
