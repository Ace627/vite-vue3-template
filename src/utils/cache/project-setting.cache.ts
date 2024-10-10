import { CacheKey } from '@/config'

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

const projectConfig = useStorage(CacheKey.PROJECT_CONFIG, {} as ProjectConfig)

export const setProjectConfig = (data: ProjectConfig) => (projectConfig.value = data)

export const getProjectConfig = (): ProjectConfig => projectConfig.value

export const removeProjectConfig = () => (projectConfig.value = null)
