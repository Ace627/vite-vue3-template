import router from '@/router'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { getToken } from '@/utils/cache/local-storage' // 从缓存读取 Token 的方法
import isWhiteList from './white-list' // 路由是否在白名单的判断判断方法

const NProgress = useNProgress() // 顶部进度条

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  NProgress.start()
  next()
})

router.afterEach((to: RouteLocationNormalized) => {
  NProgress.done()
})
