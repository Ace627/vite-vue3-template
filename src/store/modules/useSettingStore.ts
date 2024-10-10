import defaultSettings from '@/config/default-settings'
import { removeProjectConfig, setProjectConfig, type ProjectConfig } from '@/utils/cache'

export default defineStore('setting', () => {
  const state: ProjectConfig = reactive(defaultSettings)

  /** 处理保存配置的操作 */
  function saveSetting() {
    const { showSetting, ...config } = state
    setProjectConfig(config as ProjectConfig)
  }

  /** 处理重置配置的操作 */
  function resetSetting() {
    removeProjectConfig()
  }

  return { ...toRefs(state), saveSetting, removeProjectConfig, resetSetting }
})
