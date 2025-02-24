/**
 * 计算指定日期是该年的第几周（ISO 8601标准）
 * @param date - 要计算的日期对象，默认为当前日期
 * @returns 该日期在ISO 8601标准中的周数
 */
export function weekInYear(date: Date = new Date()): number {
  // 创建不修改原值的日期副本
  const d = new Date(date.getTime())
  d.setHours(0, 0, 0, 0)
  // 调整到该周的星期四（ISO周规则核心逻辑）
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7))
  // 获取当年1月1日（用于计算年基准）
  const yearStart = new Date(d.getFullYear(), 0, 1)
  yearStart.setHours(0, 0, 0, 0)
  // 计算从年基准到当前周四的天数差
  const diff = d.getTime() - yearStart.getTime()
  const dayCount = Math.round(diff / 86400000) // 精确天数
  return Math.ceil((dayCount + 1) / 7) // +1补偿1月1日为第1天
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
