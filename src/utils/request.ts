import axios from 'axios'
import { AppEnum, RequestMethodEnum } from '@/enums'
import { handleErrorCode } from './status-code'

const { getToken } = useToken() // 解构 Token 处理函数
const { VITE_BASE_API, VITE_REQUEST_TIMEOUT } = useEnv() // 解构环境变量
const NProgress = useNProgress() // 顶部进度条

const request = axios.create({
  // baseURL 将自动加在 url 前面，除非 url 是一个绝对 URL
  baseURL: VITE_BASE_API,
  // timeout 指定请求超时的毫秒数(0 表示无超时时间)，如果请求花费了超过 timeout 的时间，请求将被中断
  timeout: VITE_REQUEST_TIMEOUT * 1000,
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    if (config.method?.toUpperCase() === RequestMethodEnum.GET) {
      config.params = Object.assign(config.params || {}, { timestamp: Date.now() }) // 给 get 请求加上时间戳参数，避免从缓存中拿数据
    }
    NProgress.start() // 开启响应进度条
    const token = getToken()
    token && Reflect.set(config.headers, AppEnum.AUTHORIZATION, `${AppEnum.TOKEN_PREFIX} ${token}`) // 让每个请求携带自定义 token 请根据实际情况自行修改
    return config
  },
  (error) => {
    NProgress.done() // 关闭响应进度条
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    NProgress.done() // 关闭响应进度条
    if (['blob', 'arraybuffer'].includes(response.request.responseType)) return response.data // 二进制数据则直接返回
    return response.data
  },
  (error: any) => {
    const status: number = error.response.status // status 是 HTTP 状态码
    const message = handleErrorCode(status)
    console.log('响应拦截器异常信息: ', message)
    console.log('响应拦截器异常: ', error) // for debug
    NProgress.done() // 关闭响应进度条
    return Promise.reject(error)
  },
)

export default request
