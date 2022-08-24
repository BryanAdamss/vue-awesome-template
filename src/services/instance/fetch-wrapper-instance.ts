/**
 * @author GuangHui
 * @description FetchWrapper实例
 */

import { FetchWrapper } from '@/plugins/fetch-wrapper'

/* 创建FetchWrapper实例（单例） */
export const fetchWrapper = new FetchWrapper({
  singleton: true,
  /* 测试地址 */
  baseUrl: 'https://petstore.swagger.io/v2',
  transformData: (data) => {
    return JSON.stringify({
      base: {
        appId: 'JISC57213',
        appVersion: '',
        sysVersion: 'v1000',
        sysType: '',
        packageName: 'com.vat.test.req',
        udid: '32323231',
        expand: {},
      },
      params: data,
    })
  },
  onBeforeSendReq: (opts) => {
    opts.headers = {
      ...opts.headers,
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'xxx',
    }

    console.log('global-onBeforeSendReq', opts)
    return opts
  },
  onSendReqError: (err) => {
    console.log('🚦 -> file: fetch-wrapper-instance.ts -> line 19 -> err', err)
  },
  onReciveRespSucc: (resp: unknown) => {
    console.log('🚦 -> file: fetch-wrapper-instance.ts -> line 22 -> resp', resp)
    return resp
  },
  onReciveRespError: (err) => {
    console.log('🚦 -> file: fetch-wrapper-instance.ts -> line 25 -> err', err)
  },
})

export const fetchGet = fetchWrapper.create('GET')
export const fetchPost = fetchWrapper.create('POST')
