import { randomFullClose } from '@/utils'
import { isHexColor } from '@/utils/validate'

/** 随机生成十六进制颜色 */
export function generateHexColor(): string {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
}

/** 随机生成 Hexa 颜色 */
export function generateHexaColor(): string {
  return `#${Math.floor(Math.random() * 0xffffffff).toString(16)}`
}

/** 随机 RGB 颜色 */
export function generateRgbColor(): string {
  return `rgb(${randomFullClose(0, 255)}, ${randomFullClose(0, 255)}, ${randomFullClose(0, 255)})`
}

/** 随机 RGBA 颜色 */
export function generateRgbaColor(): string {
  const r = randomFullClose(0, 255)
  const g = randomFullClose(0, 255)
  const b = randomFullClose(0, 255)
  const alpha = Math.random().toFixed(1)
  return `rgb(${r}, ${g}, ${b}, ${alpha})`
}

/** RGB 颜色值转换为 十六进制颜色值 */
export function rgbToHex(r: number, g: number, b: number): string {
  const hex = ((r << 16) | (g << 8) | b).toString(16)
  return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex
}

/** 十六进制颜色值 转换为 RGB 颜色值 */
export function hexToRgb(hex: string): string {
  let sHex = hex.toLowerCase()
  if (!isHexColor(hex)) throw new Error('Please enter hex color')
  if (sHex.length === 4) {
    let sColorNew = '#'
    for (let i = 1; i < 4; i += 1) sColorNew += sHex.slice(i, i + 1).concat(sHex.slice(i, i + 1))
    sHex = sColorNew
  }
  const sColorChange: number[] = []
  for (let i = 1; i < 7; i += 2) sColorChange.push(parseInt('0x' + sHex.slice(i, i + 2)))
  return 'rgb(' + sColorChange.join(',') + ')'
}
