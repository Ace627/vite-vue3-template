// src/config/permission.ts
import router from '@/router'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

const defaultTitle: string = '天府'

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  // 动态更改页面的 title（动态标题来自路由 meta 的 title 配置）
  document.title = to.meta && to.meta.title ? `${to.meta.title} - ${defaultTitle}` : defaultTitle

  // 路由放行
  next()
})
