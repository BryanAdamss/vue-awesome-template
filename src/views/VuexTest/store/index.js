/**
 * * 注册模块入口页
 */

import Store from 'Store'

import moduleA from './module-a'
import moduleB from './module-b'

import actions from './actions'

const MODULE_NAME = 'VuexTest'

const MODULE_NAME_ARR = MODULE_NAME.split('/').filter(item => !!item)

// * 各个模块根据实际需要决定是否要使用vuex
export function install() {
  Store.registerModule(MODULE_NAME_ARR, {
    namespaced: true,
    actions,
    modules: {
      moduleA,
      moduleB
    }
  })
}

export function uninstall() {
  Store.unregisterModule(MODULE_NAME)
}

export default {
  install,
  uninstall
}
