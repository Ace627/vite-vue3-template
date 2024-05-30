export function handleErrorCode(status: number): string {
  const map = new Map<number, string>()
  map.set(400, '请求异常，服务器未操作数据')
  map.set(401, '认证失败，无法访问系统资源')
  map.set(403, '拒绝访问')
  map.set(404, '请求地址出错或访问目标不存在')
  map.set(405, '请求方式不正确')
  map.set(408, '系统接口请求超时，请刷新页面重试')
  map.set(410, '请求的资源已被永久删除')
  map.set(413, '请求实体超过服务器所能处理的最大限制')
  map.set(500, '服务器内部发生错误，无法完成请求')
  map.set(501, '服务器不具备完成请求的功能')
  map.set(502, '服务器网关错误')
  map.set(503, '服务器目前无法使用')
  map.set(504, '服务器响应超时')
  map.set(505, 'HTTP 版本不受支持')
  return map.get(status) || '系统未知错误，请反馈给管理员'
}
