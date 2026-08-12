/**
 * 根据当前时间生成问候语
 * @example 上午好 / 中午好 / 下午好 / 晚上好
 * @param date 可选参数，指定时间，默认当前系统时间
 */
export function getTimeGreeting(date?: Date) {
  const hour = date ? new Date(date).getHours() : new Date().getHours()
  if (hour >= 0 && hour < 6) return '凌晨好'
  if (hour >= 6 && hour < 12) return '上午好'
  if (hour >= 12 && hour < 14) return '中午好'
  if (hour >= 14 && hour < 18) return '下午好'
  return '晚上好'
}
