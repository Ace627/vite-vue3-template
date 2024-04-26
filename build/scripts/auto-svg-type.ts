import path from 'path'
import fs from 'fs/promises'
import { pathResolve } from '..'

/**
 * @description 用来自动读取 svg 图标目录并用其名字生成一个 Svg 名字的枚举值；每次新增图标都需要重启项目来更新声明文件
 */

/** 读取图片目录并生成声明文件 */
async function generateImageFileNameDeclaration(dir: string, outputFile: string) {
  try {
    // 读取目录
    const files = await fs.readdir(dir)
    const types: string[] = []
    files.forEach((item) => types.push(item.replace('.svg', '')))
    // 生成声明文件内容
    let keys = ''
    files.forEach((item, index) => {
      const key = item.replace('.svg', '')
      const isLast = files.length - 1 === index
      keys += isLast ? `'${key}'` : `'${key}' | `
    })
    const declarationContent = `type SvgIconName = ${keys}`
    // 写入声明文件
    await fs.writeFile(outputFile, declarationContent)
  } catch (error) {
    console.log('error: ', error)
  }
}

generateImageFileNameDeclaration(pathResolve('src/assets/svg-icons'), pathResolve('types/auto-generate/auto-svg-name.d.ts'))
