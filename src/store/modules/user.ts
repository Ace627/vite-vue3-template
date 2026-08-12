import type { Auth } from '@/types'
import { AuthRequest } from '@/api/auth.request'
import { removeAccessToken, setAccessToken } from '@/utils'
import defaultAvatar from '@/assets/images/default-avatar.jpg'

export const useUserStore = defineStore('user', () => {
  /** 登录者的信息 */
  const currentUserInfo = ref({} as Auth.CurrentUserInfo)
  /** 角色列表 */
  const roles = ref<string[]>([])
  /** 权限列表 */
  const permissions = ref<string[]>([])
  /** 用户头像 */
  const avatar = computed(() => currentUserInfo.value.user.avatar || defaultAvatar)

  /** 登录 */
  async function login(LoginForm: Auth.LoginParams) {
    const data = await AuthRequest.login(LoginForm)
    setAccessToken(data.accessToken)
  }

  /** 获取登录者信息 */
  async function getInfo() {
    currentUserInfo.value = await AuthRequest.getInfo()
    roles.value = currentUserInfo.value.roles
    permissions.value = currentUserInfo.value.permissions
  }

  /** 退出登录 */
  async function logout() {
    try {
      await AuthRequest.logout()
    } catch (error: unknown) {
      const errMessage = error instanceof Error ? error.message : String(error)
      console.error('退出登录失败:', errMessage)
    } finally {
      removeAccessToken()
    }
  }

  return { avatar, currentUserInfo, roles, permissions, login, getInfo, logout }
})
