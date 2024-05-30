import defaultSettings, { type ProjectConfig } from '@/config/default-settings'
import { removeProjectConfig, setProjectConfig } from '@/utils/cache/local-storage'

export default defineStore('setting', () => {
  const state: ProjectConfig = reactive(defaultSettings)

  /** 处理保存配置的操作 */
  function saveSetting() {
    const { showSetting, ...config } = state
    setProjectConfig(config)
  }

  /** 处理重置配置的操作 */
  function resetSetting() {
    removeProjectConfig()
  }

  return { ...toRefs(state), saveSetting, removeProjectConfig, resetSetting }
})
