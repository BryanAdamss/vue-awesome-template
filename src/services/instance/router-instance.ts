/**
 * @author GuangHui
 * @description 路由实例
 */

import type { App } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'
import { routesLoader } from '@/plugins/routes-loader'

/* router实例 */
export const routerInstance = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routesLoader(),
})

/* 默认导出实例注册方法供vite-plugin-use-modules使用 */
export default (app: App) => app.use(routerInstance)
