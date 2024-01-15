/** 当前是否处于开发模式 */
export const IsDevelopment = import.meta.env.MODE === 'development'

/** 当前是否处于生产模式 */
export const IsProduction = import.meta.env.PROD

/** 主布局页面组件 */
export const Layout = () => import('@/layout/index.vue')
