import { defineStore } from 'pinia'
const { getToken, removeToken, setToken } = useToken()

export default defineStore('user', {
  state() {
    return {
      token: getToken(),
    }
  },

  actions: {
    // 登录
    login() {
      const token = 'MOCK_LOGIN_TOKEN'
      this.token = token
      setToken(this.token)
    },

    // 退出登录
    logout() {
      removeToken()
      this.$reset() // 重置 user 数据仓库
    },
  },

  getters: {},
})
