/**
 * @author GuangHui
 * @description 注入器
 */
import { Loading, Message, MessageBox } from 'element-ui'
import Vue from 'vue'

import { APP_INFO, BASE_URL, GLOBAL_NAME_SPACE } from 'Config'

import { constLoader } from 'Plugins/const-loader'
import { eventBus } from 'Plugins/event-bus'

import { debounce, getGlobalThis, getOrigin, throttle } from 'Utils'

import { toast } from 'Base/BaseToast'

import {
  _getNewGlobalSaver,
  _getNewGlobalSessionSaver,
  globalSaverInstance,
  globalSessionSaverInstance
} from 'Services/extends/global-saver-instance'
import { rootVue } from 'Services/extends/root-instance'

Vue.use(Loading.directive)

const isBuildMode = mode => process.env.BUILD_MODE === mode

/**
 * vue 注入器
 */
export const vueInjecter = () => {
  const prototypeMethods = {
    install: (Vue, options) => {
      Vue.prototype.$throttle = throttle
      Vue.prototype.$debounce = debounce

      Vue.prototype.$toast = toast

      Vue.prototype.$bus = eventBus
      Vue.prototype.$baseURL = BASE_URL
      Vue.prototype.$globalNameSpace = GLOBAL_NAME_SPACE
      Vue.prototype.$appInfo = APP_INFO

      Vue.prototype.$loading = Loading.service
      Vue.prototype.$msgbox = MessageBox
      Vue.prototype.$alert = MessageBox.alert
      Vue.prototype.$confirm = MessageBox.confirm
      Vue.prototype.$prompt = MessageBox.prompt
      Vue.prototype.$message = Message

      Vue.prototype.$saver = globalSaverInstance // 全局localStorageSaver
      Vue.prototype.$sessionSaver = globalSessionSaverInstance // 全局sessiontorageSaver

      Vue.prototype.$getNewGlobalSaver = _getNewGlobalSaver
      Vue.prototype.$getNewGlobalSessionSaver = _getNewGlobalSessionSaver

      Vue.prototype.$win = getGlobalThis()

      // 构建模式
      Vue.prototype.$buildMode = process.env.BUILD_MODE
      Vue.prototype.$isDevBuildMode = isBuildMode('dev')
      Vue.prototype.$isTestBuildMode = isBuildMode('test')
      Vue.prototype.$isProdBuildMode = isBuildMode('prod')

      // origin
      Vue.prototype.$origin = getOrigin()

      Vue.prototype.$constLoader = function(arg) {
        constLoader(this, arg)
      }
    }
  }

  Vue.use(prototypeMethods)
}

/**
 * 全局注入器
 */
export const globalInjecter = () => {
  window[GLOBAL_NAME_SPACE] = {
    APP_INFO,
    GLOBAL_NAME_SPACE,
    $bus: eventBus,
    rootVue
  }
}
