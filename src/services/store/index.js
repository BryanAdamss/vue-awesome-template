/**
 * @author ghchu
 * @description 全局状态管理入口
 */
import state from './states'
import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'

export default {
  state,
  actions,
  getters,
  mutations
}
