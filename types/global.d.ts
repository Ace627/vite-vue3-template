/** 简化 Record<string, any> 的使用流程 */
type Recordable<T = any> = Record<string, T>

/** 任意类型的 Function */
type AnyFunction = (...args: any[]) => any

/** 设备类型 */
type DeviceType = 'mobile' | 'desktop'

/** 常用操作类型 */
type ActionType = 'create' | 'delete' | 'update' | 'copy' | 'upload' | 'export'

/** 常用变量类型 */
type VariableType = 'string' | 'number' | 'boolean' | 'null' | 'undefined' | 'object' | 'array' | 'function' | 'date' | 'regexp' | 'symbol' | 'bigint' | 'promise'
