/**
 * @author GuangHui
 * @description 全局mutaion
 */

import * as types from './mutation-types'

export default {
  [types.SET_GLOBAL_TEST_OBJ](state, testObj) {
    state.globalTestObj = testObj
  }
}
