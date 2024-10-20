/** 校验值是否为 undefined */
export function isUndefined(value: any): boolean {
  return value === void 0
}

/** 校验值是否为 string */
export function isString(value: any): boolean {
  return typeof value === 'string'
}

/** 校验值是否为 number */
export function isNumber(value: any): boolean {
  return typeof value === 'number'
}

/** 校验是否是字符串类型的数字 */
export function isStringNumber(value: string): boolean {
  if (typeof value !== 'string') return false
  return !Number.isNaN(Number(value))
}

/** 校验是否是字符串类型的布尔值 */
export function isStringBoolean(value: string): boolean {
  if (typeof value !== 'string') return false
  return ['true', 'false'].includes(value)
}

/** 校验值是否为 object */
export function isObject(value: any): boolean {
  return value !== null && !Array.isArray(value) && typeof value === 'object'
}

/** 校验数据是否为空 */
export function isEmpty(value: unknown): boolean {
  return (!value && value !== 0) || (Array.isArray(value) && value.length === 0) || (isObject(value) && Object.keys(value).length === 0)
}

/** 校验是否为手机号 */
export function isPhone(phone: string): boolean {
  const reg = /^1[3-9]\d{9}$/
  return reg.test(phone)
}

/** 判断版本号格式是否为 X.Y.Z */
export function isVersion(version: string): boolean {
  const reg = /^\d+(?:\.\d+){2}$/
  return reg.test(version)
}

/** 判断是否为 Email（支持中文邮箱） */
export function isEmail(email: string): boolean {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return reg.test(email)
}

/** 校验是否为 QQ 号码 */
export function isQQ(qq: string): boolean {
  const reg = /^[1-9]\d{4,10}$/
  return reg.test(qq)
}

/** 校验是否为十六进制颜色值 */
export function isHexColor(color: string): boolean {
  const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
  return reg.test(color)
}

/** 校验对象是否为空 */
export function isEmptyObject(obj: Record<string, any>): boolean {
  return Reflect.ownKeys(obj).length === 0 && JSON.stringify(obj) === '{}'
}

/** 判断浏览器是否支持 webp 格式图片 */
export function isSupportWebp(): boolean {
  return !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0
}

/** 校验是否是中文汉字 */
export function isChinese(str: string): boolean {
  const reg = /[\u0391-\uFFE5A-Za-z]+$/
  return reg.test(str)
}

/** 判断时间格式是否为 24 小时制（HH:mm:ss） */
export function is24H(time: string): boolean {
  const reg = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/
  return reg.test(time)
}

/** 校验是否为外链 */
export function isExternal(path: string): boolean {
  const reg = /^(https?:|mailto:|tel:)/
  return reg.test(path)
}

/** 判断是否为网址（带协议） */
export function isUrl(url: string): boolean {
  const reg = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/
  return reg.test(url)
}

/** 判断是否为网址或 IP（带端口） */
export function isUrlPort(url: string): boolean {
  const reg = /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/
  return reg.test(url)
}

/** 判断是否为域名（不带协议） */
export function isDomain(domain: string): boolean {
  const reg = /^([0-9a-zA-Z-]{1,}\.)+([a-zA-Z]{2,})$/
  return reg.test(domain)
}

/** 检验是否为 IPv4 地址 */
export function isIPv4(ip: string): boolean {
  const reg = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/
  return reg.test(ip)
}

/** 判断是否为 MAC 地址 */
export function isMac(mac: string): boolean {
  const reg = /^(([a-f0-9][0,2,4,6,8,a,c,e]:([a-f0-9]{2}:){4})|([a-f0-9][0,2,4,6,8,a,c,e]-([a-f0-9]{2}-){4}))[a-f0-9]{2}$/i
  return reg.test(mac)
}

/** 判断是否为车牌（兼容新能源车牌） */
export function isLicensePlate(plate: string): boolean {
  const reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/
  return reg.test(plate)
}

/** 判断是否为第二代身份证（18 位） */
export function isChineseIdCard(content: string): boolean {
  const reg = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/
  return reg.test(content)
}
