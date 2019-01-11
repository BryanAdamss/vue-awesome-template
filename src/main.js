// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// * ----------------------------------------
// * 基础库引入
// * ----------------------------------------
import 'Assets/js/flexible-custom'
import 'Assets/js/fastclick-custom'

import VueLazyload from 'vue-lazyload'

import App from './App'
import store from './store'
import router from './router'

import BaseToast from 'Base/BaseToast/BaseToast'

import axios from 'Common/js/axios'
import { debounce, throttle } from 'Common/js/utils'

import { DEBUG } from 'Common/js/const'

Vue.use({
  install: Vue => {
    // * 绑定去抖及节流函数到Vue原型上，方便直接调用
    Vue.prototype.$debounce = debounce
    Vue.prototype.$throttle = throttle
    // * 绑定axios到Vue原型上，方便使用this.$http来调用接口
    Vue.prototype.$http = axios
    // * 绑定toast到Vue原型上，方便使用this.$toast来调用
    Vue.prototype.$toast = BaseToast
    // * 绑定bus到Vue原型上，方便使用this.$bus来调用
    Vue.prototype.$bus = new Vue()
  }
})

// * ----------------------------------------
// * 调试工具引入
// * ----------------------------------------
if (DEBUG && process.env.NODE_ENV === 'development') {
  /* eslint-disable no-unused-vars */
  var vConsole = new Vconsole()
}

Vue.config.productionTip = false

// * ----------------------------------------
// * 在body上绑定fastclick
// * ----------------------------------------
document.addEventListener(
  'DOMContentLoaded',
  function() {
    FastClick.attach(document.body)
  },
  false
)
// * ----------------------------------------
// * 注册lazyload并配置默认图
// * ----------------------------------------
Vue.use(VueLazyload, {
  loading: require('Common/img/loading.gif')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
