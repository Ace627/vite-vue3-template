import { fileURLToPath, URL } from 'node:url'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons2'

export function registerSvgIcons() {
  return createSvgIconsPlugin({
    iconDirs: [fileURLToPath(new URL('../../src/assets/svg-icons', import.meta.url))], // 指定图标文件夹
    symbolId: 'icon-[dir]-[name]' // 指定symbolId格式
  })
}
