import router from '@/router'
import NProgress from 'nprogress'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

// 去除进度条加载时右侧的小圆圈
NProgress.configure({ showSpinner: false })

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  NProgress.start()
  next()
})

router.afterEach((to: RouteLocationNormalized) => {
  NProgress.done()
})
