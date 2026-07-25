/**
 * 主题切换 hook
 * 统一导航栏 ThemeSwitch 与设置页的主题切换逻辑：
 * - 命令式同步 <html>.dark 类（不在 store 加 watch，避免与多入口竞争）
 * - 圆形扩散动效（View Transitions API），有点击坐标从点击点扩散、无坐标从屏幕中心扩散
 * - 防 FOUC 初始化
 * - 非 Chromium 浏览器（无 startViewTransition）自动降级为直接切换
 */
export function useTheme() {
  const settingStore = useSettingStore()
  const isDark = computed(() => settingStore.theme === 'dark')

  // 防 FOUC：首次进入若已是 dark，确保 html 有 dark 类（幂等，调用多次无害）
  if (isDark.value) document.documentElement.classList.add('dark')

  /** 应用主题：切暗色类 + 圆形扩散动效 + 静默持久化 */
  function applyTheme(theme: 'light' | 'dark', event?: MouseEvent) {
    const nextDark = theme === 'dark'
    const run = () => {
      // 先更新数据层再切视觉类；且必须在主题值已更新后持久化，否则会保存成旧主题
      settingStore.theme = theme
      document.documentElement.classList.toggle('dark', nextDark)
      settingStore.saveSetting({ showTip: false })
    }

    // 降级：浏览器不支持 View Transitions 时直接切换，不动画
    if (typeof document.startViewTransition !== 'function') {
      run()
      return
    }

    const transition = document.startViewTransition(run)
    void transition.ready.then(() => {
      const x = event?.clientX ?? window.innerWidth / 2
      const y = event?.clientY ?? window.innerHeight / 2
      const radius = Math.hypot(
        Math.max(x, 0, window.innerWidth - x),
        Math.max(y, 0, window.innerHeight - y),
      )
      const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`]
      const pseudoElement = nextDark ? '::view-transition-old(root)' : '::view-transition-new(root)'
      const easing = 'cubic-bezier(0.28, 0, 0.44, 1)' // 苹果风格缓动
      document.documentElement.animate(
        { clipPath: nextDark ? [...clipPath].reverse() : clipPath },
        { duration: 500, fill: 'both', easing, pseudoElement },
      )
    })
  }

  /** 取反切换（导航栏 ThemeSwitch 用，传 event 做从点击点扩散） */
  function toggleTheme(event?: MouseEvent) {
    applyTheme(isDark.value ? 'light' : 'dark', event)
  }

  return { isDark, applyTheme, toggleTheme }
}
