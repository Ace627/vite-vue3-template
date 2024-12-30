import type { Directive } from 'vue'

/**
 * v-roles 角色校验指令
 * 根据绑定的角色数组，判断当前用户是否具有其中的角色
 * 如果没有权限且用户角色不是 'admin'，则移除该元素
 */
export const roles: Directive = {
  // 指令绑定的元素插入到 DOM 时触发
  mounted(el: HTMLElement, binding) {
    // 获取指令绑定的角色数组
    const bindRoles: string[] = binding.value

    // 确保绑定的角色数组有效且非空
    if (Array.isArray(bindRoles) && bindRoles.length) {
      // 获取用户的角色列表
      const userStore = useUserStore()
      // 判断用户是否拥有绑定的角色
      const hasRole = userStore.roles.some((role) => bindRoles.includes(role))
      // 如果没有角色权限且用户不是 'admin'，则移除该元素
      if (!hasRole && !userStore.roles.includes('admin')) el.remove()
    } else {
      // 如果没有传递角色数组，抛出错误
      throw new Error(`v-roles 角色校验指令编码组缺失，请参考 v-roles="['editor']" 使用`)
    }
  },
}
