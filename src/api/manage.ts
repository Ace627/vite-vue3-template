import request from '@/utils/request'
import { ContentTypeEnum } from '@/enums'

/** Get 请求封装 */
export function getAction<T = any>(url: string, params: Recordable = {}) {
  return request.get<any, T>(url, { params })
}

/** Post 请求封装 */
export function postAction<T = any>(url: string, params: Recordable = {}) {
  return request.post<any, T>(url, params)
}

/** Put 请求封装 */
export function putAction<T = any>(url: string, params: Recordable = {}) {
  return request.put<any, T>(url, params)
}

/** Delete 请求封装 */
export function deleteAction<T = any>(url: string, params: Recordable = {}) {
  return request.delete<any, T>(url, { params })
}

/** Upload 请求封装 */
export function uploadAction<T = any>(url: string, params: FormData) {
  return request.post<any, T>(url, params, { headers: { 'Content-Type': ContentTypeEnum.FORM_DATA } })
}
