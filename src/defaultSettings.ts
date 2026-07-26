export interface SystemSetting {
  /** 主题 */
  theme: 'light' | 'dark'
  /** 组件大小 */
  size: 'default' | 'small' | 'large'
  /** 是否显示动态标题 */
  showDynamicTitle: boolean
  /** 是否显示系统水印 */
  showWatermark: boolean
  /** 路由转场动效 */
  transition: 'fade-transform' | 'el-fade-in-linear' | 'el-fade-in' | 'el-zoom-in-center' | 'el-zoom-in-top' | 'el-zoom-in-bottom'
}

export const defaultSettings: SystemSetting = {
  theme: 'light',
  size: 'default',
  transition: 'fade-transform',
  showDynamicTitle: true,
  showWatermark: true,
}
