import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'

export const STATIC_ROUTE_LIST: RouteRecordRaw[] = [
  {
    name: 'Layout', // 布局路由配置 确保可以显示布局框架
    path: '',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        name: 'Dashboard',
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '首页', icon: 'Home' },
      },
    ],
  },

  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/core/login.vue'),
    meta: { title: '登录', hidden: true },
  },

  {
    name: 'NotFound',
    path: '/:pathMatch(.*)*', // 404页面（必须放在最后）
    component: () => import('@/views/core/404.vue'),
    meta: { hidden: true },
  },
]
