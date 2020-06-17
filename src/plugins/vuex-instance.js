/**
 * @author GuangHui
 * @description vuex 实例
 */

import Vue from 'vue'
import Vuex from 'vuex'
import { VUEX_DEFAULT_CONFIG } from 'Config'
import globalStore from 'Services/store'

import createLogger from 'vuex/dist/logger'

!window.Vuex && Vue.use(Vuex) // * 2020-0617-兼容CDN配置

export default new Vuex.Store({
  ...VUEX_DEFAULT_CONFIG,
  ...globalStore,
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : []
})
