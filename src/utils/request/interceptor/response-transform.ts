import { HttpStatusCode } from 'axios'
import type { AxiosInstance } from 'axios'

export function responseTransformInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    async (response) => {
      const responseType = response.config.responseType || ''
      const contentType = (response.headers['content-type'] || '') as string
      let code = response.data.code || HttpStatusCode.Ok
      let message = response.data.message || response.data.msg

      const isJsonBlob = response.data instanceof Blob && response.data.type.includes('application/json')
      const isJsonStream = response.data instanceof ReadableStream && contentType.includes('application/json')

      // 处理二进制返回出现的 JSON 字符串情况
      if (isJsonBlob || isJsonStream) {
        const info = await new Response(response.data).json()
        code = info.code
        message = info.message
      }

      // 传递给 responseErrorInterceptor 处理异常响应
      if (code !== HttpStatusCode.Ok) return Promise.reject({ response: { status: code, data: { message } } })

      // 处理二进制响应
      if (['arraybuffer', 'blob'].includes(responseType)) return response

      // 处理流式响应
      if (responseType === 'stream') return response.data

      // 处理普通响应
      if (code === HttpStatusCode.Ok) return response.data.data

      return response
    },
    (error) => {
      return Promise.reject(error)
    },
  )
}
