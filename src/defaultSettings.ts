export interface SystemSetting {
  /** 主题 */
  theme: 'light' | 'dark'
  /** 组件大小 */
  size: 'default' | 'small' | 'large'
  /** 是否显示动态标题 */
  showDynamicTitle: boolean
}

export const defaultSettings: SystemSetting = {
  theme: 'light',
  size: 'default',
  showDynamicTitle: true,
}
