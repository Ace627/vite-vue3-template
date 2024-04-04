/** 所有 api 接口的响应数据都应该遵守该格式 */
interface ApiResponseData<T = any> {
  code: number
  timestamp: number
  success: boolean
  message: string
  result: T
}

/** 列表类型的响应数据类型 */
interface TableResponseData<T = any> extends ApiResponseData {
  result: {
    total: number
    records: T
  }
}

/** 基础的分页查询参数 */
interface TableQueryParams {
  pageNo: number
  pageSize: number
}

/* 定义类型别名，简化接口返回类型的书写 */
type ApiResult<T = any> = Promise<ApiResponseData<T>>
type TableResult<T = any> = Promise<TableResponseData<T>>
