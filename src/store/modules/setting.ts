import { defaultSettings, type SystemSetting } from '@/defaultSettings'
import { getSystemSetting, removeSystemSetting, setSystemSetting, TipModal } from '@/utils'
import { merge } from 'lodash-es'

export const useSettingStore = defineStore('setting', () => {
  const state = reactive<SystemSetting>(merge({}, defaultSettings, getSystemSetting()))

  const isDark = computed(() => state.theme === 'dark')

  /** 是否显示设置面板 */
  const showSetting = ref<boolean>(false)

  /** 保存设置到本地 */
  function saveSetting(config: Partial<{ showTip: boolean }> = {}) {
    const showTip = config.showTip ?? true
    if (showTip) TipModal.showLoading('正在保存到本地，请稍候...')
    setSystemSetting(toRaw(state))
    if (showTip) setTimeout(() => TipModal.hideLoading(), 1500)
  }

  /** 重置设置并刷新页面 */
  function resetSetting() {
    TipModal.showLoading('正在清除设置缓存并刷新，请稍候...')
    removeSystemSetting()
    setTimeout(() => window.location.reload(), 1500)
  }

  return { ...toRefs(state), showSetting, isDark, saveSetting, resetSetting }
})
