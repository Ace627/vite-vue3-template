import type { App } from 'vue'
import { roles } from './modules/roles'
import { permissions } from './modules/permissions'

export function setupDirectives(app: App) {
  // 注册 v-roles 指令：基于角色控制元素显示/隐藏
  app.directive('roles', roles)
  // 注册 v-permissions 指令：基于权限编码控制元素显示/隐藏
  app.directive('permissions', permissions)
}
