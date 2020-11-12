import './register-service-worker'

import Vue from 'vue'

// * ----------------------------------------
// * 导入插件
// * ----------------------------------------
import {
  elementUiRegister,
  vueLazyloadReigster
} from 'Plugins/component-register'
import { globalInjecter, vueInjecter } from 'Plugins/injecter'
import { bindNetworkChangeEvent } from 'Plugins/network-detector'
import { directiveRegister, filterRegister } from 'Plugins/register'
import router from 'Plugins/router-instance'
import { vconsoleProvider } from 'Plugins/vconsole-provider'
import store from 'Plugins/vuex-instance'

import App from './App'

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
// * vconsole
// * ----------------------------------------
vconsoleProvider()

// * ----------------------------------------
// * 绑定网络变化事件
// * ----------------------------------------
bindNetworkChangeEvent()

// * ----------------------------------------
// * 实例化vue
// * ----------------------------------------
Vue.config.productionTip = false

/* eslint-disable no-new */
/* eslint-disable vue/require-name-property */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
