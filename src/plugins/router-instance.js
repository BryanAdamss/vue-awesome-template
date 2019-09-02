/**
 * @author GuangHui
 * @description 路由实例
 */

import Vue from 'vue'
import Router from 'vue-router'

import routesLoader from 'Plugins/routes-loader'
import { ROUTER_DEFAULT_CONFIG, INDEX_ROUTES } from 'Config'
import {
  routerAfterEachFn,
  routerBeforeEachFn
} from 'Config/interceptors/router-interceptor'

const routes = routesLoader(INDEX_ROUTES)

Vue.use(Router)

const router = new Router({
  ...ROUTER_DEFAULT_CONFIG,
  routes
})

router.afterEach(routerAfterEachFn)
router.beforeEach(routerBeforeEachFn)

export default router
