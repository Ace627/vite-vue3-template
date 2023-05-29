import axios from 'axios'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false }) // 去除进度条加载时右侧的小圆圈

const request = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 6 * 1000,
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 开启响应进度条
    NProgress.start()
    return config
  },
  error => {
    // 关闭响应进度条
    NProgress.done()
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 关闭响应进度条
    NProgress.done()
    return response.data
  },
  (error: any) => {
    let message: string = error.message
    if (message.includes('Network Error')) {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substring(message.length - 3) + '异常'
    }
    // 关闭响应进度条
    NProgress.done()
    return Promise.reject(error)
  },
)

export default request
