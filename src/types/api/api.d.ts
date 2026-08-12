interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

/** 基础实体 */
interface BaseEntity {
  /** 数据创建时间 */
  createTime: string
  /** 数据更新时间 */
  updateTime: string
  /** 数据创建人的账号 */
  createBy: string
  /** 数据更新人的账号 */
  updateBy: string
}
