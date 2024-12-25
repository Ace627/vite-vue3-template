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

/** 登录页的时间前缀 */
export function timePrefix(): string {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}
