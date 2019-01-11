/**
 * * actions.js用来定义全局的actions
 */

import * as types from './mutation-types'

export const foo = function({ commit }, payload) {
  setTimeout(() => {
    console.log('SET_GLOBAL_TEST_OBJ', 'async')
    commit(types.SET_GLOBAL_TEST_OBJ, payload)
  }, 1000)
  // 处理一些异步或其他事情，然后提交
}
