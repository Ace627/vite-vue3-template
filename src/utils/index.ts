/**
 * 深拷贝，支持日期、正则、函数
 */
export function deepClone(source: any): any {
  if (!source || typeof source !== 'object') return source
  if (source instanceof Date) return new Date(source)
  if (source instanceof RegExp) return new RegExp(source)
  const target = Array.isArray(source) ? ([] as Record<any, any>) : ({} as Record<string, any>)
  for (const key in source) target[key] = typeof source[key] === 'object' ? deepClone(source[key]) : source[key]
  return target
}

/**
 * 获取变量的真实类型
 */
export function getRawType(variable: any): string {
  return Object.prototype.toString.call(variable).split(' ')[1].replace(']', '').toLowerCase()
}

/**
 * 反转字符串
 */
export function reverseString(str: string): string {
  return str.split('').reverse().join('')
}

/**
 * 通过名称获取 URL 查询参数
 */
export function getQueryByName(name: string) {
  const queryNameRegExp = new RegExp(`[?&]${name}=([^&]*)(?:&|$)`)
  const queryNameMatch = window.location.href.match(queryNameRegExp)
  return queryNameMatch ? decodeURIComponent(queryNameMatch[1]) : ''
}

/**
 * @description 复制文本到剪贴板
 * @param {string} text 被复制的文本
 */
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
