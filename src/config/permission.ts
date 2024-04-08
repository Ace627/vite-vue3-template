import router from '@/router'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { getToken } from '@/utils/cache/local-storage'

const NProgress = useNProgress() // 顶部进度条

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  NProgress.start()
  next()
})

router.afterEach((to: RouteLocationNormalized) => {
  NProgress.done()
})
