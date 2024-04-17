import NProgress from 'nprogress'
import type { NProgressOptions } from 'nprogress'

interface NProgressConfig extends NProgressOptions {
  show: boolean
}

export default (config: Partial<NProgressConfig> = { show: true }) => {
  config.showSpinner = config.showSpinner || false // 右侧加载小圈圈默认不展示
  NProgress.configure(config)

  const start = () => config.show && NProgress.start()
  const done = () => config.show && NProgress.done()

  return { start, done }
}
