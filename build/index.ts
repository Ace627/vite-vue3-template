import { isString } from 'lodash-es'

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
