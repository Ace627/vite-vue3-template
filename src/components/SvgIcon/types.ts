/**
 * SVG 图标组件属性
 */
export interface SvgIconProps {
  /** 图标名称，对应 src/assets/svg-icons 下「清理后」的文件名（不含 .svg） */
  name: string
  /** 图标颜色，支持色值或 CSS 变量；默认继承当前文字颜色 */
  color?: string
  /** 尺寸：number 自动加 px，string 原样（如 '1em'/'16px'/'2rem'） */
  size?: string | number
}
