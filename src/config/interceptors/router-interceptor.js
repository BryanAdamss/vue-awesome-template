/**
 * @author GuangHui
 * @description router钩子及守卫
 */

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
