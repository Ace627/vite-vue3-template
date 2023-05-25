/**
 * 深拷贝，支持日期、正则、函数
 */
export const deepClone = (source: any): any => {
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
export const getRawType = (variable: any): string => Object.prototype.toString.call(variable).split(' ')[1].replace(']', '').toLowerCase()

/**
 * 随机生成 Hex 格式的颜色
 */
export const getRandomHexColor = (): string => `#${Math.floor(Math.random() * 0xffffff).toString(16)}`

/**
 * 随机生成 RGB 格式的颜色
 */
export const getRandomRgbColor = (): string => {
  const random = (): number => Math.floor(Math.random() * 256)
  return `rgb(${random()}, ${random()}, ${random()})`
}

/**
 * 反转字符串
 */
export const reverseString = (str: string): string => str.split('').reverse().join('')
