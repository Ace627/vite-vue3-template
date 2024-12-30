/**
 * 分页列表的查询参数泛型
 * @template T - 实体类型，需继承自 Recordable<any>
 * 用于定义分页查询接口的参数结构，支持泛型扩展查询字段
 */
type TableQueryParams<T extends Recordable<any>> = Partial<
  T & {
    /** 当前页码 */
    pageNo: number
    /** 每页的记录数 */
    pageSize: number
  }
>

/**
 * 分页查询结果类型
 * @template T - 实体类型，需继承自 Record<string, any>
 * 定义分页接口的返回数据结构，包含总记录数和当前页的记录列表
 */
type TableResult<T extends Record<string, any>> = Promise<{
  /** 总记录数 */
  total: number
  /** 当前页的记录列表 */
  records: Array<T>
}>

/**
 * 公共实体接口
 * 定义所有实体的通用字段
 */
interface CommonEntity {
  /** 实体唯一标识 */
  id: string
  /** 创建者 */
  createBy: string
  /** 更新者 */
  updateBy: string
  /** 创建时间 */
  createTime: string
  /** 更新时间 */
  updateTime: string
  /** 实体状态（例如：0-禁用，1-正常） */
  status: number
}
