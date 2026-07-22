import type { AxiosInstance } from 'axios'
import { getAccessToken } from '@/utils/cache/token.cache'

/**
 * JWT 鉴权拦截器
 * 请求发起时自动携带 Authorization Token，实现无感身份认证
 * @param instance Axios 实例
 */
export function jwtAuthInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use((config) => {
    const accessToken = getAccessToken()
    if (accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`
    return config
  })
}
