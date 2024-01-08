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
