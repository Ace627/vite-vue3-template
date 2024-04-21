import { LoginService } from '@/api/login'
import { getToken, removeToken, setToken } from '@/utils/cache/local-storage'

/** 第一个参数是该 store 的唯一 id */
export default defineStore('user', () => {
  const token = ref<string>(getToken())
  const avatar = ref<string>('https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80')

  /** 登录 */
  async function login(loginParams: LoginModule.LoginParams) {
    const data = await LoginService.login(loginParams)
    token.value = data.result
    setToken(data.result)
  }

  /** 退出登录 */
  async function logout() {
    await LoginService.logout()
    token.value = ''
    removeToken()
  }

  return { token, avatar, login, logout }
})
