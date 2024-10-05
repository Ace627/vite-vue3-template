import axios from 'axios'
import { HttpStatusEnum, RequestMethod } from '@/enums'
import { handleResponseError } from './helper'
import { getAccessToken } from '@/utils/cache/local-storage'

const { VITE_BASE_API, VITE_REQUEST_TIMEOUT, VITE_REQUEST_NPROGRESS } = useEnv() // 解构环境变量
const NProgress = useNProgress({ show: VITE_REQUEST_NPROGRESS }) // 顶部进度条

const request = axios.create({
  // baseURL 将自动加在 url 前面，除非 url 是一个绝对 URL
  baseURL: VITE_BASE_API,
  // timeout 指定请求超时的毫秒数(0 表示无超时时间)，如果请求花费了超过 timeout 的时间，请求将被中断
  timeout: VITE_REQUEST_TIMEOUT * 1000,
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    NProgress.start() // 开启响应进度条
    const timestamp = Date.now()
    const token = getAccessToken()
    const isGetRequest = config.method?.toUpperCase() === RequestMethod.GET
    config.params = config.params || {}
    if (isGetRequest) config.params['timestamp'] = timestamp // 给 get 请求加上时间戳参数，避免从缓存中拿数据
    // 配置请求头
    if (token) config.headers['Authorization'] = `Bearer ${token}` // 让每个请求携带自定义 token 请根据实际情况自行修改
    if (token) config.headers['X-Access-Token'] = token
    config.headers['X-TIMESTAMP'] = timestamp
    // 返回处理后的请求头
    return config
  },
  (error) => {
    // 关闭响应进度条
    NProgress.done()
    // 将原初异常以 Promise 形式暴露给外部调用处理
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    NProgress.done()
    const withoutTransformResponse = response.config.headers['withoutTransformResponse'] === false // 是否返回原生 response.data
    const isBinary = ['blob', 'arraybuffer'].includes(response.request.responseType) // 是否二进制数据
    if (withoutTransformResponse || isBinary) return response.data

    const code = response.data.code || HttpStatusEnum.OK // 非二进制数据进行拦截判定统一处理
    const message = response.data.message || `系统未知错误，请反馈给管理员`
    if (code === HttpStatusEnum.OK) return response.data.result

    alert(message) // 此处可统一处理错误的提示消息
    return Promise.reject(new Error(message))
  },
  (error: any) => {
    NProgress.done()
    handleResponseError(error) // 根据响应异常时的 Error 提取解析出符合直觉的 Message
    return Promise.reject(error)
  },
)

export default request
