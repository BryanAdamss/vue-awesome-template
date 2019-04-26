/**
 * @author GuangHui
 * @description axios拦截器
 */

import { isEmpty } from 'Utils/type-judge'
import {
  GLOBAL_NAME_SPACE,
  GLOBAL_LOADING_SHOW_NAME,
  GLOBAL_LOADING_HIDE_NAME
} from 'Config'
import GlobalLoading from 'Plugins/global-loading'

const globalLoading = new GlobalLoading({
  showEventName: GLOBAL_LOADING_SHOW_NAME,
  hideEventName: GLOBAL_LOADING_HIDE_NAME
})

export function reqResolveFn(reqConf) {
  // 请求拦截
  globalLoading.start()

  return reqConf
}

export function reqRejectFn(reqErr) {
  // 请求报错
  globalLoading.hide()

  return Promise.reject(reqErr)
}

export function respSuccFn(respObj) {
  // 响应成功
  globalLoading.end()

  if (
    isEmpty(respObj.data) ||
    respObj.data.code == null ||
    respObj.data.result == null
  ) {
    return Promise.reject('未获取到有效消息体')
  }

  const { data: resData } = respObj

  const { code } = resData

  switch (code) {
    case 200:
      return resData.result
    default:
      !respObj.config._noShowDefaultError &&
        window[GLOBAL_NAME_SPACE].$bus.$emit(
          'business.response.incorrect',
          '服务器异常，请稍后重试。'
        )
      return Promise.reject(resData)
  }
}

export function respFailFn(respErr) {
  // 响应失败
  globalLoading.hide()

  return Promise.reject(respErr)
}
