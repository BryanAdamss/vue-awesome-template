/**
 * @author GuangHui
 * @description axios拦截器
 */

import { Message } from 'element-ui'

import { GLOBAL_LOADING_DEFAULT_CONFIG, GLOBAL_NAME_SPACE } from 'Config'

import GlobalLoading from 'Plugins/global-loading'

import { isEmpty } from 'Utils/type-judge'

import { OFFLINE_MSG, TOKEN_EXPIRED } from 'Services/const/common'
import resendToken from 'Services/extends/resend-token-instance'

const globalLoading = new GlobalLoading(GLOBAL_LOADING_DEFAULT_CONFIG)

/**
 * 请求拦截
 *
 * @export
 * @param {Object} reqConf 请求配置
 * @returns 请求配置
 */
export function reqResolveFn(reqConf) {
  globalLoading.start()

  !navigator.onLine && Message(OFFLINE_MSG)

  return resendToken.requestCollect(reqConf) // 请求收集
}

/**
 * 请求报错
 *
 * @export
 * @param {Error} reqErr 错误
 * @returns 错误
 */
export function reqRejectFn(reqErr) {
  globalLoading.end()

  return Promise.reject(reqErr)
}

/**
 * 响应成功
 *
 * @export
 * @param {Object} respObj
 * @returns 响应体
 */
export function respSuccFn(respObj) {
  globalLoading.end()

  if (
    isEmpty(respObj.data) ||
    respObj.data.code == null ||
    respObj.data.result == null
  ) {
    !respObj.config._noShowDefaultError &&
      window[GLOBAL_NAME_SPACE].$bus.$emit(
        'business-response-incorrect',
        '服务器异常，请稍后重试。'
      )

    return Promise.reject('未获取到有效消息体')
  }

  const { data: resData } = respObj

  const { code } = resData

  switch (code) {
    case TOKEN_EXPIRED: // token过期收集
      return resendToken.responseCollect(respObj.config)
    case 200:
      return resData.result
    default:
      !respObj.config._noShowDefaultError &&
        window[GLOBAL_NAME_SPACE].$bus.$emit(
          'business-response-incorrect',
          '服务器异常，请稍后重试。'
        )
      return Promise.reject(resData)
  }
}

/**
 * 响应失败
 *
 * @export
 * @param {Error} respErr 错误
 * @returns 错误
 */
export function respFailFn(respErr) {
  globalLoading.end()

  return Promise.reject(respErr)
}
