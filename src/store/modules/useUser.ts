import { LoginService } from '@/api'
import { getAccessToken, removeAccessToken, setAccessToken } from '@/utils/cache/local-storage'

/** 第一个参数是该 store 的唯一 id */
export default defineStore('user', () => {
  const token = ref<string>(getAccessToken())
  const roles: string[] = []
  const permissions: string[] = []
  const avatar = ref<string>('https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80')

  /** 登录 */
  async function login(loginParams: LoginEntity.LoginParams) {
    const data = await LoginService.login(loginParams)
    token.value = data.result
    setAccessToken(data.result)
  }

  /** 退出登录 */
  async function logout() {
    await LoginService.logout()
    token.value = ''
    removeAccessToken()
  }

  return { token, avatar, roles, permissions, login, logout }
})
