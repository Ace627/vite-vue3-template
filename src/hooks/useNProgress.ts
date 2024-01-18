import NProgress from 'nprogress'
import type { NProgressOptions } from 'nprogress'

export default (config: Partial<NProgressOptions> = {}) => {
  config.showSpinner = config.showSpinner || false // 右侧加载小圈圈默认不展示
  NProgress.configure(config)

  const start = () => NProgress.start()
  const done = () => NProgress.done()

  return { start, done }
}
