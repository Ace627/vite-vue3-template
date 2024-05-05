import type { App } from 'vue'
import { roles } from './roles'
import { permissions } from './permissions'

/** 挂载自定义指令 */
export function setupDirectives(app: App) {
  app.directive('roles', roles)
  app.directive('permissions', permissions)
}
