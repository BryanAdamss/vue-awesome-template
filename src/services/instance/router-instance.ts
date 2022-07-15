/**
 * @author GuangHui
 * @description 路由实例
 */

import { createRouter, createWebHistory } from 'vue-router'
import { routesLoader } from '@/plugins/routes-loader'

/* router实例 */
export const routerInstance = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routesLoader(),
})
