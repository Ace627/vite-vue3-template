<template>
  <div class="app-container wh-full">
    <Card>
      <template #header> 二维码使用案例 </template>
      <div class="qrcode-container">
        <div class="qrcode-item">
          <QrCode text="https://github.com/Ace627/vite-vue3-template" draggable="false" />
          <span>Vue3 Vite 模板</span>
        </div>
        <div class="qrcode-item">
          <QrCode text="https://github.com/Ace627/vite-vue3-template" :icon="VueLogo" draggable="false" />
          <span>Vue3 Vite 模板</span>
        </div>
        <div class="qrcode-item">
          <QrCode text="WIFI:S:Dataway-Mobile;T:WPA;P:Horizon1992;;" draggable="false" />
          <span>WiFi 二维码</span>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="tsx">
import VueLogo from '@/assets/vue.svg'
defineOptions({ name: 'Layout' })

/** 利用 TSX 封装一个 Card 组件 */
const Card = defineComponent({
  setup(props, { slots }) {
    return () => (
      <div class="card">
        <div class="card__header">{slots.header ? slots.header() : null}</div>
        <div class="card__body">{slots.default ? slots.default() : null}</div>
      </div>
    )
  },
})
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  padding: 16px;
}

:deep(.card) {
  background-color: #fff;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  .card__header {
    padding: 14px 16px;
    border-bottom: 1px solid #e4e7ed;
  }
  .card__body {
    padding: 16px;
  }
}

.qrcode-container {
  display: flex;
  align-items: center;
  .qrcode-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px;
    span {
      margin-top: 8px;
      font-weight: 500;
      color: #333;
      letter-spacing: 1px;
    }
    & ~ .qrcode-item {
      margin-left: 16px;
    }
  }
}
</style>
