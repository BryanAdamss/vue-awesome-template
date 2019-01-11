/**
 * * mutations.js用来定义全局的mutations
 */

import * as types from './mutation-types'

const mutations = {
  [types.SET_GLOBAL_TEST_OBJ](state, testObj) {
    state.globalTestObj = testObj
  }
}

export default mutations
