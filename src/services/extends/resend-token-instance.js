/**
 * @author GuangHui
 * @description ResendToken 实例
 */
import axios from 'axios'

import { AXIOS_DEFAULT_CONFIG } from 'Config'

import ResendToken from 'Plugins/resend-token'

import toast from 'Base/BaseToast'

import { TOKEN_EXPIRED } from 'Services/const/common'
import { globalSaver } from 'Services/extends/global-saver'

const isTokenExpiredFn = code => code === TOKEN_EXPIRED

const getToken = () => Promise.resolve('test-token')

// 专门用于重发请求的axios实例
// 重发请求的requestInstance若和正常请求的axios实例是同一个，则会共享拦截器，可能会导致意想不到的情况发生；
// 建议重新创建一个新axios实例专门用于重新发送请求
const resendRequestInstance = axios.create(AXIOS_DEFAULT_CONFIG)

export default new ResendToken({
  getTokenFn: getToken,
  requestInstance: resendRequestInstance,
  configProcessor: config => {
    // 请求config的处理方法，会在重发请求时调用，会携带_newToken和_resendCount字段
    // 此处config会包含_newToken(新token)、_resendCount(重试次数)字段
    console.log('configProcessor', config)
    return config
  },
  isTokenExpiredFn, // token过期判断方法
  onGetTokenFnResolved: newToken => {
    // getTokenFn resolve时触发的回调，此时可存储相关token，后续使用
    globalSaver.setItem('newToken', newToken)
  },
  onGetTokenFnRejected: err => {
    // getTokenFn reject时调用，此时可以提示用户或者尝试让用户重新登录
    console.log(err)

    toast({
      message: '您的账号登录状态已失效，请退出重新登录',
      duration: 3000
    })
  }
})
