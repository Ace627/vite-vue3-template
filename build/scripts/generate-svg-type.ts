import fs from 'fs/promises'
import { pathResolve } from '..'

/** Svg Icon 的存放目录 */
const svgIconDir = pathResolve('src/assets/svg-icons')
/** Svg Icon 声明文件的存放位置 */
const svgIconTypeFileURL = pathResolve('types/auto-svg-name.d.ts')
const iconDataFile = pathResolve('src/assets/database/svg-icons.ts')

/** 用来自动读取 svg 图标目录并用其名字生成一个 Svg 名字的枚举值；每次新增图标都需要重启项目来更新声明文件 */
async function generateSvgIconType(dir: string, outputFile: string) {
  try {
    // 读取指定目录下的所有图标文件名 含后缀
    const iconFullNameList = await fs.readdir(dir)
    // 获取去除后缀后的文件名数组
    const iconNameList = iconFullNameList.map((item) => item.replace('.svg', ''))
    // 生成 SvgIcon 的 name 的枚举值字符串
    const types = iconNameList.reduce((prev, item, index) => (prev += iconNameList.length - 1 === index ? `'${item}'` : `'${item}' | `), '')
    // 写入声明文件 如果文件已存在则覆盖
    await fs.writeFile(outputFile, `type SvgIconName = ${types}`, { flag: 'w' })
    await fs.writeFile(iconDataFile, `export default ${JSON.stringify(iconNameList)} as SvgIconName[]`)
  } catch (error) {
    console.log('error: ', error)
  }
}

generateSvgIconType(svgIconDir, svgIconTypeFileURL)
