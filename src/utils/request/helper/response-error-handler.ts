import { ErrorStatusMap } from './error-status-map'

/** 根据响应异常时的 Error 提取解析出符合直觉的 Message */
export function handleResponseError(error: any): string {
  let message: string = error.message

  // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
  if (error.response) message = ErrorStatusMap[error.response.status ?? 'default']

  // for debug
  console.log('响应拦截器异常: ', message || error.message || error)

  // 对消息做一个集中的反馈提示 可结合组件库的 Message 组件使用
  alert(message)

  return message
}
