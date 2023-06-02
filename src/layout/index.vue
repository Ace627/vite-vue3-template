<template>
  <div class="app-container">
    <h2>二维码生成测试</h2>
    <Qrcode text="https://cn.vitejs.dev/guide/" logo-src="https://cn.vitejs.dev/logo.svg" />
    <Qrcode text="https://cn.vitejs.dev/guide/" logo-src="https://cn.vitejs.dev/logo.svg" />
    <Qrcode text="https://cn.vitejs.dev/guide/" />
    <Qrcode text="https://cn.vitejs.dev/guide/" logo-src="https://cn.vitejs.dev/logo.svg" />
    <Qrcode text="https://cn.vitejs.dev/guide/" logo-src="https://cn.vitejs.dev/logo.svg" />
    <hr />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
  // overflow: hidden;
}

img {
  margin: 6px;
  border-radius: 16px;
  box-shadow: 0 5px 10px 1px #0f15331a, inset -1px 1px 1px #fffc;
}
</style>
