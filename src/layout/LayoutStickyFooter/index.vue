<template>
  <div class="layout-sticky-footer">
    <!-- 头部区域 -->
    <header :class="headerClasses">
      <slot name="header"> </slot>
    </header>

    <!-- 主体区域 -->
    <main class="layout__content">
      <slot name="content"> </slot>
    </main>

    <!-- 底部区域 -->
    <footer class="layout__footer">
      <slot name="footer"> </slot>
    </footer>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'LayoutStickyFooter' })

const props = defineProps({
  /** 是否固定头部 */
  fixedHeader: { type: Boolean, default: false },
})

/** 计算头部的 CSS 类，根据是否固定头部来动态调整 */
const headerClasses = computed(() => ['layout__header', { 'fixed-header': props.fixedHeader }])
</script>

<style lang="scss" scoped>
.layout-sticky-footer {
  --layout-header-height: 50px; /* 头部高度 */
  --layout-footer-height: 100px; /* 底部高度 */
  position: relative;
  display: flex; /* 使用 Flexbox 布局来排列子元素 */
  flex-direction: column; /* 设置纵向排列：头部 + 主体 + 底部 */
  width: 100%;
  min-height: 100%; /* 确保页面最小高度填充整个视口 */
}
.layout__header {
  width: 100%;
  height: var(--layout-header-height); /* 动态设置头部高度 */
}
.fixed-header {
  position: fixed; /* 固定头部 */
  right: 0;
  top: 0;
}

/* 固定头部时，主体内容向下移动以避免遮挡 */
.fixed-header + .layout__content {
  padding-top: var(--layout-header-height); /* 距离头部一定高度 */
}
.layout__content {
  flex-grow: 1; /* 主体区域可自适应撑开剩余空间 */
}
.layout__footer {
  width: 100%;
  height: var(--layout-footer-height); /* 动态设置底部高度 */
}
</style>
