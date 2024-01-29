/**
 * 利用 a 标签进行下载
 * @param {String} fileURL
 * @param {String} fileName
 */
export function linkDownload(fileURL: string, fileName = Date.now().toString()): void {
  const a = document.createElement('a')
  a.style.position = 'relative' // 确保临时元素不会显示在页面中
  a.style.left = '-999999px'
  a.style.top = '-999999px'
  a.href = fileURL
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

/**
 * Buffer 转 Blob
 * @param {Buffer} buffer 待转换的 Buffer 数据
 * @param {String} blobType 目标 Blob 的数据 MIME 类型
 * @returns {Blob} 转换后的 Blob 数据
 */
export function bufferToBlob(buffer: Buffer, blobType = 'application/actet-stream'): Blob {
  const unit8Array = new Uint8Array(buffer)
  return new Blob([unit8Array], { type: blobType })
}

/**
 * 图片转为 Base64 字符串
 * @param {String} imgURL 待转换的图片路径
 * @param {String} type 转换后的图片类型
 * @param  {Number} quality 转换后的图片质量
 * @returns {String} Base64 字符串
 */
export function imageToBase64(imgURL: string, mimeType: 'image/jpeg' | 'image/png' | 'image/webp' = 'image/jpeg', quality = 1): Promise<string> {
  const img = new Image()
  // 因为是网络资源所以会有图片跨域问题产生，此属性可以解决跨域问题
  img.setAttribute('crossOrigin', 'anonymous')
  // 如果需要兼容 iOS，这两个顺序一定不能换，先设置 crossOrigin 后设置 src
  img.src = imgURL
  return new Promise((resolve, reject) => {
    img.onload = () => {
      const cvs = document.createElement('canvas')
      cvs.width = img.width
      cvs.height = img.height
      const ctx = cvs.getContext('2d')!
      ctx.drawImage(img, 0, 0, cvs.width, cvs.height)
      resolve(cvs.toDataURL(mimeType, quality))
    }
    img.onerror = (error: any) => reject(error)
  })
}
