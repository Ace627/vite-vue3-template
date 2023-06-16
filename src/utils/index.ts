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
 * 随机生成 Hex 格式的颜色
 */
export function getRandomHexColor(): string {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
}

/**
 * 随机生成 RGB 格式的颜色
 */
export const getRandomRgbColor = (): string => {
  const random = (): number => Math.floor(Math.random() * 256)
  return `rgb(${random()}, ${random()}, ${random()})`
}

/**
 * RGB 颜色值转换为 十六进制颜色值； r g b 需要在 [0, 255] 范围内
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  const hex = ((r << 16) | (g << 8) | b).toString(16)
  return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex
}

/**
 * 十六进制颜色值 转换为  RGB 颜色值
 */
export const hexToRgb = (hex: string): string => {
  let sHex = hex.toLowerCase()
  if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex)) {
    if (sHex.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) sColorNew += sHex.slice(i, i + 1).concat(sHex.slice(i, i + 1))
      sHex = sColorNew
    }
    const sColorChange: number[] = []
    for (let i = 1; i < 7; i += 2) sColorChange.push(parseInt('0x' + sHex.slice(i, i + 2)))
    return 'RGB(' + sColorChange.join(',') + ')'
  }
  return sHex
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
