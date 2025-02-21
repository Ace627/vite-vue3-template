/**
 * 计算指定日期是该年的第几周
 * @param {Date} date - 要计算的日期对象，默认为当前日期
 *  @returns 该日期是该年的第几周
 */
export function weekInYear(date: Date = new Date()): number {
  // 克隆日期对象，避免修改原始值
  const startOfYear = new Date(date.getFullYear(), 0, 1) // 当年的第一天
  // 确保 startOfYear 的时间被重置为午夜（00:00:00），避免潜在的时间计算误差
  startOfYear.setHours(0, 0, 0, 0)
  // 计算当前日期和该年第一天之间的时间差
  const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000))
  // 根据 ISO 周规则，计算周号（第一周从1月1日开始，包含当周）
  return Math.ceil((days + startOfYear.getDay() + 1) / 7)
}

/**
 * 计算给定日期是该年的第几天
 * @param {Date} date - 要计算的日期对象，默认为当前日期
 * @returns {number} 返回该日期是该年的第几天
 */
export function dayInYear(date: Date = new Date()): number {
  // 当年的第一天
  const startOfYear = new Date(date.getFullYear(), 0, 1)
  // 距离第一天的天数
  const pastDays = (date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
  // 向上取整并加上第一天
  return Math.ceil(pastDays)
}

/**
 * 获取指定日期是星期几（中文格式）
 * @param date - 要计算的日期对象，默认为当前日期
 * @returns 对应的中文星期字符串
 */
export function dayInWeek(date: Date = new Date()) {
  const daysOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return daysOfWeek[date.getDay()]
}

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
 * 计算两个日期间隔天数
 * @param date1 日期1
 * @param date2 日期2
 */
export function betweenDay(date1: Date | string, date2: Date | string): number {
  return Math.floor((convertDate(date2).getTime() - convertDate(date1).getTime()) / (24 * 3600 * 1000))
}

/**
 * @description 日期转换
 * @param 日期
 */
export function convertDate(date: string | Date): Date {
  return typeof date === 'string' ? new Date(date) : date
}
