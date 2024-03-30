enum AuthEnum {
  /** 凭证请求头的 Key */
  AUTHORIZATION = 'Authorization',
  /** Token 前缀字符 */
  TOKEN_PREFIX = 'Bearer',
  /** 资源服务器访问凭证 */
  ACCESS_TOKEN = `access_token`,
  /** 权限服务器访问凭证 */
  REFRESH_TOKEN = `refresh_token`,
  /** 最高权限字段 */
  MAX_PERMISSION = `admin`,
}

export default AuthEnum
