/**
 * @author GuangHui
 * @description vue 根实例
 */

import Vue from 'vue'

import { eventBus } from 'Plugins/event-bus.js'
import { routerInstance } from 'Plugins/router-instance.js'
import { vuexInstance } from 'Plugins/vuex-instance.js'

import App from '@/App'

/* eslint-disable vue/require-name-property */
export const rootVue = new Vue({
  router: routerInstance,
  store: vuexInstance,
  render: h => h(App)
})

export const mountRootVue = (el = '#app') => {
  rootVue.$mount(el)

  eventBus.$emit('root-vue-mounted')
}
