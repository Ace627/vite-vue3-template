// src/config/permission.ts
import router from '@/router'
import NProgress from 'nprogress'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

NProgress.configure({ showSpinner: false }) // 去除进度条加载时右侧的小圆圈

const defaultTitle: string = '天府'

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  // 动态更改页面的 title（动态标题来自路由 meta 的 title 配置）
  document.title = to.meta && to.meta.title ? `${to.meta.title} - ${defaultTitle}` : defaultTitle
  NProgress.start()

  // 路由放行
  next()
})

router.afterEach(() => {
  NProgress.done()
})
