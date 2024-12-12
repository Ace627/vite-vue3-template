export class AppConfig {
  /** 自定义环境变量前缀 */
  static readonly ENV_PREFIX = 'VITE_'

  /** 凭证请求头的 Key */
  static readonly AUTHORIZATION = 'Authorization'

  /** Token 前缀字符 */
  static readonly TOKEN_PREFIX = 'Bearer'

  /** 当前是否处于开发环境 */
  static readonly IS_DEV = import.meta.env.DEV && import.meta.env.MODE === 'development'

  /** 当前是否处于开发环境 */
  static readonly IS_PROD = import.meta.env.PROD && import.meta.env.MODE === 'production'
}
