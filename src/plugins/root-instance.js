/**
 * @author GuangHui
 * @description vue 根实例
 */

import Vue from 'vue'

import bus from 'Plugins/event-bus'
import router from 'Plugins/router-instance'
import store from 'Plugins/vuex-instance'

import App from '@/App'

/* eslint-disable vue/require-name-property */
export const rootVue = new Vue({
  router,
  store,
  render: h => h(App)
})

export const mountRootVue = (el = '#app') => {
  rootVue.$mount(el)

  bus.$emit('root-vue-mounted')
}
