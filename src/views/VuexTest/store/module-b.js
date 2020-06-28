/**
 * * 模块b（包含模块b独享的一些state、getter、mutation、action）
 */

export default {
  namespaced: true,
  state: {
    moduleBName: '我是moduleB~'
  },
  getters: {
    moduleBNameLen(state) {
      return state.moduleBName.length
    }
  },
  mutations: {
    SET_MODULE_B_NAME(state, payload) {
      state.moduleBName = payload.moduleBName
    }
  },
  actions: {
    getModuleBNameAsync(
      { state, rootState, getters, rootGetters, commit, dispatch },
      payload
    ) {
      setTimeout(() => {
        console.log('SET_MODULE_B_NAME')
        commit('SET_MODULE_B_NAME', '我是新moduleBName')
      }, 1000)
    }
  }
}
