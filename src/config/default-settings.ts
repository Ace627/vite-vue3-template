import { getProjectConfig, type ProjectConfig } from '@/utils/cache'

/** 默认配置 */
const defaultSettings: ProjectConfig = {
  showSetting: false,
  fixedHeader: true,
  showGreyMode: false,
  showColorWeakness: false,
  transitionName: 'fade-transform'
}

/** 合并后的配置 */
export default Object.assign(defaultSettings, getProjectConfig())
