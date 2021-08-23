/**
 * * 保存此页面共享的一些action
 */

// eslint-disable-next-line no-restricted-syntax
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
