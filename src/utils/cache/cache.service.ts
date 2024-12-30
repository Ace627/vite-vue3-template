const localCache = {
  set(key: string, value: any) {
    localStorage.setItem(key, value) // 存储数据到 localStorage
  },
  get(key: string) {
    return localStorage.getItem(key) // 从 localStorage 获取数据
  },
  setJSON(key: string, value: Record<string, any>) {
    localStorage.setItem(key, JSON.stringify(value)) // 将 JSON 数据存储到 localStorage
  },
  getJSON(key: string) {
    const jsonStr = localStorage.getItem(key) // 获取 JSON 字符串
    return jsonStr ? JSON.parse(jsonStr) : null // 如果存在，则解析并返回；否则返回 null
  },
  remove(key: string) {
    localStorage.removeItem(key) // 从 localStorage 删除指定的键
  },
}

const sessionCache = {
  set(key: string, value: any) {
    sessionStorage.setItem(key, value) // 存储数据到 sessionStorage
  },
  get(key: string) {
    return sessionStorage.getItem(key) // 从 sessionStorage 获取数据
  },
  setJSON(key: string, value: Record<string, any>) {
    sessionStorage.setItem(key, JSON.stringify(value)) // 将 JSON 数据存储到 sessionStorage
  },
  getJSON(key: string) {
    const jsonStr = sessionStorage.getItem(key) // 获取 JSON 字符串
    return jsonStr ? JSON.parse(jsonStr) : null // 如果存在，则解析并返回；否则返回 null
  },
  remove(key: string) {
    sessionStorage.removeItem(key) // 从 sessionStorage 删除指定的键
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
