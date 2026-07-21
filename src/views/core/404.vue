<template>
  <div class="not-found">
    <div class="not-found__content">
      <div class="not-found__code">404</div>
      <h1 class="not-found__title">页面走丢了...</h1>
      <p class="not-found__desc">您访问的页面不存在，请检查链接地址是否正确</p>
      <router-link to="/" class="not-found__btn">返回首页</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'NotFound' })
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 48px;
  background: #f8f9fa;

  &__content {
    text-align: center;
  }

  &__code {
    font-size: 120px;
    font-weight: 700;
    line-height: 1;
    color: #409eff;
    opacity: 0.85;
    user-select: none;
  }

  &__title {
    margin: 24px 0 12px;
    font-size: 24px;
    font-weight: 600;
    color: #303133;
    line-height: 1.4;
  }

  &__desc {
    margin: 0 0 32px;
    font-size: 14px;
    color: #909399;
    line-height: 1.6;
  }

  &__btn {
    display: inline-block;
    padding: 10px 36px;
    font-size: 14px;
    color: #fff;
    background: #409eff;
    border-radius: 6px;
    text-decoration: none;
    transition: background 0.2s, transform 0.15s;
    cursor: pointer;

    &:hover {
      background: #337ecc;
    }

    &:active {
      transform: scale(0.97);
    }
  }
}

/** 移动端适配 */
html[data-device='mobile'] .not-found {
  padding: 24px;

  &__code {
    font-size: 72px;
  }

  &__title {
    margin: 16px 0 8px;
    font-size: 18px;
  }

  &__desc {
    margin-bottom: 24px;
    font-size: 13px;
  }

  &__btn {
    display: block;
    width: 100%;
    padding: 14px 0;
    text-align: center;
    border-radius: 8px;
    font-size: 15px;

    &:hover {
      background: #409eff;
    }
  }
}
</style>
