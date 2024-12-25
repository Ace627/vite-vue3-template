import { LoginService } from '@/api/system/login.service'
import { LOGIN_PAGE_URL } from '@/router/router.constant'
// import type { FormInstance, FormRules } from 'element-plus'
import defaultCaptcha from '@/assets/images/default/default-captcha.png'
import { getLoginInfo, removeLoginInfo, setLoginInfo } from '@/utils/cache'

/** 登录页的欢迎语 */
function getLoginWelcome(): string {
  const list = ['许久不见，甚是想念！', '等星星睡了再说想你', '今天营业不休息', '一切就绪，开始你的旅程把！', '未来可期，前行无畏！']
  return list[Math.floor(Math.random() * list.length)]
}

export default () => {
  const route = useRoute()
  const router = useRouter()
  const userStore = useUserStore()

  /** 计算需要跳转的路径 */
  const redirect = (route.query['redirect'] as string) ?? '/'
  /** 验证码图片地址 */
  const captchaURL = ref<string>(defaultCaptcha)
  /** 登录加载状态 */
  const loading = ref<boolean>(false)
  /** 登录表单数据 */
  const loginForm = ref({} as LoginAccountDto)
  /** 登录表单校验规则 */
  // const loginRules: FormRules<LoginAccountDto> = {
  const loginRules = {
    username: [{ required: true, message: '账号不可为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不可为空', trigger: 'blur' }],
    captcha: [{ required: true, message: '验证码不可为空', trigger: 'blur' }],
  }

  /** 登录 */
  // async function handleLogin(formInstance: FormInstance | undefined) {
  async function handleLogin() {
    try {
      loading.value = true
      // await formInstance.validate()
      await userStore.login(loginForm.value)
      // 登录成功后执行记住密码的逻辑
      const { username, password, rememberMe } = loginForm.value
      loginForm.value.rememberMe ? setLoginInfo({ username, password, rememberMe }) : removeLoginInfo()
      loading.value = false
      await router.replace(redirect)
      // useModal().notifySuccess(`${timePrefix()}，${getLoginWelcome()}`, { title: '欢迎回来！' })
    } catch (error: any) {
      loading.value = false
      loginForm.value.captcha = ''
      console.log(`登录失败`, error.message || error)
    }
  }

  /** 获取登录验证码 */
  async function getCaptcha() {
    const data = await LoginService.getCaptcha()
    captchaURL.value = data.captcha
    loginForm.value.uuid = data.uuid
  }

  // 只有处于登录页才执行此处代码
  if (route.path === LOGIN_PAGE_URL) {
    // 初始获取一次验证码
    getCaptcha()
    // 读取记住的账号密码
    Object.assign(loginForm.value, getLoginInfo())
  }

  return { loading, loginForm, loginRules, captchaURL, handleLogin, getCaptcha }
}
