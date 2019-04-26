/**
 * @author GuangHui
 * @description 项目配置及开关
 */

// BASE_URL 默认配置
export const BASE_URL =
  process.env.NODE_ENV !== 'production'
    ? `http://localhost:8080`
    : `${window.location.protocol}//${window.location.host}`

// AXIOS 默认配置
export const AXIOS_DEFAULT_CONFIG = {
  baseURL: BASE_URL,
  timeout: 10 * 1000
  // withCredentials: true
}

// API构造器 默认配置
export const API_DEFAULT_CONFIG = {
  mockBaseURL: '', // mock的baseURL
  mock: false, // 是否全局启用mock
  debug: false, // 调试开关
  sep: '/' // 接口分隔符
}

// element-loading 默认配置
export const LOADING_DEFAULT_CONFIG = {
  lock: true,
  fullscreen: true,
  text: '正在努力加载哦~',
  background: 'rgba(255,255,255,0.8)',
  spinner: 'c-MySpinner',
  customClass: 'c-MyLoading'
}

// vue-router 默认配置
export const ROUTER_DEFAULT_CONFIG = {
  mode: 'hash',
  base: ''
}

// 全局命名空间
export const GLOBAL_NAME_SPACE = '__VUE_10W_TEMPLATE__'

// APP信息
export const APP_INFO = Object.freeze({
  name: 'VUE_10W_TEMPLATE',
  desc: 'vue_10w_模板',
  version: '1.0.0'
})

// global-loading 默认配置
export const GLOBAL_LOADING_CONFIG = {
  showEventName: 'global.loading.show',
  hideEventName: 'global.loading.hide',
  minReqTime: 400,
  maxCombinTime: 1000,
  debug: false
}

// 开关
export const VCONSOLE_DEBUG = false
