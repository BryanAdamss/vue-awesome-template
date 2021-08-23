/**
 * * 模块a（包含模块a独享的一些state、getter、mutation、action）
 */

// eslint-disable-next-line no-restricted-syntax
export default {
  namespaced: true,
  state: {
    moduleAName: '我是moduleA'
  },
  getters: {
    moduleANameLen(state) {
      return state.moduleAName.length
    }
  },
  mutations: {
    SET_MODULE_A_NAME(state, payload) {
      state.moduleAName = payload.moduleAName
    }
  },
  actions: {
    getModuleANameAsync(
      { state, rootState, getters, rootGetters, commit, dispatch },
      payload
    ) {
      setTimeout(() => {
        console.log('SET_MODULE_A_NAME')
        commit('SET_MODULE_A_NAME', '我是新moduleAName')
      }, 1000)
    }
  }
}
