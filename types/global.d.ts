/** 简化 Record<string, any> 的使用流程 */
type Recordable<T = any> = Record<string, T>

/** 任意类型的 Function */
type AnyFunction = (...args: any[]) => any

/** 设备类型 */
type DeviceType = 'mobile' | 'desktop'
