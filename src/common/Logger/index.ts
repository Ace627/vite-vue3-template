import dayjs from 'dayjs'
import { getCssVariableValue } from '@/utils'

const colorPriamry = getCssVariableValue(`--app-color-primary`)
const colorWarning = getCssVariableValue(`--app-color-warning`)
const colorSuccess = getCssVariableValue(`--app-color-success`)
const colorDanger = getCssVariableValue(`--app-color-danger`)

export class Logger {
  static verbose(message: string) {
    console.log(`%c%s`, logStyle(colorPriamry), `${formatTime()} [VERBOSE] ${message}`)
  }

  static success(message: string) {
    console.log(`%c%s`, logStyle(colorSuccess), `${formatTime()} [SUCCESS] ${message}`)
  }

  static warn(message: string) {
    console.log(`%c%s`, logStyle(colorWarning), `${formatTime()} [WARNING] ${message}`)
  }

  static error(message: string) {
    console.log(`%c%s`, logStyle(colorDanger), `${formatTime()} [DANGER] ${message}`)
  }
}

function formatTime() {
  return dayjs().format(`YYYY-MM-DD HH:mm:ss`)
}
function logStyle(color: string) {
  return `color:${color}; font-weight: bold;`
}
