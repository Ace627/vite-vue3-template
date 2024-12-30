import type { Directive } from 'vue'

/**
 * v-permissions 权限校验指令
 * 根据绑定的权限编码数组，判断当前用户是否拥有其中的权限
 * 如果没有权限，则移除该元素
 */
export const permissions: Directive = {
  // 当指令绑定的元素被插入到 DOM 时触发
  mounted(el: HTMLElement, binding) {
    // 获取指令的绑定值，应该是权限的数组
    const bindPermissions: string[] = binding.value

    // 判断绑定的权限组是否有效且非空
    if (Array.isArray(bindPermissions) && bindPermissions.length) {
      // 获取用户的权限列表
      const userStore = useUserStore()
      // 检查用户是否拥有绑定的权限
      const hasPermission = userStore.permissions.some((permission) => bindPermissions.includes(permission))
      // 如果没有权限，则移除该元素
      if (!hasPermission) el.remove()
    } else {
      // 如果权限组无效，抛出错误
      throw new Error(`v-permissions 权限校验指令编码组缺失，请参考 v-permissions="['*:*:*']" 使用`)
    }
  },
}
