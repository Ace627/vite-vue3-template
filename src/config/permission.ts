// src/config/permission.ts
import router from '@/router'
import NProgress from 'nprogress'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

NProgress.configure({ showSpinner: false }) // 去除进度条加载时右侧的小圆圈

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  NProgress.start()

  // 路由放行
  next()
})

router.afterEach(to => {
  useTitle(to.meta?.title)
  NProgress.done()
})
