import { removeAccessToken } from '@/utils/cache/token.cache'
import { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'

const ErrorMessageMap: Record<string, string> = {
  [HttpStatusCode.BadRequest]: '请求参数错误，请检查后重试',
  [HttpStatusCode.Unauthorized]: '登录已过期，请重新登录', // 认证失败，无法访问系统资源
  [HttpStatusCode.Forbidden]: '无权限访问该资源，请联系管理员授权',
  [HttpStatusCode.NotFound]: '请求的资源不存在，请检查接口地址',
  [HttpStatusCode.MethodNotAllowed]: '请求方法不允许，请检查请求类型',
  [HttpStatusCode.RequestTimeout]: '接口请求超时，请稍后重试',
  [HttpStatusCode.UnsupportedMediaType]: '不支持的请求格式，请检查参数类型',
  [HttpStatusCode.UnprocessableEntity]: '参数校验失败，请核对输入内容',
  [HttpStatusCode.InternalServerError]: '服务器内部错误，请联系管理员处理',
  [HttpStatusCode.BadGateway]: '网关错误，服务暂不可用',
  [HttpStatusCode.ServiceUnavailable]: '服务正在维护中，请稍后重试',
  [HttpStatusCode.GatewayTimeout]: '网关超时，请稍后重试',
}

export function responseErrorInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(undefined, (error: AxiosError<ApiResponse>) => {
    let { message = '网络连接异常，请检查服务或网络是否正常' } = error
    const status = error.response?.status ?? -1

    // 提取错误信息（优先级：后端返回 > 本地映射）
    message = ErrorMessageMap[status.toString()] || message
    if (error?.response?.data?.message) message = error.response.data.message

    // 统一提示错误信息（临时用，后续换 toast）
    alert(message)

    // 处理 401 错误（会话过期）
    if (status === HttpStatusCode.Unauthorized) {
      removeAccessToken()
      window.location.reload()
      return Promise.reject(error)
    }

    // 传递给 next 处理异常响应
    return Promise.reject(error)
  })
}
