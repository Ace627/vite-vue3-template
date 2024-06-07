import path from 'path' // path 模块提供了一些工具函数，用于处理文件与目录的路径

/** 处理环境变量 */
export function warpperEnv(env_config: Recordable<string>): ViteEnv {
  const env = {} as ViteEnv
  for (const [key, value] of Object.entries(env_config)) {
    if (['true', 'false'].includes(value)) {
      env[key] = value === 'true' ? true : false // 布尔类型处理
    } else if (Number(value)) {
      env[key] = Number(value) // 数值类型处理
    } else {
      env[key] = value // 字符串类型原值即可
    }
  }
  return env
}

/** 路径拼接函数，简化代码 用 normalizePath 解决 window 下的路径问题 */
export function pathResolve(dir: string): string {
  return path.normalize(path.resolve(process.cwd(), dir))
}
