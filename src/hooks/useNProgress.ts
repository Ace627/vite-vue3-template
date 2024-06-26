import NProgress from 'nprogress'
import type { NProgressOptions } from 'nprogress'

interface NProgressConfig extends NProgressOptions {
  show: boolean
}

const defaultConfig: Partial<NProgressConfig> = {
  /** CSS3 缓冲动画字符串 如 ease、linear、ease-in、ease-out、ease-in-out、cubic-bezier 等 */
  easing: 'ease',
  /** 指定进度条的父容器 */
  parent: 'body',
  /** 自定义配置 方便利用环境变量统一控制加载条的显示与否 */
  show: true,
  /** 是否显示右侧的环形进度动画 */
  showSpinner: false,
  /** 是否开启自动递增 */
  trickle: true,
  /** 设置开始时最低百分比 */
  minimum: 0.08,
  /** 动画速度 单位 ms */
  speed: 200,
}

export default (config: Partial<NProgressConfig> = {}) => {
  const mergeConfig = Object.assign(defaultConfig, config)
  NProgress.configure(mergeConfig)

  const start = () => config.show && NProgress.start()
  const done = () => config.show && NProgress.done()

  return { start, done }
}
