import type { RouteRecordRaw } from 'vue-router'
import { HOME_PAGE_URL, LAYOUT, LOGIN_PAGE_URL } from '../router.constant'

export const STATIC_ROUTE_LIST: Array<RouteRecordRaw> = [
  // 布局路由配置 确保可以显示布局框架
  {
    path: '/',
    name: 'Layout',
    component: LAYOUT,
    redirect: HOME_PAGE_URL,
    meta: { hidden: true },
    children: [{ path: HOME_PAGE_URL, component: () => import('@/views/Dashboard/index.vue') }],
  },

  {
    path: HOME_PAGE_URL, // 确保显示为一级菜单
    component: () => import('@/views/Dashboard/index.vue'),
    meta: { title: '主控台', icon: 'Home', full: false, affix: true },
  },

  {
    path: LOGIN_PAGE_URL, // 系统登录页
    component: () => import('@/views/Login/index.vue'),
    meta: { title: '登录', full: true, hidden: true },
  },

  {
    path: '/redirect', // 重定向页
    component: () => import('@/views/Redirect/index.vue'),
    meta: { title: '重定向', full: false, hidden: true },
  },

  {
    path: '/404', // The not found page must be placed last
    component: () => import('@/views/ExceptionPage/NotFound.vue'),
    meta: { title: 'NotFound', hidden: true },
    alias: '/:pathMatch(.*)*',
  },
]
