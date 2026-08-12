export interface SysUser extends BaseEntity {
  /** 用户账号 */
  username: string
  /** 用户昵称 */
  nickname: string
  /** 用户头像 */
  avatar: string
}
