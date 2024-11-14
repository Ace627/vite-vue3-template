import { AppConfig } from '@/config/app-config'
import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'

/** 常驻路由 除了 redirect/403/404/login 等隐藏页面，其它页面建议设置 Name 属性 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: AppConfig.HOME_PAGE_URL,
    children: [
      {
        path: AppConfig.HOME_PAGE_URL,
        name: 'Dashboard',
        component: () => import(`@/views/Dashboard/index.vue`),
        meta: { title: '首页' }
      }
    ]
  },

  {
    path: AppConfig.LOGIN_PAGE_URL,
    name: 'Login',
    component: () => import('@/views/Login/index.vue'),
    meta: { title: '登录', hidden: true }
  },

  {
    path: '/redirect',
    component: Layout,
    meta: { title: '路由重定向', hidden: true },
    children: [{ path: '/redirect/:path(.*)', component: () => import('@/views/Redirect/index.vue') }]
  },

  // The not found page must be placed last
  {
    path: AppConfig.NOT_FOUND_PAGE_URL,
    component: () => import('@/views/ExceptionPage/NotFound.vue'),
    meta: { title: 'NotFound', hidden: true },
    alias: '/:pathMatch(.*)*'
  }
]
