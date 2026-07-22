/**
 * 本地存储封装（localStorage 包装器）
 * 特性：
 * - 支持任意 JSON 可序列化值（对象、数组、字符串、数字等）
 * - 支持过期时间（ttl，单位：秒；-1 表示永不过期）
 * - 所有 key 统一加前缀，clear() 不会误删同源下的其它 localStorage 数据
 */

const STORAGE_PREFIX = 'app:storage:'

export class StorageCache {
  /**
   * 写入存储
   * @param key 键（无需带前缀，内部自动拼接）
   * @param value 值（需可 JSON 序列化）
   * @param ttl 过期时间（秒），-1 表示永不过期
   * @returns 是否写入成功（序列化失败或超出存储配额时返回 false）
   */
  static set<T = any>(key: string, value: T, ttl: number = -1): boolean {
    try {
      const data = { value, ttl: ttl === -1 ? ttl : Date.now() + ttl * 1000 }
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data))
      return true
    } catch {
      return false
    }
  }

  /**
   * 读取存储
   * @param key 键
   * @param defaultValue 不存在或已过期时的默认值
   * @returns 存储值或默认值
   */
  static get<T = any>(key: string, defaultValue: T | null = null): T | null {
    try {
      const jsonStr = localStorage.getItem(STORAGE_PREFIX + key)
      if (!jsonStr) return defaultValue
      const data = JSON.parse(jsonStr)
      if (Date.now() <= data.ttl || data.ttl === -1) return data.value as T
      localStorage.removeItem(STORAGE_PREFIX + key)
      return defaultValue
    } catch {
      localStorage.removeItem(STORAGE_PREFIX + key)
      return defaultValue
    }
  }

  /** 删除指定键 */
  static remove(key: string): void {
    localStorage.removeItem(STORAGE_PREFIX + key)
  }

  /** 清空本工具写入的所有存储（不影响其它 localStorage 数据） */
  static clear(): void {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(STORAGE_PREFIX))
      .forEach((k) => localStorage.removeItem(k))
  }
}
