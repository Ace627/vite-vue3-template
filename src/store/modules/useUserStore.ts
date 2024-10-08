import { LoginService } from '@/api'
import { getAccessToken, removeAccessToken, setAccessToken } from '@/utils/cache/local-storage'

/** 第一个参数是该 store 的唯一 id */
export default defineStore('user', () => {
  const roles: string[] = []
  const permissions: string[] = []

  /**
   * 用户访问服务资源的唯一凭证
   */
  const token = ref<string>(getAccessToken())

  /**
   * 用户头像 默认值 src/assets/images/default/default-avatar.gif
   */
  const avatar = ref<string>(new URL('../../assets/images/default/default-avatar.gif', import.meta.url).href)

  /** 登录 */
  async function login(LoginForm: LoginEntity.LoginForm) {
    const data = await LoginService.login(LoginForm)
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
