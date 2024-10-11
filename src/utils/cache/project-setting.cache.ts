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

/** 存储项目配置信息到本地 */
export function setProjectConfig(data: ProjectConfig): void {
  projectConfig.value = data
}

/** 从本地获取存储项目配置信息 */
export function getProjectConfig(): ProjectConfig {
  return projectConfig.value
}

/** 从本地移除存储项目配置信息 */
export function removeProjectConfig(): void {
  projectConfig.value = null
}
