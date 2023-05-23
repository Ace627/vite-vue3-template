/**
 * 深拷贝，支持日期、正则、函数
 */
export const deepClone = (source: any): any => {
  if (!source || typeof source !== 'object') return source
  if (source instanceof Date) return new Date(source)
  if (source instanceof RegExp) return new RegExp(source)
  const target = Array.isArray(source) ? ([] as any[]) : ({} as { [key: string]: any })
  for (const key in source) target[key] = typeof source[key] === 'object' ? deepClone(source[key]) : source[key]
  return target
}

/**
 * 获取变量的真实类型
 */
export const getRawType = (variable: any): string => {
  return Object.prototype.toString.call(variable).split(' ')[1].replace(']', '').toLowerCase()
}

/**
 * 随机生成十六进制的颜色
 */
export const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
}
