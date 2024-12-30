import pkg from '../../../package.json' // 导入 package.json 文件，获取应用的名称

/** 缓存键的前缀 */
const CACHE_PREFIX = pkg.name.toUpperCase() // 使用应用的名称作为缓存键的前缀，转为大写

export class CacheKey {
  /** 定义用户的访问令牌缓存键 */
  static readonly ACCESS_TOKEN = `${CACHE_PREFIX}-ACCESS-TOKEN`

  /** 定义刷新令牌的缓存键 */
  static readonly REFRESH_TOKEN = `${CACHE_PREFIX}-REFRESH-TOKEN`

  /** 定义侧边栏的折叠/展开状态缓存键 */
  static readonly SIDEBAR_STATUS = `${CACHE_PREFIX}-SIDEBAR-STATUS`

  /** 定义保存用户登录信息的缓存键 */
  static readonly REMEMBER_PASSWORD = `${CACHE_PREFIX}-REMEMBER_PASSWORD`
}
