/** 请求参数类型 */
enum ContentTypeEnum {
  /** Body 类型 一般都是前端表单数据传给后端 */
  JSON = 'application/json;charset=UTF-8',
  /** Query 参数类型 */
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  /** 一般用于上传文件 */
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

export default ContentTypeEnum
