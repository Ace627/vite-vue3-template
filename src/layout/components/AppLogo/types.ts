/**
 * AppLogo 组件的 Props 定义
 * 全部通过 props 控制展示，组件本身不依赖任何全局状态，可任意拼装复用
 */
export interface AppLogoProps {
  /** 是否显示应用标题文字（如侧边栏折叠时传 false，只展示图标） */
  showTitle?: boolean
  /** 标题文字内容，不传则默认使用环境变量 VITE_APP_TITLE */
  title?: string
}
