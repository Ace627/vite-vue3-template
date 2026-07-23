<template>
  <div class="login">
    <div class="login__card">
      <h1 class="login__title">登录</h1>

      <div class="login__field">
        <label class="login__label" for="account">账号</label>
        <input id="account" v-model="account" class="login__input" type="text" placeholder="请输入账号" autocomplete="username" />
      </div>

      <div class="login__field">
        <label class="login__label" for="password">密码</label>
        <input id="password" v-model="password" class="login__input" type="password" placeholder="请输入密码" autocomplete="current-password" />
      </div>

      <button class="login__btn" type="button" @click="handleLogin">登录</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { setAccessToken, TipModal } from '@/utils'

defineOptions({ name: 'Login' })

const route = useRoute()
const router = useRouter()

// 默认账号密码（按用户要求预填）
const account = ref('admin')
const password = ref('admin123456')

// 点击登录：先写入 token，再优先跳转 route.query.redirect，无则回首页；使用 replace 模式
function handleLogin() {
  const redirect = route.query.redirect
  const target = typeof redirect === 'string' ? redirect : '/'

  // 写入 token（占位 mock，待接入真实登录接口后替换为后端返回）
  setAccessToken('mock-access-token')
  TipModal.msgSuccess('登录成功')
  router.replace(target)
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 24px;
  background: #f8f9fa;

  &__card {
    width: 100%;
    max-width: 360px;
    padding: 32px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  }

  &__title {
    margin: 0 0 24px;
    font-size: 22px;
    font-weight: 600;
    color: #303133;
    text-align: center;
  }

  &__field {
    margin-bottom: 18px;
  }

  &__label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    color: #606266;
  }

  &__input {
    width: 100%;
    height: 40px;
    padding: 0 12px;
    font-size: 14px;
    color: #303133;
    border: 1px solid #dcdfe6;
    border-radius: 6px;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s;

    &:focus {
      border-color: #409eff;
    }

    &::placeholder {
      color: #c0c4cc;
    }
  }

  &__btn {
    width: 100%;
    height: 40px;
    margin-top: 8px;
    font-size: 15px;
    color: #fff;
    background: #409eff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition:
      background 0.2s,
      transform 0.15s;

    &:hover {
      background: #337ecc;
    }

    &:active {
      transform: scale(0.98);
    }
  }
}
</style>
