/**
 * * 保存此页面共享的一些action
 */

export default {
  getTestNameAsync(
    { state, getters, rootGetters, rootState, commit, dispatch },
    payload
  ) {
    setTimeout(() => {
      commit('')
    }, 1000)
  }
}
