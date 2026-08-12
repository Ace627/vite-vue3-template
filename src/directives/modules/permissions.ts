import { isArray } from '@/utils'
import type { Directive, DirectiveBinding } from 'vue'

function check(el: HTMLElement, binding: DirectiveBinding) {
  if (!isArray(binding.value)) return console.warn('[v-permissions] 绑定值应为字符串数组，如 v-permissions="[\'*:*:*\']"，已忽略校验', el)
  const bindPermissions: string[] = binding.value
  if (!bindPermissions.length) return
  if (!useUserStore().permissions.some((permission) => bindPermissions.includes(permission))) el.remove()
}

/**
 * 自定义权限校验指令：v-permissions
 * @description 根据用户权限列表，控制 DOM 元素的显示/隐藏（无权限则移除元素）
 * @usage <button v-permissions="['system:user:add']">新增用户</button>
 * @throws 绑定值非数组/空数组时抛出错误，提示正确使用方式
 */
export const permissions: Directive<HTMLElement, string[]> = {
  mounted: check,
  updated: check,
}
