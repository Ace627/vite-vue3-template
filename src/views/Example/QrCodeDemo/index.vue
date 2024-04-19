<template>
  <div class="app-content">
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

<style lang="scss" scoped>
.qrcode {
  & ~ .qrcode {
    margin-left: 16px;
  }
}
</style>
