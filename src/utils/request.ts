import axios from 'axios'
import NProgress from 'nprogress'
import { AppEnum } from '@/enums'
import { handleErrorCode } from './status-code'

const { getToken } = useToken() // 解构 Token 处理函数
const { VITE_BASE_API, VITE_REQUEST_TIMEOUT } = useEnv() // 解构环境变量

NProgress.configure({ showSpinner: false }) // 去除进度条加载时右侧的小圆圈

const request = axios.create({
  // baseURL 将自动加在 url 前面，除非 url 是一个绝对 URL
  baseURL: VITE_BASE_API,
  // timeout 指定请求超时的毫秒数(0 表示无超时时间)，如果请求花费了超过 timeout 的时间，请求将被中断
  timeout: VITE_REQUEST_TIMEOUT,
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    NProgress.start() // 开启响应进度条
    // 登录流程控制中，一般根据本地是否存在 token 来判断用户的登录情况
    // 但即使 token 存在，也有可能 token 是过期的，所以在每次的请求头中携带 token
    // 后台根据携带的 token 判断用户的登录情况，并返回给我们对应的业务状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作
    const token = getToken()
    token && Reflect.set(config.headers, AppEnum.AUTHORIZATION, `${AppEnum.TOKEN_PREFIX} ${token}`)
    return config
  },
  (error) => {
    // 关闭响应进度条
    NProgress.done()
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
    const status: number = error.response.status.toString() // status 是 HTTP 状态码
    const message = handleErrorCode(status)
    console.log('响应拦截器异常信息: ', message)
    console.log('响应拦截器异常: ', error) // for debug
    NProgress.done() // 关闭响应进度条
    return Promise.reject(error)
  },
)

export default request
