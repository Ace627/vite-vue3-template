/**
 * 处理环境变量配置，将字符串值转换为适当的类型（布尔值、数字），其余保持不变
 * @param {Record<string, string>} envConfig - 原始环境变量配置对象
 * @returns {ViteEnv} 类型转换后的环境变量对象
 */
export function wrapperEnv(envConfing: Record<string, string>): ViteEnv {
  const runtimeConfig = {} as ViteEnv
  for (const [key, value] of Object.entries(envConfing)) {
    const normalizedValue = value.trim()

    // 默认先给原值 其后看情况处理
    runtimeConfig[key] = normalizedValue

    // 处理布尔类型
    if (['true', 'false'].includes(normalizedValue.toLocaleLowerCase())) {
      runtimeConfig[key] = normalizedValue.toLocaleLowerCase() === 'true' ? true : false
    }

    // 处理数字类型（空字符串不处理）
    if (!Number.isNaN(Number(value))) {
      runtimeConfig[key] = +value // 数值类型处理
    }
  }
  return runtimeConfig
}
