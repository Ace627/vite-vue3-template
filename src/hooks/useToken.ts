import { CacheKeyEnum } from '@/enums'

/** 从本地读取 token */
function getToken(): string | null {
  return localStorage.getItem(CacheKeyEnum.TOKEN)
}

/** 向本地存储 token */
function setToken(token: string): void {
  localStorage.setItem(CacheKeyEnum.TOKEN, token)
}

/** 移除本地存储的 token */
function removeToken() {
  localStorage.removeItem(CacheKeyEnum.TOKEN)
}

export default () => {
  return { getToken, setToken, removeToken }
}
