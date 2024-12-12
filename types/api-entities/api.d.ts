/** 所有 api 接口的响应数据都应该遵守该格式 */
interface ApiResponseData<T = any> {
  code: number
  timestamp: number
  success: boolean
  message: string
  result: T
}

/** 分页列表的查询参数泛型 */
type TableQueryParams<T = any> = Partial<T> & { pageNo: number; pageSize: number }

/** 处理列表类型的返回数据 */
type TableResult<T = any> = Promise<{ total: number; records: Array<T> }>
