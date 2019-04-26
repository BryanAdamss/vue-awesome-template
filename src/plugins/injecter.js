/**
 * @author GuangHui
 * @description 注入器
 */
import Vue from 'vue'

import bus from 'Plugins/event-bus'
import api from 'Plugins/api-builder'

import { throttle, debounce } from 'Utils'
import { GLOBAL_NAME_SPACE, BASE_URL, APP_INFO } from 'Config'
import { Loading, Message, MessageBox } from 'element-ui'
import BaseToast from 'Base/BaseToast/BaseToast'

Vue.use(Loading.directive)

const vueInjecter = {
  install: (Vue, options) => {
    Vue.prototype.$throttle = throttle
    Vue.prototype.$debounce = debounce

    Vue.prototype.$toast = BaseToast

    Vue.prototype.$bus = bus
    Vue.prototype.$api = api
    Vue.prototype.$baseURL = BASE_URL
    Vue.prototype.$globalNameSpace = GLOBAL_NAME_SPACE
    Vue.prototype.$appInfo = APP_INFO

    Vue.prototype.$loading = Loading.service
    Vue.prototype.$msgbox = MessageBox
    Vue.prototype.$alert = MessageBox.alert
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$prompt = MessageBox.prompt
    Vue.prototype.$message = Message
  }
}

const globalInjecter = () => {
  window[GLOBAL_NAME_SPACE] = {
    APP_INFO,
    GLOBAL_NAME_SPACE,
    $bus: bus
  }
}

export { vueInjecter, globalInjecter }
