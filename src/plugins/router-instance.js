/**
 * @author GuangHui
 * @description 路由实例
 */

import Vue from 'vue'
import Router from 'vue-router'

import routesLoader from 'Plugins/routes-loader'
import { ROUTER_DEFAULT_CONFIG, INDEX_ROUTES } from 'Config'
import {
  scrollBehaviorFn as scrollBehavior,
  routerAfterEachFn,
  routerBeforeEachFn
} from 'Config/interceptors/router-interceptor'

import { routerOnErrorHandler } from 'Config/interceptors/router-error-handler'

const routes = routesLoader(INDEX_ROUTES)

!window.VueRouter && Vue.use(Router) // * 2020-0617-兼容CDN配置

const router = new Router({
  ...ROUTER_DEFAULT_CONFIG,
  routes,
  scrollBehavior
})

router.afterEach(routerAfterEachFn)
router.beforeEach(routerBeforeEachFn)

router.onError(err => routerOnErrorHandler(err, router))

export default router
