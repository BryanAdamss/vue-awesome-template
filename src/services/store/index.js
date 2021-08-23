/**
 * @author GuangHui
 * @description 全局状态管理入口
 */
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import state from './states'

export const globalStore= {
  state,
  actions,
  getters,
  mutations
}
