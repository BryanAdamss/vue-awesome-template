/**
 * @author GuangHui
 * @description 全局mutaion
 */

import * as types from './mutation-types'

// eslint-disable-next-line no-restricted-syntax
export default {
  [types.SET_GLOBAL_TEST_OBJ](state, testObj) {
    state.globalTestObj = testObj
  }
}
