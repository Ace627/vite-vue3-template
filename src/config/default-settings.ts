import { getProjectConfig } from '@/utils/cache/local-storage'

/** 项目配置类型 */
export interface ProjectConfig {
  /** 是否显示 Settings Panel */
  showSetting: boolean
  /** 是否固定头部导航 */
  fixedHeader: boolean
  /** 是否显示灰色模式 */
  showGreyMode: boolean
  /** 是否显示色弱模式 */
  showColorWeakness: boolean
  /** 内容区域转场动效 */
  transitionName: 'fade-transform'
}

/** 默认配置 */
const defaultSettings: ProjectConfig = {
  showSetting: false,
  fixedHeader: true,
  showGreyMode: false,
  showColorWeakness: false,
  transitionName: 'fade-transform',
}

/** 合并后的配置 */
export default Object.assign(defaultSettings, getProjectConfig())
