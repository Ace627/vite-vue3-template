<template>
  <div class="dashboard">
    <h1 class="dashboard__title">首页</h1>
    <el-button type="primary" @click="handleLogout">退出登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { removeAccessToken } from '@/utils'

defineOptions({ name: 'Dashboard' })

const router = useRouter()

// 退出登录：清除 token 并以 replace 跳回登录页
function handleLogout() {
  removeAccessToken()
  router.replace('/login')
}
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 24px;

  &__title {
    margin: 0 0 16px;
    font-size: 20px;
    font-weight: 600;
  }
}
</style>
