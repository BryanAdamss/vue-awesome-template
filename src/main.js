import 'babel-polyfill'

import Vue from 'vue'
import App from './App'

// * ----------------------------------------
// * 导入插件
// * ----------------------------------------
import router from 'Plugins/router-instance'
import store from 'Plugins/vuex-instance'
import { vueInjecter, globalInjecter } from 'Plugins/injecter'
import { directiveRegister } from 'Plugins/register'

// * ----------------------------------------
// * 导入组件
// * ----------------------------------------
import VueLazyload from 'vue-lazyload'

// * ----------------------------------------
// * 导入组件样式
// * ----------------------------------------
import 'element-ui/lib/theme-chalk/index.css'

// * ----------------------------------------
// * 注册组件
// * ----------------------------------------
Vue.use(VueLazyload, {
  loading: require('Assets/img/loading.gif')
})

// * ----------------------------------------
// * 调用filters、directives注册器
// * ----------------------------------------
directiveRegister()

// * ----------------------------------------
// * 调用注入器
// * ----------------------------------------
Vue.use(vueInjecter)
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
})
