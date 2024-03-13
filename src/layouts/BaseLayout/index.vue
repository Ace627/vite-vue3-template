<template>
  <MixinLayout v-if="layout.mode === 'mix'">
    <RouterView />
  </MixinLayout>
</template>

<script setup lang="ts">
defineOptions({ name: 'BaseLayout' })
import { MixinLayout } from '../'

const appStore = useApp()
const { layout } = storeToRefs(appStore)
</script>

<style lang="scss" scoped></style>
