import request from '@/utils/request'
import { ContentTypeEnum } from '@/enums'
import type { AxiosRequestConfig } from 'axios'

/** Get 请求封装 */
export function getAction<T = any>(url: string, params: Recordable = {}, config: AxiosRequestConfig = {}) {
  return request.get<any, T>(url, { ...config, params })
}

/** Delete 请求封装 */
export function deleteAction<T = any>(url: string, params: Recordable = {}) {
  return request.delete<any, T>(url, { params })
}

/** Post 请求封装 */
export function postAction<T = any>(url: string, data: Recordable = {}) {
  return request.post<any, T>(url, data)
}

/** Put 请求封装 */
export function putAction<T = any>(url: string, data: Recordable = {}, config: AxiosRequestConfig = {}) {
  return request.put<any, T>(url, data, config)
}

/** Upload 请求封装 */
export function uploadAction<T = any>(url: string, data: FormData) {
  return request.post<any, T>(url, data, { headers: { 'Content-Type': ContentTypeEnum.FORM_DATA } })
}
