/**
 * @author GuangHui
 * @description 路由实例
 */

import Vue from 'vue'
import Router from 'vue-router'

import routes from 'Routes'
import { ROUTER_DEFAULT_CONFIG } from 'Config'
import {
  routerAfterEachFn,
  routerBeforeEachFn
} from 'Config/interceptors/router-interceptor'

Vue.use(Router)

const router = new Router({
  ...ROUTER_DEFAULT_CONFIG,
  routes
})

router.afterEach(routerAfterEachFn)
router.beforeEach(routerBeforeEachFn)

export default router
