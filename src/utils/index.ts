export { isString } from 'lodash-es'

/** 用 JS 获取全局 CSS 变量 */
export function getCssVariableValue(cssVariableName: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(cssVariableName)
}

/** 用 JS 设置全局 CSS 变量 */
export function setCssVariableValue(cssVariableName: string, cssVariableValue: string): void {
  document.documentElement.style.setProperty(cssVariableName, cssVariableValue)
}

/**
 * 获取当前设备的屏幕 DPI（每英寸像素数）
 *  此函数通过创建一个宽度为 1 英寸的临时不可见 div 元素，
 *  将其添加到文档中后读取其 offsetWidth 属性来计算当前设备的 DPI，然后移除该元素。
 * @returns {number} 当前设备的 DPI（即 1 英寸所对应的像素数）
 */
export function getDeviceDpi(): number {
  const tempDiv = document.createElement('div')
  tempDiv.style.width = '1in'
  tempDiv.style.visibility = 'hidden'
  document.body.appendChild(tempDiv)
  const dpi = tempDiv.offsetWidth
  document.body.removeChild(tempDiv)
  return dpi
}
