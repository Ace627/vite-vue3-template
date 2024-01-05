/** 生成指定范围的随机数 包含边界值 */
export function randomCount(min = 2, max = 10): number {
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

/** 深拷贝，支持日期、正则、函数 */
export function deepClone(source: any): any {
  if (!source || typeof source !== 'object') return source
  if (source instanceof Date) return new Date(source)
  if (source instanceof RegExp) return new RegExp(source)
  const target = Array.isArray(source) ? ([] as Record<any, any>) : ({} as Record<string, any>)
  for (const key in source) target[key] = typeof source[key] === 'object' ? deepClone(source[key]) : source[key]
  return target
}

/** 获取变量的真实类型 */
export function getRawType(variable: any): string {
  return Object.prototype.toString.call(variable).split(' ')[1].replace(']', '').toLowerCase()
}

/** 反转字符串 */
export function reverseString(str: string): string {
  return str.split('').reverse().join('')
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

/** 复制文本到剪贴板 */
export function copyText(text: string): void {
  // 是否支持 navigator.clipboard 属性
  const isClipboardApiSupported = window.navigator && window.navigator.clipboard
  if (isClipboardApiSupported) {
    window.navigator.clipboard.writeText(text)
  } else {
    const textarea = document.createElement('textarea')
    textarea.readOnly = true
    textarea.value = text
    textarea.style.position = 'absolute'
    textarea.style.top = '-9999px'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
  }
}
