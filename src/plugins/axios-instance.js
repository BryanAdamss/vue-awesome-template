/**
 * @author GuangHui
 * @description axios实例
 */

import axios from 'axios'
import { AXIOS_DEFAULT_CONFIG } from 'Config'
import {
  reqResolveFn,
  reqRejectFn,
  respSuccFn,
  respFailFn
} from 'Config/interceptors/axios-interceptor'

const axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG)

axiosInstance.interceptors.request.use(reqResolveFn, reqRejectFn)

axiosInstance.interceptors.response.use(respSuccFn, respFailFn)

export default axiosInstance
