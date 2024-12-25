import { LoginService } from '@/api/system/login.service'
import { getAccessToken, removeAccessToken, setAccessToken } from '@/utils/cache'

/** 第一个参数是该 store 的唯一 id */
export default defineStore('user', () => {
  const roles = ref<string[]>([])
  const permissions = ref<string[]>([])

  /**
   * 用户头像 默认值 src/assets/images/default/default-avatar.gif
   */
  const avatar = ref<string>(new URL('../../assets/images/default/default-avatar.gif', import.meta.url).href)

  /** 登录 */
  async function login(LoginForm: LoginAccountDto) {
    const data = await LoginService.login(LoginForm)
    setAccessToken(data)
  }

  /** 退出登录 */
  async function logout() {
    await LoginService.logout()
    removeAccessToken()
  }

  return { avatar, roles, permissions, login, logout }
})
