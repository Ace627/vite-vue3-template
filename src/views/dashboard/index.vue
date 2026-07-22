<template>
  <div class="dashboard">
    <h1 class="dashboard__title">首页</h1>
    <button class="dashboard__logout" type="button" @click="handleLogout">退出登录</button>
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
    color: #303133;
  }

  &__logout {
    padding: 8px 20px;
    font-size: 14px;
    color: #fff;
    background: #409eff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;

    &:hover {
      background: #337ecc;
    }

    &:active {
      transform: scale(0.98);
    }
  }
}
</style>
