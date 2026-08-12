import type { SysUser } from '@/types/api/user'

/** 验证码响应数据 */
export interface CaptchaResult {
  /** 验证码唯一标识 */
  uuid: string
  /** 验证码图片 */
  captcha: string
}

export interface LoginParams {
  /** 登录账号 */
  username: string
  /** 登录密码 */
  password: string
  /** 验证码 */
  captcha: string
  /** 验证码唯一标识 */
  uuid: string
}

/** 登录响应数据 */
export interface LoginResult {
  /** 访问令牌 */
  accessToken: string
  /** 过期时间 */
  expiresIn: number
}

/** 获取登录者信息 */
export interface CurrentUserInfo {
  user: SysUser
  roles: string[]
  permissions: string[]
}
