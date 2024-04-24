<template>
  <VueQr class="qrcode" :text :size :margin :logoSrc="icon" :colorDark="color" :backgroundColor="bgColor" />
</template>

<script setup lang="ts">
defineOptions({ name: 'QRCode' })
import VueQr from 'vue-qr/src/packages/vue-qr.vue'

defineProps({
  /** 二维码内容 必需 */
  text: { type: String, required: true },
  /** 嵌入至二维码中心的 LOGO 地址 */
  icon: { type: String, default: '' },
  /** 二维码图像的外边距, 默认 0px */
  margin: { type: Number, default: 0 },
  /** 尺寸, 长宽一致, 包含外边距 */
  size: { type: Number, default: 150 },
  /** 二维码颜色 */
  color: { type: String, default: '#000' },
  /** 二维码背景颜色 */
  bgColor: { type: String, default: 'transparent' },
})
</script>

<style lang="scss" scoped>
.qrcode:hover {
  cursor: pointer;
}
</style>
