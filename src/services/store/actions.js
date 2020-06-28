/**
 * @author GuangHui
 * @description 全局actions
 */

import * as types from './mutation-types'

export const foo = ({ commit }, payload) => {
  // 处理一些异步或其他事情，然后提交
  setTimeout(() => {
    console.log('SET_GLOBAL_TEST_OBJ', 'async')
    commit(types.SET_GLOBAL_TEST_OBJ, payload)
  }, 1000)
}
