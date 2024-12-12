<template>
  <div class="app-content">
    <a href="https://juejin.cn/spost/7447331905820950543" target="_blank" class="link-item">
      <SvgIcon name="External" class="mr-6px" />
      <span> AutoWrapList 组件说明文档</span>
    </a>

    <AutoWrapList :min-width="width" :gap>
      <div class="item flex-center" v-for="(item, index) in total" :key="index">{{ item }}</div>
    </AutoWrapList>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'WrapList' })

/** 设计稿的列表项高度 */
const width = ref<number>(220)
/** 列表项个数 */
const total = ref<number>(18)
/** 列表项间距 */
const gap = ref<number>(16)
</script>

<style lang="scss" scoped>
.link-item {
  cursor: pointer;
  display: inline-block;
  margin-bottom: 16px;
  color: var(--ap-color-primary);
  &:hover {
    text-decoration: underline;
  }
}
.item {
  height: 150px;
  font-size: 32px;
  background-color: #fff;
  border: 1px solid #edf0f2;
  border-radius: 6px;
  box-shadow: 0px 1px 10px 0px #00000026;
}
</style>
