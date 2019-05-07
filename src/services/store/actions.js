/**
 * @author GuangHui
 * @description 全局actions
 */

import * as types from './mutation-types'

export const foo = ({ commit }, payload) => {
  setTimeout(() => {
    console.log('SET_GLOBAL_TEST_OBJ', 'async')
    commit(types.SET_GLOBAL_TEST_OBJ, payload)
  }, 1000)
}
