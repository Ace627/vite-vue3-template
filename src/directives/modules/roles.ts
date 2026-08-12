import { isArray } from '@/utils'
import type { Directive, DirectiveBinding } from 'vue'

function check(el: HTMLElement, binding: DirectiveBinding) {
  if (!isArray(binding.value)) return console.warn('[v-roles] 绑定值应为字符串数组，如 v-roles="[\'editor\']"，已忽略校验', el)
  // 获取指令绑定的角色数组
  const bindRoles: string[] = binding.value
  if (!bindRoles.length) return
  if (!useUserStore().roles.some((role) => bindRoles.includes(role))) el.remove()
}

/**
 * v-roles 角色校验指令
 * 根据绑定的角色数组，判断当前用户是否具有其中的角色
 * 如果没有权限且用户角色不是 'admin'，则移除该元素
 */
export const roles: Directive<HTMLElement, string[]> = {
  mounted: check,
  updated: check,
}
