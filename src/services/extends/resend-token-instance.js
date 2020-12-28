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

const isTokenExpired = code => code === TOKEN_EXPIRED

const getToken = () => Promise.resolve('test-token')

const resendRequestInstance = axios.create(AXIOS_DEFAULT_CONFIG)

export default new ResendToken({
  getTokenFn: getToken,
  requestInstance: resendRequestInstance,
  configProcessor: config => {
    // 此处config会包含_newToken(新token)、_resendCount(重试次数)字段
    console.log('configProcessor', config)
    return config
  },
  isTokenExpiredFn: isTokenExpired,
  onGetTokenFnResolved: newToken => {
    globalSaver.setItem('newToken', newToken)
  },
  onGetTokenFnRejected: err => {
    console.log(err)

    toast({
      message: '您的账号登录状态已失效，请退出重新登录',
      duration: 3000
    })

    // 可以跳转登录页
  }
})
