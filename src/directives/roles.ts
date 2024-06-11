import type { Directive } from 'vue'

/**
 * 判断当前是否用于该角色
 */
export const roles: Directive = {
  mounted(el: HTMLElement, binding) {
    const bindRoles: string[] = binding.value
    if (Array.isArray(bindRoles) && bindRoles.length) {
      const userStore = useUserStore()
      const hasRole = userStore.roles.some((role) => bindRoles.includes(role))
      if (!hasRole && !userStore.roles.includes('admin')) el.remove()
    } else {
      throw new Error(`v-roles 角色校验指令编码组缺失，请参考 v-roles="['editor']" 使用`)
    }
  },
}
