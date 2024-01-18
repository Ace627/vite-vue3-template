export function handleErrorCode(status: number) {
  const map = new Map<number, string>()
  map.set(401, '认证失败，无法访问系统资源')
  map.set(403, '拒绝访问')
  map.set(404, '请求地址出错')
  map.set(408, '系统接口请求超时')
  map.set(500, '服务器内部错误')
  map.set(501, '服务未实现')
  map.set(503, '服务不可用')
  map.set(504, '网关超时')
  map.set(505, 'HTTP 版本不受支持')
  return map.get(status) || '系统未知错误，请反馈给管理员'
}
