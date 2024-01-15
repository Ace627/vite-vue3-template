/**
 * 性别枚举值 标准号：GB/T 2261.1-2003
 * 参考：https://openstd.samr.gov.cn/bzgk/gb/newGbInfo?hcno=0FC942D542BC6EE3C707B2647EF81CD8
 */
export enum GenderEnum {
  /** 未知的性别 */
  UNKNOWN = 0,
  /** 男性 */
  MALE = 1,
  /** 女性 */
  FEMALE = 2,
}

/** 缓存数据时用到的 Key */
export enum CacheKeyEnum {
  TOKEN = 'Admin_Token_Key',
}
