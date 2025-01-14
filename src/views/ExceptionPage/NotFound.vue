<template>
  <div class="viewport-container" :class="classes">
    <!-- 星空背景 -->
    <div v-for="i in 5" :key="i" :class="`layer layer${i}`"></div>

    <div class="notfound-container">
      <img src="@/assets/images/404.png" />
      <h2>抱歉，您访问的页面出错了</h2>
      <p>您可能输错了网址，或该网页已删除或不存在</p>
      <a :href="HOME_PAGE_URL" class="btn flex-center">返回主页</a>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'NotFound' })
import { HOME_PAGE_URL } from '@/router/router.constant'

/** Layout 布局响应式 */
useResize()
/** 读取 Pinia 仓库 */
const appStore = useAppStore()
const classes = computed(() => [appStore.device])
</script>

<style lang="scss" scoped>
@use 'sass:math';
@use 'sass:string';

$total: 1000;
$duration: 400s;

@function getShadows($n) {
  $result: '#{math.random(100)}vw #{math.random(100)}vh 0 #fff';
  @for $i from 2 through $n {
    $result: '#{$result}, #{math.random(100)}vw #{math.random(100)}vh 0 #fff';
  }
  @return string.unquote($result);
}

.layer {
  position: fixed;
  left: 0;
  top: 0;
  border-radius: 50%;
}
.layer::after {
  content: '';
  position: absolute;
  left: 0;
  top: 100vh;
  width: inherit;
  height: inherit;
  box-shadow: inherit;
  border-radius: inherit;
}

@for $i from 1 through 5 {
  $total: math.floor(math.div($total, 2));
  $duration: math.div($duration, 2);
  .layer#{$i} {
    width: #{$i}px;
    height: #{$i}px;
    box-shadow: getShadows($total);
    animation: moveUp $duration linear infinite, flicker #{$i}s ease-in-out infinite;
  }
}

@keyframes moveUp {
  to {
    transform: translateY(-100vh);
  }
}

/* 添加星星闪烁效果 */
@keyframes flicker {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}

.viewport-container {
  user-select: none;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #fff;
  background-image: linear-gradient(180deg, #000000, #001a33);
  .notfound-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -64%);
    display: flex;
    flex-direction: column;
    align-items: center;
    h2 {
      font-size: 32px;
      color: #f2f2f2; /* 文字颜色改为柔和的白色 */
      text-align: center;
      letter-spacing: 5px;
      padding-top: 33px;
      padding-bottom: 25px;
    }
    p {
      font-size: 14px;
      color: #e0e0e0; /* 更柔和的灰色 */
      letter-spacing: 2px; /* 适当减小字间距，使其更紧凑 */
      text-align: center;
      padding-bottom: 35px;
    }
    .btn {
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
}

.mobile .notfound-container {
  width: calc(100% - 32px);
  h2 {
    font-size: 28px;
  }
}
</style>
