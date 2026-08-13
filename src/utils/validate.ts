export { isEmpty } from 'lodash-es'
export { isArray } from 'lodash-es'
export { isString } from 'lodash-es'
export { isNumber } from 'lodash-es'
export { isBoolean } from 'lodash-es'
export { isPlainObject } from 'lodash-es'

/**
 * 判断链接是否为外部链接
 * @param value - 待判断的链接/路径
 * @returns boolean
 */
export function isExternal(value: unknown): boolean {
  if (typeof value !== 'string') return false
  const trimmedValue = value.trim()
  if (trimmedValue === '') return false
  return /^(https?:|ftp:|sftp:|mailto:|tel:|file:|\/\/)/i.test(trimmedValue)
}

/**
 * 判断字符串是否为有效的数字格式
 * 支持整数、小数、负数和科学计数法
 * @param value - 待判断的值
 * @returns boolean
 */
export function isStringNumber(value: unknown): boolean {
  if (typeof value !== 'string') return false
  const trimmedValue = value.trim()
  if (trimmedValue === '') return false
  return /^-?\d+(\.\d+)?$/.test(trimmedValue) // 匹配整数或浮点数
}

/**
 * 判断字符串是否为合法的 JSON 对象或数组格式
 * @param value - 待判断的值
 * @returns 是合法 JSON 对象/数组则返回 true，原始值（如字符串、数字）返回 false
 */
export function isJsonString(value: unknown): boolean {
  try {
    if (typeof value !== 'string') return false
    const trimmedValue = value.trim()
    if (trimmedValue === '') return false
    const first = trimmedValue[0]
    const last = trimmedValue[trimmedValue.length - 1]
    if ((first !== '{' || last !== '}') && (first !== '[' || last !== ']')) return false
    JSON.parse(trimmedValue)
    return true
  } catch {
    return false
  }
}
