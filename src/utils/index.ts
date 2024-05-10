/** 取得 [n, m] 范围内随机整数 */
export function randomFullClose(min: number, max: number): number {
  if (min > max) throw new Error(`min must be less than max!`)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/** 延时函数 指定 ms 后再执行后续函数 */
export function sleep(delay = 1000): Promise<void> {
  return new Promise((resolve, _) => setTimeout(() => resolve(), delay))
}

/** 用 JS 获取全局 CSS 变量 */
export function getCssVariableValue(cssVariableName: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(cssVariableName)
}

/** 用 JS 设置全局 CSS 变量 */
export function setCssVariableValue(cssVariableName: string, cssVariableValue: string): void {
  document.documentElement.style.setProperty(cssVariableName, cssVariableValue)
}

/** 获取变量的真实类型 */
export function getRawType(variable: any): VariableType {
  return Object.prototype.toString.call(variable).split(' ')[1].replace(']', '').toLowerCase() as VariableType
}

/** 反转字符串 */
export function reverseString(str: string): string {
  return str.split('').reverse().join('')
}

/** 驼峰字符串转下划线字符串 */
export function humpToUnderline(str: string): string {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}

/** 下划线字符串转驼峰字符串  */
export function underlineToHump(str: string): string {
  return str.replace(/\_(\w)/g, (_, letter: string) => letter.toUpperCase())
}

/** 驼峰字符串转中划线字符串 */
export function humpToDash(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

/** 中划线字符串转驼峰字符串 */
export function dashToHump(str: string): string {
  return str.replace(/\-(\w)/g, (_, letter: string) => letter.toUpperCase())
}

/** 通过名称获取 URL 查询参数 */
export function getQueryByName(name: string): string {
  const queryNameRegExp = new RegExp(`[?&]${name}=([^&]*)(?:&|$)`)
  const queryNameMatch = window.location.href.match(queryNameRegExp)
  return queryNameMatch ? decodeURIComponent(queryNameMatch[1]) : ''
}

/** 查询字符串转对象 */
export function getQueryObject(url?: string): Record<string, string> {
  url = url ? url : window.location.href
  const search = url.substring(url.lastIndexOf('?') + 1)
  const query: Record<string, string> = {}
  const list = search.split('&')
  for (const item of list) {
    if (!item.includes('=')) continue
    const [key, value] = item.split('=')
    query[key] = value
  }
  return query
}
