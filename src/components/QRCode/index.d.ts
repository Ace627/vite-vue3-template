/** 二维码组件的类型 */
export interface QRCodeInstance {
  /**
   * @description 二维码转为 base64 格式
   * @returns 转换后的 base64 字符串
   */
  toDataURL: () => string

  /**
   * @description 下载二维码
   * @param fileName 二维码的名字
   */
  download: (fileName?: string) => void
}
