<template>
  <div class="app-content flex items-start gap-16px flex-wrap">
    <QrCode text="两个黄鹂鸣翠柳" />
    <QrCode text="两个黄鹂鸣翠柳" color="red" />
    <QrCode text="两个黄鹂鸣翠柳" bg-color="skyblue" :margin="16" />
    <QrCode text="两个黄鹂鸣翠柳" :icon="vueLogo" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'QrCodeDemo' })
import vueLogo from '@/assets/vue.svg'
</script>

<style lang="scss" scoped></style>
