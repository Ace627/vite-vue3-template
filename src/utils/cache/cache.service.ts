const localCache = {
  set(key: string, value: any) {
    localStorage.setItem(key, value)
  },
  get(key: string) {
    return localStorage.getItem(key)
  },
  setJSON(key: string, value: Record<string, any>) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  getJSON(key: string) {
    const jsonStr = localStorage.getItem(key)
    return jsonStr ? JSON.parse(jsonStr) : null
  },
  remove(key: string) {
    localStorage.removeItem(key)
  },
}

const sessionCache = {
  set(key: string, value: any) {
    sessionStorage.setItem(key, value)
  },
  get(key: string) {
    return sessionStorage.getItem(key)
  },
  setJSON(key: string, value: Record<string, any>) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  getJSON(key: string) {
    const jsonStr = sessionStorage.getItem(key)
    return jsonStr ? JSON.parse(jsonStr) : null
  },
  remove(key: string) {
    sessionStorage.removeItem(key)
  },
}

export class CacheService {
  /**
   * 本地缓存
   */
  static local = localCache

  /**
   * 会话级缓存
   */
  static session = sessionCache
}
