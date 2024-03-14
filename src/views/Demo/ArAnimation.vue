<template>
  <div class="app-content wh-full flex justify-center items-center">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="300px" height="300px">
      <polygon class="g-polygon-wrap" points="150 0, 300 75, 300 225, 150 300, 0 225,  0 75, 150 0" />
      <polygon class="g-polygon-move" points="150 0, 300 75, 300 225, 150 300, 0 225,  0 75, 150 0" />
    </svg>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ArAnimation' })
</script>

<style lang="scss" scoped>
.app-content {
  flex-direction: column;
  padding-top: 64px;
  svg {
    overflow: visible;
    transform: scalex(0.9);
  }

  .g-polygon-wrap,
  .g-polygon-move {
    fill: none;
    stroke: #bf303c;
    stroke-width: 2;
    stroke-linejoin: round;
    stroke-linecap: round;
  }

  .g-polygon-move {
    transform-origin: center center;
    transform: scale(1.05);
    stroke: linear-gradinet(180deg, red, transprent);
    stroke-width: 1.5;
    stroke-dasharray: 280, 700;
    stroke-dashoffset: 8;
    animation: move 2.4s infinite linear;
  }

  @keyframes move {
    0% {
      stroke-dashoffset: 8;
    }
    100% {
      stroke-dashoffset: -972;
    }
  }
}
</style>
