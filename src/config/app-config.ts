export class AppConfig {
  /** 登录页地址 默认 */
  static readonly LOGIN_PAGE_URL = '/login'

  /** 首页地址 默认 */
  static readonly HOME_PAGE_URL = '/dashboard'

  /** 404 页面地址 */
  static readonly NOT_FOUND_PAGE_URL = '/404'

  /** 自定义环境变量前缀 */
  static readonly ENV_PREFIX = 'VITE_'

  /** 凭证请求头的 Key */
  static readonly AUTHORIZATION = 'Authorization'

  /** Token 前缀字符 */
  static readonly TOKEN_PREFIX = 'Bearer'
}
