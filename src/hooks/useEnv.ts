/** 处理环境变量 */
export default (): ViteEnv => {
  const initEnv = import.meta.env
  const env = {} as ViteEnv
  for (const [key, value] of Object.entries(initEnv)) {
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
