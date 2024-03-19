/** 所有 api 接口的响应数据都应该遵守该格式 */
interface ApiResponseData<T = any> {
  readonly code: number
  readonly timestamp: number
  readonly success: boolean
  readonly message: string
  result: Readonly<T>
}

/** 列表类型的响应数据类型 */
interface TableResponseData<T = any> extends ApiResponseData {
  result: {
    total: number
    list: T
  }
}

/** 基础的分页查询参数 */
interface QueryTableParams {
  pageNo: number
  pageSize: number
  [key: string]: any
}

/* 定义类型别名，简化接口返回类型的书写 */
type ApiResult<T = any> = Promise<ApiResponseData<T>>
type TableResult<T = any> = Promise<TableResponseData<T>>
