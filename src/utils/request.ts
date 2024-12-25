import axios, { HttpStatusCode } from 'axios'
import { getAccessToken } from '@/utils/cache'

/** 根据配置决定是否开启请求接口时的顶部进度条 */
const NProgress = useNProgress({ show: import.meta.env.VITE_REQUEST_NPROGRESS === 'true' }) // 顶部进度条

const request = axios.create({
  // baseURL 将自动加在 url 前面，除非 url 是一个绝对 URL
  baseURL: import.meta.env.VITE_BASE_API,
  // timeout 指定请求超时的毫秒数(0 表示无超时时间)，如果请求花费了超过 timeout 的时间，请求将被中断
  timeout: parseInt(import.meta.env.VITE_REQUEST_TIMEOUT) * 1000,
  // 初始化一下 query 请求对象 方便写入全局自定义参数
  params: {},
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    NProgress.start() // 开启响应进度条
    const timestamp = Date.now()
    const accessToken = getAccessToken()

    // 给 get 请求加上时间戳参数，避免从缓存中拿数据
    if (config.method?.toUpperCase() === 'GET') Reflect.set(config.params, 'timestamp', timestamp)

    // 让每个请求携带自定义 token 请根据实际情况自行修改
    if (accessToken) Reflect.set(config.headers, 'Authorization', `Bearer ${accessToken}`)

    // 返回处理后的请求头
    return config
  },
  (error) => {
    NProgress.done()
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  async (response) => {
    NProgress.done()
    // 未设置状态码则默认成功状态
    let code = response.data.code || HttpStatusCode.Ok
    // 获取错误信息
    let message = response.data.message || `系统未知错误，请反馈给管理员`
    // 校验是否为 JSON 类型 Blob 数据
    const isJsonBlob = response.request.responseType === 'blob' && response.data.type === 'application/json'
    // 如果设置了 responseType: 'blob'，即使后端返回的内容是 JSON 错误信息，前端仍会将其作为 blob 处理
    // 因此，需要在前端额外检测返回的 Blob 数据是否实际上是一个 JSON 错误信息
    if (isJsonBlob) {
      const text = await response.data.text()
      const errorData = JSON.parse(text) // 转为 JSON 对象
      code = errorData.code
      message = errorData.message
    }
    // 二进制数据则直接返回
    if (['arraybuffer', 'blob'].includes(response.request.responseType) && !isJsonBlob) {
      return response.data
    }
    // 非二进制且状态码为成功状态码 直接返回具体数据 {code, message, result, timestamp}
    if (code === HttpStatusCode.Ok) {
      return response.data.result
    }
    // 能到这里的基本都是异常返回了
    alert(message) // 此处可统一处理错误的提示消息
    return Promise.reject(new Error(message))
  },
  (error: any) => {
    NProgress.done()
    // 参考：https://gitee.com/y_project/RuoYi-Vue/blob/master/ruoyi-ui/src/utils/request.js
    let { message } = error
    if (message == 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = `系统接口 ${message.substr(message.length - 3)} 异常`
    }
    // 如果后端返回错误提示信息，则采用该信息提示
    // if (error.response && error.response.data && error.response.data.message) {
    //   message = error.response.data.message
    // }
    alert(message)
    return Promise.reject(error)
  },
)

export default request
