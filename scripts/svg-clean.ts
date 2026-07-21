import { resolve, basename } from 'path'
import { readFile, writeFile, readdir } from 'fs/promises'

// 要移除的 SVG 冗余属性
const REMOVE_ATTRS = ['fill', 'class', 'version', 't', 'p-id', 'width', 'height']

// SVG 图标根目录，可配置多个 SVG 图标目录
const ICON_DIRS = [resolve(process.cwd(), 'src/assets/svg-icons')]

// 生成精准匹配 SVG 属性的正则
const REMOVE_REGEX = new RegExp(`\\s+(${REMOVE_ATTRS.join('|')})=(["'])[^"']*?\\2`, 'gi')

/**
 * 清理单个 SVG 文件（无冗余属性则跳过）
 */
async function cleanSvgFile(filePath: string) {
  try {
    // 1. 读取文件内容
    const originalContent = await readFile(filePath, 'utf8')
    let content = originalContent
    // 2. 移除指定冗余属性
    content = content.replace(REMOVE_REGEX, '')
    // 3. 清理标签内多余空白
    content = content.replace(/\s+/g, ' ').replace(/ >/g, '>').trim()
    // 4. 内容无变化 → 直接跳过，不写入文件
    if (content === originalContent) return
    // 5. 有修改才覆盖写入原文件
    await writeFile(filePath, content, 'utf8')
    // 6. 打印清理结果
    console.log(`✅ 已清理：${filePath}`)
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : '未知错误'
    console.error(`❌ 处理失败：${filePath}`, errorMsg)
  }
}

/**
 * 递归遍历 单个目录，处理所有 SVG
 */
async function processDirectory(dir: string) {
  try {
    console.log(`📂 处理目录：${dir}`)
    const entries = await readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = resolve(dir, entry.name)
      // 递归处理子文件夹
      if (entry.isDirectory()) {
        await processDirectory(fullPath)
      }
      // 处理 SVG 文件
      else if (entry.isFile() && entry.name.endsWith('.svg')) {
        await cleanSvgFile(fullPath)
      }
    }
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : '未知错误'
    console.error(`❌ 目录处理失败：${dir}`, errorMsg)
  }
}

/**
 * 启动：遍历所有配置的目录
 */
async function bootstrap() {
  console.log('🚀 开始批量清理 SVG 属性（多目录模式）...\n')

  // 遍历数组中的每一个图标目录
  for (const dir of ICON_DIRS) await processDirectory(dir)

  console.log('\n🎉 所有目录的 SVG 清理完成！')
}

bootstrap()
