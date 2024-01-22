/**
 * 人的性别的代码枚举 标准号：GB/T 2261.1-2003
 * 参考：http://c.gb688.cn/bzgk/gb/showGb?type=online&hcno=0FC942D542BC6EE3C707B2647EF81CD8
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

/** 项目常用值枚举 */
export enum AppEnum {
  /** 凭证请求头的 Key */
  AUTHORIZATION = 'Authorization',
  /** Token 前缀字符 */
  TOKEN_PREFIX = 'Beraer',
  /** 自定义环境变量前缀 */
  ENV_PREFIX = 'VITE_',
}

/** 请求参数类型 */
export enum ContentTypeEnum {
  /** Body 类型 一般都是前端表单数据传给后端 */
  JSON = 'application/json;charset=UTF-8',
  /** Query 参数类型 */
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  /** 一般用于上传文件 */
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

/** 请求方式的枚举值 */
export enum RequestMethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
