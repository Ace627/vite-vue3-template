import type { App } from 'vue'
import { roles } from './modules/roles'
import { permissions } from './modules/permissions'

/** 挂载自定义指令 */
export function setupDirectives(app: App) {
  app.directive('roles', roles)
  app.directive('permissions', permissions)
}
