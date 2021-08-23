/**
 * @author GuangHui
 * @description 项目配置及开关
 */

import { axiosInstance } from "Services/extends/axios-instance.js";

import { version } from '../../package.json'

// * ----------------------------------------
// * App描述信息
// * ----------------------------------------

// App 名
export const APP_NAME = 'VUE_AWESOME_TEMPLATE'

// 全局命名空间
export const GLOBAL_NAME_SPACE = `__${APP_NAME}__`

// APP信息
export const APP_INFO = Object.freeze({
  name: APP_NAME,
  desc: 'vue_awesome_模板',
  version
})

// * ----------------------------------------
// * 项目默认配置
// * ----------------------------------------

// BASE_URL 默认配置
export const BASE_URL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8080'
    : `${window.location.protocol}//${window.location.host}`

// AXIOS 默认配置
export const AXIOS_DEFAULT_CONFIG = {
  baseURL: BASE_URL,
  timeout: 10 * 1000
  // withCredentials: true // 是否携带cookie
}

// API构造器 默认配置
export const API_DEFAULT_CONFIG = {
  axiosInstance,
  mockBaseURL: '', // mock的baseURL，接受字符串或方法；传入方法时，可以拿到api定义配置文件的所有参数name, desc, method, mockEnable, path, mockPath, onBeforeSendData，返回的值将做为mock的baseURL
  globalMockEnable: false, // 是否全局启用mock
  debug: false, // 调试开关
  onBeforeSendData: data => data // 发送数据前的钩子（全局），优先级低于配置级别的onBeforeSendData，会接收到需要发送的数据，可在此时修改数据；无需求，可不定义此字段
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

// * ----------------------------------------
// * 路由默认配置
// * ----------------------------------------

// vue-router异步模块加载失败尝试次数最大值
export const ASYNC_MODULE_LOAD_FAILD_RETRY_COUNT_MAX = 5

// vue-router 默认配置
export const ROUTER_DEFAULT_CONFIG = {
  mode: 'hash',
  base: ''
}

export const INDEX_ROUTES = [
  {
    // * 所有未匹配到的路由，重定向到Index路由上
    path: '*',
    redirect: {
      name: 'Index'
    }
  },
  {
    path: '/',
    // * 每个路由需要取名，采用帕斯卡风格
    name: 'Index',
    redirect: {
      name: 'HomePage'
    }
  }
]

// global-loading 默认配置
export const GLOBAL_LOADING_DEFAULT_CONFIG = {
  showEventName: 'global-loading-show',
  hideEventName: 'global-loading-hide',
  minReqTime: 400,
  maxCombinTime: 1000,
  debug: false
}

// vuex 默认配置
export const VUEX_DEFAULT_CONFIG = {
  strict: process.env.NODE_ENV !== 'production'
}

// * ----------------------------------------
// * 开关
// * ----------------------------------------

// 开启vconsole
export const VCONSOLE_DEBUG = process.env.VUE_APP_TARGET_SERVER !== 'prod'
export const VCONSOLE_ENABLE_COUNT = 10
export const VCONSOLE_ENABLE_INTERVAL = 300

// 是否启用ie css3 vars兼容
export const ENABLE_IE_CSS_VARS_COMPAT = true
