<template>
  <div class="p-16px">
    <div class="card">
      <AutoWrapList :min-width="100" :gap="0">
        <div class="nav-item" v-for="(item, index) in list" :key="index" @click="name = item.name">
          <SvgIcon name="Key" color="#f00" />
          <div class="fw-bold ml-6px tracking-wider">{{ item.title }}</div>
        </div>
      </AutoWrapList>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Home' })

const name = defineModel({ type: String, default: 'Home' })

const list = ref([
  { name: 'IconView', title: '图标' },
  { name: 'TaiChi', title: '太极图' },
  { name: 'Editor', title: '富文本' },
])
</script>

<style lang="scss" scoped>
.card {
  padding: 16px;
  background-color: #fff;
  border: 1px solid #edf0f2;
  border-radius: 6px;
  box-shadow: 0px 1px 10px 0px #00000026;
}

.auto-wrap-list {
  border-top: 1px solid #dcdfe6;
  border-left: 1px solid #dcdfe6;
}

.nav-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
  // font-size: 36px;
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  transition: background-color var(--el-transition-duration);
  &:hover {
    color: var(--ap-color-primary);
    background-color: var(--ap-color-primary-light-9);
  }
}
</style>
