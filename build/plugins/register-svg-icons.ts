import { createSvgIconsPlugin } from 'vite-plugin-svg-icons2'
import { pathResolve } from '..'

export function registerSvgIcons() {
  return createSvgIconsPlugin({
    iconDirs: [pathResolve('src/assets/svg-icons')], // 指定图标文件夹
    symbolId: 'icon-[dir]-[name]', // 指定symbolId格式
  })
}
