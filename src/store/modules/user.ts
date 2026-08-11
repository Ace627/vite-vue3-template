import { removeAccessToken } from '@/utils'
import defaultAvatar from '@/assets/images/default-avatar.jpg'

export const useUserStore = defineStore('user', () => {
  /** 用户头像 */
  const avatar = ref<string>(defaultAvatar)

  /** 退出登录 */
  async function logout() {
    removeAccessToken()
  }

  return { avatar, logout }
})
