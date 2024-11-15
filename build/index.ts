import { isString } from 'lodash-es'
import path from 'path' // path 模块提供了一些工具函数，用于处理文件与目录的路径

/** 处理环境变量 */
export function warpperEnv(envConfing: Recordable<string>): ViteEnv {
  const runtimeConfig = {} as ViteEnv
  for (const [key, value] of Object.entries(envConfing)) {
    // 默认先给原值 其后看情况处理
    runtimeConfig[key] = value
    // 布尔值
    if (isString(value) && ['true', 'false'].includes(value)) {
      runtimeConfig[key] = value === 'true' ? true : false
    }
    // 数值
    if (isString(value) && !Number.isNaN(Number(value))) {
      runtimeConfig[key] = +value // 数值类型处理
    }
  }
  return runtimeConfig
}

/** 路径拼接函数，简化代码 用 normalizePath 解决 window 下的路径问题 */
export function pathResolve(dir: string): string {
  return path.normalize(path.resolve(process.cwd(), dir))
}
