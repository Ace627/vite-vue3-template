export interface SystemSetting {
  /** 主题 */
  theme: 'light' | 'dark'
  /** 是否显示动态标题 */
  showDynamicTitle: boolean
}

export const defaultSettings: SystemSetting = {
  theme: 'light',
  showDynamicTitle: true,
}
