// 校验是否为手机号
export const isPhone = (phone: string): boolean => /^1[3-9]\d{9}$/.test(phone)

// 校验是否为邮箱
export const isEmail = (email: string): boolean => /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)

// 校验是否为 QQ 号码
export const isQQ = (qq: string): boolean => /^[1-9]\d{4,10}$/.test(qq)

// 校验是否为十六进制颜色值
export const isHexColor = (color: string): boolean => /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(color)

// 校验是否为外链
export const isExternal = (path: string): boolean => /^(https?:|mailto:|tel:)/.test(path)

// 检验是否为 IPv4 地址
export const isIPv4 = (ip: string): boolean => /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(ip)

// 校验对象是否为空
export const isEmptyObject = (obj: object): boolean => Object.keys(obj).length === 0
