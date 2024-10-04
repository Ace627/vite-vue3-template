<template>
  <div class="ap-taichi"></div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ApTaiChi' })

/** 接收父组件传递过来的属性 */
const { size, speed, lightColor, darkColor } = defineProps({
  /** 太极的直径 */
  size: { type: [Number, String], default: '64vmin' },
  /** 太极的旋转速度 单位秒 */
  speed: { type: Number, default: 3 },
  /** 太极的亮色 默认白色 */
  lightColor: { type: String, default: '#ffffff' },
  /** 太极的暗色 默认黑色 */
  darkColor: { type: String, default: '#000000' },
})

const containerSize = computed(() => (typeof size === 'string' ? size : `${size}px`))
const containerSpeed = computed(() => `${speed}s`)
const taichiBackgroundImage = computed(() => `linear-gradient(to right, ${darkColor} 50%, ${lightColor} 0)`)
const smallCircleLeft = computed(() => `calc(${containerSize.value} / 4)`)
const smallCircleSize = computed(() => `calc(${containerSize.value} / 2)`)
const beforeBackgroundImage = computed(() => `radial-gradient(ellipse at center, ${lightColor} 25%, ${darkColor} 25%)`)
const afterBackgroundImage = computed(() => `radial-gradient(ellipse at center, ${darkColor} 25%, ${lightColor} 25%)`)
</script>

<style lang="scss" scoped>
.ap-taichi {
  position: relative;
  width: v-bind(containerSize);
  height: v-bind(containerSize);
  border-radius: 50%;
  background-image: v-bind(taichiBackgroundImage);
  /* 设置需要绑定到元素的动画名称 */
  animation-name: run;
  /* 设置完成动画所需要花费的时间，单位为秒或毫秒，默认为 0 */
  animation-duration: v-bind(containerSpeed);
  /* 设置动画的速度曲线，默认为 linear */
  animation-timing-function: linear;
  /* 设置动画被播放的次数，默认为 infinite */
  animation-iteration-count: infinite;
  box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px rgba(0, 0, 0, 0.08);

  /* prettier-ignore */
  &::before, &::after {
    content: '';
    position: absolute;
    left: v-bind(smallCircleLeft);
    width: v-bind(smallCircleSize);
    height: v-bind(smallCircleSize);
    border-radius: inherit;
    /* 解决移动端出现的锯齿效果 */
    border: 1px solid transparent;
  }

  /* 利用 ::before 画个深色半圆 */
  &::before {
    top: 0;
    background-color: v-bind(lightColor);
    background-image: v-bind(beforeBackgroundImage);
  }

  /* 利用 ::after 画个浅色半圆 */
  &::after {
    bottom: 0;
    background-color: v-bind(darkColor);
    background-image: v-bind(afterBackgroundImage);
  }
}

/* 使太极图动起来 */
@keyframes run {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}
</style>
