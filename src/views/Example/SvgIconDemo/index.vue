<template>
  <div class="app-content text-size-64px">
    <SvgIcon name="Gitee" class="c-[#f00]" />
    <SvgIcon name="DouYin" />
    <SvgIcon name="Github" color="blue" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'SvgIconDemo' })
</script>

<style lang="scss" scoped>
.svg-icon ~ .svg-icon {
  margin-left: 10px;
}
</style>
