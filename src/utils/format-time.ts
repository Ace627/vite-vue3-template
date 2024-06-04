/**
 * @description 时间问候语
 * @param 当前时间，new Date() 格式
 * @returns 返回拼接后的时间字符串
 */
export function getTimeWelcome(time: Date = new Date()): string {
  const hour = new Date(time).getHours()
  if (hour < 6) return '凌晨好'
  else if (hour < 9) return '早上好'
  else if (hour < 12) return '上午好'
  else if (hour < 14) return '中午好'
  else if (hour < 17) return '下午好'
  else if (hour < 19) return '傍晚好'
  else if (hour < 22) return '晚上好'
  return '夜里好'
}

/**
 * @description 获取当前日期是今年第几周
 * @param date 当前传入的日期值
 * @returns 返回第几周数字值
 */
export function weekOfYear(date: Date = new Date()): number {
  // 获取当年的 1月1日
  const yearStart = new Date(date.getFullYear(), 0, 1)
  // 获取当年第一周的第一天，如果该天为上一年的12月31日，则为第0周
  const firstWeekStart = new Date(date.getFullYear(), 0, 1 + ((7 - yearStart.getDay() + 1) % 7))
  if (date < firstWeekStart) return 0
  // 获取当前日期与第一周的相差天数
  const diff = Math.round((date.getTime() - firstWeekStart.getTime()) / 86400000)
  return Math.ceil((diff + 1) / 7)
}

/**
 * 计算两个日期间隔天数
 * @param date1 日期1
 * @param date2 日期2
 */
export function betweenDay(date1: Date, date2: Date): number {
  return Math.floor((convertDate(date2).getTime() - convertDate(date1).getTime()) / (24 * 3600 * 1000))
}

/**
 * @description 日期转换
 * @param 日期
 */
export function convertDate(date: string | Date): Date {
  return typeof date === 'string' ? new Date(date) : date
}
