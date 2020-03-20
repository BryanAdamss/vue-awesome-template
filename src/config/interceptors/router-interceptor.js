/**
 * @author GuangHui
 * @description router钩子及守卫
 */

import { ASYNC_MODULE_LOAD_FAILD_RETRY_COUNT_MAX } from 'Config'

/**
 * router afterEach
 */
export function routerAfterEachFn(to, from) {}

/**
 * router beforeEach
 */
export function routerBeforeEachFn(to, from, next) {
  // * 路由到达前修改title
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    const LOGGED = sessionStorage.getItem('__auth__logged')
    // TODO:此处1需要改用const中的status_ok
    if (!LOGGED || parseInt(LOGGED) !== 1) {
      next({
        name: 'Login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
}

/**
 * vue-router 错误处理分派中心
 */
export function routerOnErrorHandler(error, routerInstance) {
  const info = getAsyncModuleLoadFaildInfo(error)

  if (info.isAsyncModuleLoadFail) {
    asyncModuleLoadFaildErrorHandler(routerInstance, info.faildChunkId)
  }
}

/**
 * 获取模块加载出错的相关信息
 */
export const getAsyncModuleLoadFaildInfo = error => {
  const ret = /Loading chunk (\d+) failed/g.exec(error.message)
  return {
    isAsyncModuleLoadFail: ret != null,
    faildChunkId: ret[1]
  }
}

/**
 * 路由异常错误处理，尝试解析一个异步组件时发生错误，重新渲染目标页面
 */
let RETRY_COUNT = 1
export function asyncModuleLoadFaildErrorHandler(router, failChunkId) {
  if (RETRY_COUNT > ASYNC_MODULE_LOAD_FAILD_RETRY_COUNT_MAX) {
    console.log(
      `vue-router 异步加载module(chunk):${failChunkId}失败，累计加载失败${RETRY_COUNT}次`
    )
    return
  }

  console.log(`第${RETRY_COUNT}次尝试重新加载module(chunk):${failChunkId}`)

  const targetPath = router.history.pending.fullPath

  router.replace(targetPath)

  RETRY_COUNT++
}
