import type { Directive } from 'vue'

// 核心：将文件标记为 ES 模块，避免全局命名空间冲突（类型声明必加）
export {}

declare module 'vue' {
  /**
   * GlobalDirectives 是 Vue 内置接口，专门用于扩展全局指令类型
   */
  export interface GlobalDirectives {
    /**
     * v-roles 指令类型声明
     * @template Element - 指令可绑定到任意 DOM 元素（通用类型）
     * @template string[] - 指令绑定值必须为角色名称数组（基于角色控制元素显隐）
     * @usage <button v-roles="['admin', 'editor']">编辑按钮</button>，绑定值强制限制为 string[] 类型
     */
    vRoles: Directive<Element, string[]>

    /**
     * v-permissions 指令类型声明
     * @template Element - 指令可绑定到任意 DOM 元素（通用类型）
     * @template string[] - 指令绑定值必须为权限编码数组（基于权限控制元素显隐）
     * @usage <button v-permissions="['system:user:add']">新增用户</button>，绑定值强制限制为 string[] 类型
     */
    vPermissions: Directive<Element, string[]>
  }
}
