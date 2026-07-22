import axios from 'axios'
import { jwtAuthInterceptor } from './interceptor/jwt-auth'
import { responseErrorInterceptor } from './interceptor/response-error'
import { responseTransformInterceptor } from './interceptor/response-transform'

const instance = axios.create({
  // baseURL 将自动加在 url 前面，除非 url 是一个绝对 URL
  baseURL: import.meta.env.VITE_BASE_API,
  // timeout 指定请求超时的毫秒数(0 表示无超时时间)，如果请求花费了超过 timeout 的时间，请求将被中断
  timeout: parseInt(import.meta.env.VITE_REQUEST_TIMEOUT || '0') * 1000,
})

// JWT 认证拦截器
jwtAuthInterceptor(instance)
// 响应转换拦截器
responseTransformInterceptor(instance)
// 响应错误拦截器
responseErrorInterceptor(instance)

export const request = instance
