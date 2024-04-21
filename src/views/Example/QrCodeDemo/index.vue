<template>
  <div class="app-content">
    <div class="mb-16px">
      <button @click="getImgData">获取第一张二维码的图片数据</button>
    </div>

    <div class="flex items-start gap-16px flex-wrap flex-content-start">
      <QrCode text="两个黄鹂鸣翠柳" />
      <QrCode text="两个黄鹂鸣翠柳" :color="generateHexColor()" />
      <QrCode text="两个黄鹂鸣翠柳" :bg-color="generateHexColor()" :margin="16" />
      <QrCode text="两个黄鹂鸣翠柳" :icon="vueLogo" ref="qrcodeRef" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'QrCodeDemo' })
import { type GlobalComponents } from 'vue'
import vueLogo from '@/assets/vue.svg'
import { generateHexColor } from '@/utils/color'

const qrcodeRef = ref<InstanceType<GlobalComponents['QrCode']>>()

function getImgData() {
  console.log(qrcodeRef.value?.toDataURL())
}
onMounted(() => {})
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
  padding: 8px 16px;
  color: #fff;
  background-color: #07f;
  border-radius: 4px;
  transition: background-color 0.32s;
  &:hover {
    opacity: 0.7;
  }
}

.qrcode {
  flex: 1;
}
</style>
