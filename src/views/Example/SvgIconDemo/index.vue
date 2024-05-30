<template>
  <div class="app-content">
    <div class="icon-list">
      <div class="item" v-for="(item, index) in icons" :key="index">
        <SvgIcon :name="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'SvgIconDemo' })
import icons from '@/components/SvgIcon/icons'

const gridTemplateColumns = `repeat(auto-fill, minmax(100px, 1fr))`
</script>

<style lang="scss" scoped>
.app-content {
  .icon-list {
    --border-color: #ccd3cc;
    display: grid;
    grid-template-columns: v-bind(gridTemplateColumns);
    border-top: 1px solid var(--border-color);
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px;
      font-size: 64px;
      border-left: 1px solid var(--border-color);
      border-bottom: 1px solid var(--border-color);
      transition: all 0.28s;
      &:last-of-type {
        border-right: 1px solid var(--border-color);
      }
      &:hover {
        color: red;
      }
    }
  }
}
</style>
