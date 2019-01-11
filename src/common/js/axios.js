/**
 * * 封装axios
 */

import axios from 'axios'

const AXIOS_DEFAULT_CONFIG = {
  timeout: 10000,
  maxContentLength: 2000,
  headers: {}
}

let axiosInstance = {}

axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG)

// 注入请求拦截
axiosInstance.interceptors.request.use(
  reqObj => {
    // * 自定义请求拦截逻辑，可以处理权限，请求发送监控等
    return reqObj
  },
  reqErr => {
    // * 自定义发送请求失败逻辑，断网，请求发送监控等
    return Promise.reject(reqErr)
  }
)

// 注入响应拦截
axiosInstance.interceptors.response.use(
  resObj => {
    let resData = resObj.data
    return resData
    // let { code } = resData

    // switch (code) {
    //   case 0: // 如果业务成功，直接进成功回调
    //     return resData.data
    //   case 1111:
    //     // 如果业务失败，根据不同 code 做不同处理
    //     // 比如最常见的授权过期跳登录
    //     // 特定弹窗
    //     // 跳转特定页面等
    //     location.href = 'xxx' // 这里的路径也可以放到全局配置里
    //     return
    //   default:
    //     // 业务中还会有一些特殊 code 逻辑，我们可以在这里做统一处理，也可以下方它们到业务层
    //     return Promise.reject(resData)
    // }
  },
  resErr => {
    // * 响应失败，可根据 resErr.message 和 resErr.response.status 来做监控处理
    console.log(resErr)
    return Promise.reject(resErr)
  }
)

export default axiosInstance
