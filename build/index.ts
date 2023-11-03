/** 处理环境变量 */
export function warpperEnv(env_config: Record<string, string>): ImportMetaEnv {
  const env = {} as ImportMetaEnv
  for (const env_name of Object.keys(env_config)) {
    const env_value = env_config[env_name]
    if (['true', 'false'].includes(env_value)) {
      // 布尔类型处理
      env[env_name] = env_value === 'true' ? true : false
    } else if (Number(env_value)) {
      // 数值类型处理
      env[env_name] = Number(env_value)
    } else {
      // 字符串类型处理
      env[env_name] = env_value
    }
  }
  return env
}
