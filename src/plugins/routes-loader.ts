/**
 * @author GuangHui
 * @description 路由加载器，读取routes下所有路由
 */

import type { RouteRecordRaw } from 'vue-router'

/**
 * @description 加载routes目录下所有路由定义
 *
 * @date 2022-07-15 17:43:58
 * @export
 * @return {*}  {RouteRecordRaw[]}
 */
export function routesLoader(): RouteRecordRaw[] {
  const routes = import.meta.glob<true, string, RouteRecordRaw[]>(
    '@/routes/**/*.ts',
    { eager: true, import: 'default' },
  )

  return Object.values(routes || []).flat()
}
