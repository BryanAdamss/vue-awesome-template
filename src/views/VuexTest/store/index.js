/**
 * * 注册模块入口页
 */

import vuexInstance from 'Plugins/vuex-instance'

import actions from './actions'
import moduleA from './module-a'
import moduleB from './module-b'

const MODULE_NAME = 'VuexTest'

const MODULE_NAME_ARR = MODULE_NAME.split('/').filter(item => !!item)

// * 各个模块根据实际需要决定是否要使用vuex
export function install() {
  vuexInstance.registerModule(MODULE_NAME_ARR, {
    namespaced: true,
    actions,
    modules: {
      moduleA,
      moduleB
    }
  })
}

export function uninstall() {
  vuexInstance.unregisterModule(MODULE_NAME)
}

export default {
  install,
  uninstall
}
