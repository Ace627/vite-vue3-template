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
 * 自定义角色校验指令：v-roles
 * @description 根据用户角色列表，控制 DOM 元素的显示/隐藏（无对应角色则移除元素）
 * @usage `<button v-roles="['editor']">编辑</button>`
 * @note 绑定值非数组或空数组时仅 console.warn 告警并跳过校验（fail-soft），不抛出错误
 */
export const roles: Directive<HTMLElement, string[]> = {
  mounted: check,
  updated: check,
}
