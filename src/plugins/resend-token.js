/**
 * @author GuangHui
 * @description 重新发送token
 */

import { makePromiseCancelable } from 'Utils'

// 直接返回
const noop = val => val

export default class ResendToken {
  constructor({
    resendTimeout, // 重试超时时间
    resendCountMax, // 单个请求重试最大次数
    getTokenFn, // 获取token方法
    configProcessor, // 请求config处理方法
    requestInstance, // 负责发送请求的实例
    isTokenExpiredFn, // token过期判断方法
    onGetTokenFnResolved, // 获取 token resolve时的回调
    onGetTokenFnRejected // 获取token reject时的回调
  } = {}) {
    if (typeof getTokenFn !== 'function') {
      throw new Error('请传入getTokenFn方法')
    }

    if (typeof isTokenExpiredFn !== 'function') {
      throw new Error('请传入isTokenExpiredFn方法')
    }
    if (!requestInstance) throw new Error('请传入requestInstance')

    this.resendTimeout = resendTimeout || 2 * 1000
    this.resendCountMax = resendCountMax || 1

    this.timeoutMsg = 'getTokenFn timeout'
    this.getTokenFn = makePromiseCancelable(
      getTokenFn,
      this.resendTimeout,
      this.timeoutMsg
    )

    this.onGetTokenFnResolved =
      typeof onGetTokenFnResolved === 'function' ? onGetTokenFnResolved : noop

    this.onGetTokenFnRejected =
      typeof onGetTokenFnRejected === 'function' ? onGetTokenFnRejected : noop

    this.configProcessor =
      typeof configProcessor === 'function' ? configProcessor : noop

    this.requestInstance = requestInstance
    this.isTokenExpiredFn = isTokenExpiredFn

    this.processing = [] // 当前需要重新发送请求队列
    this.pending = [] // 等待重新发送的，isUpdating = true时，进入的请求

    this.isUpdating = false // 正在更新token中

    this.timer = null
  }

  /**
   * 请求拦截器中调用
   */
  requestCollect(config) {
    return this.isUpdating
      ? new Promise((resolve, reject) => {
          this.pending.push({ resolve, reject, config })
        })
      : config
  }

  /**
   * 返回拦截器中token过期时调用
   *
   * @param {Object} config 请求对象
   * @return {Promise} promise实例
   * @memberof ResendToken
   */
  responseCollect(config) {
    return new Promise((resolve, reject) => {
      this.processing.push({
        resolve,
        reject,
        config
      })

      this.resend()
    })
  }

  /**
   * 重发请求
   *
   * @memberof ResendToken
   */
  resend() {
    if (this.isUpdating) return

    this.isUpdating = true

    // 获取新token
    this.getTokenFn()
      .then(this.handleGetTokenResolve.bind(this))
      .catch(this.handleGetTokenReject.bind(this))
  }

  /**
   * 处理获取token resolve
   *
   * @param {String} newToken 新token
   * @memberof ResendToken
   */
  handleGetTokenResolve(newToken) {
    console.log('handleGetTokenResolve', newToken)
    this.timer && clearTimeout(this.timer)
    this.isUpdating = false

    if (!newToken) {
      this.handleGetTokenReject(
        new Error('getTokenFn返回的Promise必须resolve一个字符串类型的新token')
      )
      return
    }

    // 触发回调
    this.onGetTokenFnResolved(newToken)

    // 循环重发请求
    console.log(
      'processing',
      JSON.stringify(this.processing),
      this.processing.length
    )
    console.log('pending', JSON.stringify(this.pending), this.pending.length)

    this.resendRequests(this.processing, newToken)
    this.resendRequests(this.pending, newToken)
  }

  /**
   * 处理获取token reject
   *
   * @param {Error} err 错误
   * @memberof ResendToken
   */
  handleGetTokenReject(err) {
    this.isUpdating = false
    this.timer && clearTimeout(this.timer)

    // 业务自行处理获取token错误(超时、报错，此时可以跳转登录)
    console.log('handleGetTokenReject', err)
    this.onGetTokenFnRejected(err)
  }

  /**
   * 循环重发请求
   *
   * @param {Array} [queue=[]] 请求队列
   * @param {String} token 新token
   * @memberof ResendToken
   */
  resendRequests(queue = [], token) {
    if (!queue || !queue.length || !token) return

    this.iterator(
      /* 目标队列 */ queue,
      /* 处理函数 */ ({ resolve, reject, config }) => {
        // 重试次数限制
        if (config._resendCount >= this.resendCountMax) {
          reject(`${config.url}: over resend max count ${this.resendCountMax}`)
          return
        }

        // * 重发请求的requestInstance若和token过期的请求实例一样，则会共享拦截器
        // * 可能会导致意想不到的情况发生
        this.requestInstance(
          this.configProcessor({
            ...config,
            _newToken: token, // 新token
            _resendCount: config._resendCount ? ++config._resendCount : 1 // 记录重试次数
          })
        )
          .then(resp => {
            console.group('resend')
            console.log('resend resp', resp)
            console.log('isTokenExpired', resp, this.isTokenExpiredFn(resp))
            console.groupEnd('resend')

            // 校验新返回的resp，是否过期
            return this.isTokenExpiredFn(resp)
              ? reject(this.timeoutMsg) // ? 将错误直接抛出是否合适？
              : resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      }
    )
  }

  /**
   * 迭代器
   *
   * @param {Array} [queue=[]] 目标队列
   * @param {Function} [processorFn=this.noop] 处理函数
   * @memberof ResendToken
   */
  iterator(queue = [], processorFn = this.noop) {
    while (queue.length) processorFn(queue.shift())
  }
}
