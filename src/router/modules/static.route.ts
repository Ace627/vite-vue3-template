import type { RouteRecordRaw } from 'vue-router'
import { HOME_PAGE_URL, DEFAULT_LAYOUT, LOGIN_PAGE_URL, REDIRECT_PAGE_URL, LAYOUT_NAME } from '../router.constant'

export const STATIC_ROUTE_LIST: Array<RouteRecordRaw> = [
  {
    path: '/', // 布局路由配置 确保可以显示布局框架
    name: LAYOUT_NAME,
    component: DEFAULT_LAYOUT,
    redirect: HOME_PAGE_URL,
    children: [
      {
        path: HOME_PAGE_URL,
        component: () => import('@/views/Dashboard/index.vue'),
        meta: { title: '首页', icon: 'Home', full: false, affix: true },
      },
    ],
  },

  {
    path: LOGIN_PAGE_URL, // 系统登录页
    name: 'Login',
    component: () => import('@/views/Login/index.vue'),
    meta: { title: '登录', full: true, hidden: true },
  },

  {
    path: REDIRECT_PAGE_URL, // 重定向页
    name: 'Redirect',
    component: DEFAULT_LAYOUT,
    meta: { full: false, hidden: true },
    children: [{ path: `${REDIRECT_PAGE_URL}/:path(.*)`, component: () => import('@/views/System/Redirect/index.vue') }],
  },

  {
    path: '/404', // The not found page must be placed last
    component: () => import('@/views/System/ExceptionPage/NotFound.vue'),
    meta: { hidden: true },
    alias: '/:pathMatch(.*)*',
  },
]
