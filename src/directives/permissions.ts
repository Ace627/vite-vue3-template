import type { Directive } from 'vue'

export const permissions: Directive = {
  mounted(el: HTMLElement, binding) {
    const bindPermissions: string[] = binding.value
    if (Array.isArray(bindPermissions) && bindPermissions.length) {
      const userStore = useUserStore()
      const hasPermission = userStore.permissions.some((permission) => bindPermissions.includes(permission))
      if (!hasPermission) el.remove()
    } else {
      throw new Error(`v-permissions 权限校验指令编码组缺失，请参考 v-permissions="['*:*:*']" 使用`)
    }
  },
}
