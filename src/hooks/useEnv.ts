import { AppEnum } from '@/enums'
import { isStringBoolean, isStringNumber } from '@/utils/validate'

/** 处理环境变量 */
export default (): ViteEnv => {
  const runtimeConfig = {} as ViteEnv

  for (const [key, value] of Object.entries(import.meta.env)) {
    // 自定义的环境变量（命名必须以 VITE_ 开头）
    if (!key.includes(AppEnum.ENV_PREFIX)) continue

    if (isStringBoolean(value)) {
      runtimeConfig[key] = value === 'true' ? true : false
    } else if (isStringNumber(value)) {
      runtimeConfig[key] = Number(value) // 数值类型处理
    } else {
      runtimeConfig[key] = value // 字符串类型原值即可
    }
  }

  return runtimeConfig
}
