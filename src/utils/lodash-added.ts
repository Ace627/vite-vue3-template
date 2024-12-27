// 查看更多：https://juejin.cn/post/7451418558770806819
import { isString } from 'lodash-es'

/* -------------------------------------------------------------------------- */
/*                              Validate Handler                              */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                               Random Handler                               */
/* -------------------------------------------------------------------------- */

/** 生成一个随机布尔值 */
export function randomBoolean(): boolean {
  return Math.random() >= 0.5
}

/** 从数组中生成一个随机索引 */
export function randomArrayIndex<T = any>(array: Array<T>): number {
  if (array.length === 0) throw new Error('数组不能为空')
  return Math.floor(Math.random() * array.length)
}

/* -------------------------------------------------------------------------- */
/*                                Data Handler                                */
/* -------------------------------------------------------------------------- */

/** 复制文本到剪贴板 */
export async function copyText(value: string | number | object) {
  let text: string
  const isClipboardApiSupported = window.navigator && window.navigator.clipboard

  if (typeof value === 'string') {
    text = value
  } else if (typeof value === 'number') {
    text = value.toString()
  } else if (typeof value === 'object') {
    text = JSON.stringify(value, null, 2)
  } else {
    throw new Error('不支持的参数类型')
  }

  if (isClipboardApiSupported) {
    window.navigator.clipboard.writeText(text)
  } else {
    const textarea = document.createElement('textarea')
    textarea.readOnly = true
    textarea.value = text
    textarea.style.position = 'absolute'
    textarea.style.top = '-9999px'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
  }
}

/** 一个利用 a 标签下载文件的函数 */
export function linkDownload(fileURL: string | Blob | File, fileName?: string): void {
  let href: string = isString(fileURL) ? fileURL : URL.createObjectURL(fileURL)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = href
  a.download = fileName || Date.now().toString()
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  if (!isString(fileURL)) URL.revokeObjectURL(href)
}

/** 图片转为 Base64 字符串 */
export function imageToBase64(imgURL: string, quality = 0.9): Promise<string> {
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
      resolve(cvs.toDataURL('image/png', quality))
    }
    img.onerror = (error: any) => reject(error)
  })
}
