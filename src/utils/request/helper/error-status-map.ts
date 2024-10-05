/** 响应错误码的 map 取值 */
export const ErrorStatusMap: Record<string | number, string> = {
  400: '请求异常，服务器未操作数据',
  401: '认证失败，无法访问系统资源',
  403: '拒绝访问',
  404: '请求地址出错或访问目标不存在',
  405: '请求方式不正确',
  408: '系统接口请求超时，请刷新页面重试',
  410: '请求的资源已被永久删除',
  413: '请求实体超过服务器所能处理的最大限制',
  500: '服务器内部发生错误，无法完成请求',
  501: '服务器不具备完成请求的功能',
  502: '服务器网关错误',
  503: '服务器目前无法使用',
  504: '服务器响应超时',
  505: 'HTTP 版本不受支持',
  default: "'系统未知错误，请反馈给管理员'",
}
