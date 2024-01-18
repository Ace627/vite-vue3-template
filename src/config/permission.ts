import router from '@/router'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

const NProgress = useNProgress() // 顶部进度条

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  NProgress.start()
  next()
})

router.afterEach((to: RouteLocationNormalized) => {
  NProgress.done()
})
