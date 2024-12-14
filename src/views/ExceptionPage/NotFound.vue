<template>
  <div class="container" :class="classes">
    <img src="@/assets/images/404.png" />
    <h2>抱歉，您访问的页面出错了</h2>
    <p>您可能输错了网址，或该网页已删除或不存在</p>
    <a href="/" class="btn btn-primary btn_blue">返回主页</a>
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
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding-top: 180px;
  h2 {
    font-size: 32px;
    color: var(--ap-text-color-primary);
    text-align: center;
    letter-spacing: 5px;
    padding-top: 33px;
    padding-bottom: 25px;
  }
  p {
    font-size: 14px;
    color: var(--ap-text-color-regular);
    letter-spacing: 1px;
    text-align: center;
    padding-bottom: 35px;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 56px;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 6px;
    color: var(--ap-color-white);
    background-color: var(--ap-color-primary);
    border-radius: 4px;
    border-color: var(--ap-color-primary-dark-2);
    transition: all var(--ap-transition-duration);
    &:hover {
      background-color: var(--ap-color-primary-light-3);
    }
  }
}
.container.mobile {
  width: calc(100% - 32px);
  h2 {
    font-size: 28px;
  }
}
</style>
