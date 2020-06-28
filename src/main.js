import Vue from 'vue'
import App from './App'

import './registerServiceWorker'

// * ----------------------------------------
// * 导入插件
// * ----------------------------------------
import router from 'Plugins/router-instance'
import store from 'Plugins/vuex-instance'
import { vueInjecter, globalInjecter } from 'Plugins/injecter'
import { directiveRegister, filterRegister } from 'Plugins/register'
import {
  elementUiRegister,
  vueLazyloadReigster
} from 'Plugins/component-register'

// * ----------------------------------------
// * 注册组件
// * ----------------------------------------
elementUiRegister()
vueLazyloadReigster()

// * ----------------------------------------
// * 调用filters、directives注册器
// * ----------------------------------------
filterRegister()
directiveRegister()

// * ----------------------------------------
// * 调用注入器
// * ----------------------------------------
vueInjecter()
globalInjecter()

// * ----------------------------------------
// * 实例化vue
// * ----------------------------------------
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
