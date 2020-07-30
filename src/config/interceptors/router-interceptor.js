/**
 * @author GuangHui
 * @description router钩子及守卫
 */

import { STATUS_OK } from 'Services/const/common'

// 修改标题
const handleModifyTitle = to => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
}

// 检查登录
const checkLogin = (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const LOGGED = sessionStorage.getItem('__auth__logged')

    if (!LOGGED || parseInt(LOGGED) !== STATUS_OK) {
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
 * router afterEach
 */
export function routerAfterEachFn(to, from) {
  // noop
}

/**
 * router beforeEach
 */
export function routerBeforeEachFn(to, from, next) {
  // * 路由到达前修改title
  handleModifyTitle(to)

  // * 检查登录
  checkLogin(to, from, next)
}

/**
 * 滚动行为函数
 */
export function scrollBehaviorFn(to, from, savedPosition) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (savedPosition) {
        resolve(savedPosition)
      } else {
        resolve({ x: 0, y: 0 })
      }
    }, /* 动画过渡需要300ms,400ms时确保滚动一定生效 */ 400)
  })
}
