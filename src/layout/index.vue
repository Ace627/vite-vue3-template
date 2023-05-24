<template>
  <div class="app-container">
    <div class="svg-icon-container">
      <h2>Svg Icon 测试</h2>
      <div>
        <SvgIcon name="home" :size="40" />
        <SvgIcon name="cart-empty" :size="40" color="blue" />
        <SvgIcon name="phone" :size="40" color="#f00" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.svg-icon-container {
  width: 90%;
  margin: 16px;
  padding: 16px;
  border: 2px solid #ff5a5a;
  div {
    display: flex;
    .svg-icon {
      margin: 6px;
      border: 2px solid #ff5a5a;
    }
  }
}
</style>
