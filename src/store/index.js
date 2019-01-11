/**
 * * vuex入口文件
 */

import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import states from './states'
import mutations from './mutations'
// log工具，方便查看每次提交前后的数据变化
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state: states,
  mutations,
  // 开发模式启用严格模式
  strict: debug,
  // 开发模式使用log工具
  plugins: debug ? [createLogger()] : []
})
