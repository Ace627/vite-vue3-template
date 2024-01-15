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
  a.remove()
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
