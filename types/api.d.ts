/** 所有 api 接口的响应数据都应该遵守该格式 */
interface ApiResponseData<T = any> {
  readonly code: number
  readonly msg: string
  data: Readonly<T>
}

/* 定义类型别名，简化接口返回类型的书写 */
type ApiResult<T = any> = Promise<ApiResponseData<T>>
