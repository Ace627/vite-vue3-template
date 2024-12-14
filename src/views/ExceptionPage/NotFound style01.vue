<template>
  <div :class="classes" class="exception-container clearFix">
    <div class="exception-content flex-center w-full h-70% mt-10vh overflow-hidden">
      <div class="img-container">
        <img src="https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg" draggable="false" />
      </div>

      <div class="content">
        <h1 class="font-bold">404</h1>
        <div class="desc">抱歉，你访问的页面不存在或无权访问</div>
        <router-link to="/" class="c-#1890ff">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'NotFound' })

/** Layout 布局响应式 */
useResize()
/** 读取 Pinia 仓库 */
const appStore = useAppStore()
const classes = computed(() => [appStore.device])
</script>

<style lang="scss" scoped>
.exception-content {
  .img-container {
    padding-right: 52px;
    img {
      height: 360px;
      max-width: 430px;
    }
  }

  .content {
    h1 {
      color: #434e59;
      font-size: 72px;
    }
    .desc {
      margin-bottom: 16px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 20px;
    }
  }
}

.mobile .exception-content {
  flex-direction: column;
  margin-top: 6vh;

  .img-container {
    padding-right: 0;

    img {
      width: 60%;
      height: 20%;
      margin: 0 auto;
    }
  }

  .content {
    margin-top: 16px;
    text-align: center;
  }
}
</style>
