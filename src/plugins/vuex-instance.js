/**
 * @author GuangHui
 * @description vuex 实例
 */

import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import { VUEX_DEFAULT_CONFIG } from 'Config'

import { globalStore } from 'Services/store'

!window.Vuex && Vue.use(Vuex) // * 2020-0617-兼容CDN配置

export const vuexInstance =  new Vuex.Store({
  ...VUEX_DEFAULT_CONFIG,
  ...globalStore,
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : []
})
