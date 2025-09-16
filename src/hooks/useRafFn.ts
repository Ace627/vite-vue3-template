interface RafConfig {
  interval?: number // 每次执行 callback 的最小间隔，单位 ms
  immediate?: boolean // 是否在挂载时立即执行一次 callback
}

interface RafController {
  pause: () => void // 暂停执行
  resume: () => void // 恢复执行
  toggle: () => void // 切换执行状态（暂停或恢复）
  isRunning: Ref<boolean> // 当前是否在执行状态
  isPaused: ComputedRef<boolean> // 当前是否处于暂停状态
}

export function useRafFn(callback: () => void, config: RafConfig = {}): RafController {
  let lastTime = performance.now() // 记录上一次执行时间
  let rafId: ReturnType<typeof requestAnimationFrame> | null = null // 用于存储请求的动画帧 ID

  // 初始化配置项：interval 为最小间隔，immediate 控制是否立即执行一次 callback
  const isRunning = ref(false)
  const { interval = 0, immediate = true } = config

  // 计算当前是否暂停，通过反转 isRunning 来判断
  const isPaused: ComputedRef<boolean> = computed(() => !isRunning.value)

  // 请求动画帧并递归执行的函数
  function loop() {
    const currentTime = performance.now() // 获取当前时间
    if (currentTime - lastTime >= interval) {
      lastTime = currentTime
      callback()
    }
    rafId = window.requestAnimationFrame(loop) // 递归调用自己，保证持续执行
  }

  // 恢复执行（如果当前未在执行中）
  function resume() {
    if (isRunning.value) return
    isRunning.value = true
    loop()
  }

  function pause() {
    if (!rafId) return // 如果没有正在执行的请求，直接返回
    window.cancelAnimationFrame(rafId) // 取消动画帧请求
    rafId = null // 清空 ID
    isRunning.value = false // 设置为暂停状态
  }

  // 切换执行状态（暂停或恢复）
  function toggle() {
    isRunning.value ? pause() : resume()
  }

  // 组件挂载时调用，默认立即执行一次 callback，然后开始循环
  onMounted(() => {
    if (immediate) callback()
    resume()
  })

  // 组件卸载时调用，暂停执行
  onBeforeUnmount(() => {
    pause()
  })

  // 返回控制方法和状态
  return { pause, resume, toggle, isRunning, isPaused }
}
