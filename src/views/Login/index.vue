<template>
  <div class="login-container relative wh-screen overflow-hidden">
    <div class="login-content fixed overflow-hidden flex">
      <div class="left">
        <img src="../../assets/images/223502-17123277028d9c.jpg" class="wh-full" alt="" />
      </div>
      <div class="right">
        <h3>登录</h3>
        <input type="text" v-model="loginForm.account" class="input-item" placeholder="请输入你的账号" />
        <input type="password" v-model="loginForm.password" class="input-item" placeholder="请输入你的密码" />
        <a href="#" class="forget-password">忘记密码？</a>
        <button class="btn" @click="handleLogin">
          <span v-if="loading">正在登录...</span>
          <span v-else>提交</span>
        </button>
      </div>
    </div>

    <footer class="login-footer-container">
      <span>少时，春风得意马蹄疾，不信人间有别离。</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Login' })

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

/** 登录按钮 Loading */
const loading = ref(false)
/** 登录表单数据 */
const loginForm = ref<LoginEntity.LoginParams>({
  account: 'admin',
  password: '123456',
})
/** 计算需要跳转的路径 */
const redirect = (route.query.redirect as string) || '/'

/** 处理登录按钮的回调 */
async function handleLogin() {
  try {
    loading.value = true
    await userStore.login(loginForm.value)
    loading.value = false
    console.log('redirect: ', redirect)
    await router.replace({ path: redirect })
  } catch (error) {
    console.log('error: ', error)
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  background-image: linear-gradient(to right, #65cbf7, #b3a5fc);
}

.login-content {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 450px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.8);
  border-radius: 10px;
}
.left {
  width: 60%;
  img {
    display: block;
    object-fit: cover;
  }
}
.right {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  padding: 0 16px;
  background-color: #fff;
  h3 {
    padding-top: 45px;
    text-align: center;
    font-weight: bold;
    font-size: 24px;
    letter-spacing: 2px;
  }
  .input-item {
    width: 100%;
    height: 44px;
    margin-top: 16px;
    padding: 0;
    padding-left: 5px;
    border-bottom: 2px solid #b3a5fc;
  }
  .forget-password {
    margin-top: 16px;
    color: #9c3493;
    text-align: right;
    font-size: 14px;
  }
  .btn {
    cursor: pointer;
    width: 80%;
    height: 42px;
    margin: 0 auto;
    margin-top: 16px;
    color: #9c3493;
    font-size: 18px;
    border-radius: 16px;
    background-image: linear-gradient(to left, #65cbf7, #b3a5fc);
  }
}

.login-footer-container {
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  color: #fff;
  font-size: 12px;
  letter-spacing: 1px;
  cursor: pointer;
}

/** 适配 PC */
@media screen and (min-width: 992px) {
  .login-content {
    max-width: 950px;
    min-width: 750px;
  }
}
/** 适配 Pad */
@media screen and (max-width: 992px) {
  .login-content {
    display: block;
    height: auto;
  }
  .left {
    width: 100%;
    height: 200px;
    margin-top: 0;
  }
  .right {
    width: 100%;
    margin-top: 0;
    padding: 2vw;
    h3 {
      padding-top: 0;
    }
    .input-item,
    .forget-password,
    .btn {
      margin-top: 2vw;
    }
  }
}
/** 适配 Mobile */
@media screen and (max-width: 750px) {
  .login-content {
    width: 85%;
  }
  .btn {
    margin-bottom: 2vw !important;
  }
}
</style>
