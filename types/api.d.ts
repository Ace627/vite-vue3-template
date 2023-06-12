/** 所有 api 接口的响应数据都应该遵守该格式 */
interface ApiResponseData<T = any> {
  readonly code: number
  readonly msg: string
  data: Readonly<T>
}
