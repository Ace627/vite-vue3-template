<template>
  <VueQr v-bind="$attrs" :text="text" :margin="margin" :logoSrc="logoSrc" :callback="callback" draggable="false"></VueQr>
</template>

<script setup lang="ts">
import VueQr from 'vue-qr/src/packages/vue-qr.vue'

// props 中已经定义的属性不会在 $attrs 里面出现
const $attrs = useAttrs()

defineProps({
  text: { type: String, required: true }, // 二维码内容
  margin: { type: Number, default: 20 }, // 二维码图像的外边距, 默认 20px
  logoSrc: { type: String, default: '' }, // 	嵌入至二维码中心的 LOGO 地址
  callback: { type: Function as PropType<(dataURL: string) => void>, default: () => {} }, // 	生成的二维码 Data URI 可以在回调中取得
})
</script>

<style lang="scss" scoped></style>
