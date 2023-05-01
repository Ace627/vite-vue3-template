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
    NProgress.start()
    return config
  },
  error => {
    NProgress.done()
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    NProgress.done()
    return response.data
  },
  error => {
    NProgress.done()
    return Promise.reject(error)
  },
)

export default request
