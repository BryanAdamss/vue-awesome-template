/**
 * @author ghchu
 * @description 重新发送token
 */

 import { makePromiseTimeoutAutoCancel } from 'Utils'

 // 直接返回
 const noop = val => val
 
 /**
  * ResendToken
  *
  * @date 2021-08-05 11:07:15
  * @export
  * @class ResendToken
  */
 export default class ResendToken {
   /**
    * Creates an instance of ResendToken.
    * @constructor
    * @date 2021-08-05 11:25:29
    * @param {Object} options 参数对象
    * @property resendTimeout 重试超时时间
    * @property resendCountMax 单个请求重试最大次数
    * @property getTokenFn 获取token方法
    * @property configProcessor 请求config的处理方法，会在重发请求时调用，会携带_newToken和_resendCount字段
    * @property requestInstance 负责重新发送请求的实例
    * @property isTokenExpiredFn token过期判断方法
    * @property onGetTokenFnResolved getTokenFn resolve时触发的回调
    * @property onGetTokenFnRejected getTokenFn reject时触发的回调
    * @memberof ResendToken
    */
   constructor({
     resendTimeout, // 重试超时时间
     resendCountMax, // 单个请求重试最大次数
     getTokenFn, // 获取token方法
     configProcessor, // 请求config的处理方法，会在重发请求时调用，会携带_newToken和_resendCount字段
     requestInstance, // 负责重新发送请求的实例
     isTokenExpiredFn, // token过期判断方法
     onGetTokenFnResolved, // getTokenFn resolve时触发的回调
     onGetTokenFnRejected // getTokenFn reject时触发的回调
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
     this.getTokenFn = makePromiseTimeoutAutoCancel(
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
    * 请求拦截器中调用，缓冲正在更新token时进来的请求
    *
    * @date 2021-08-05 11:04:16
    * @public
    * @param {Object} config 请求对象，一般为axios请求时的配置对象
    * @return {Promise} promise实例
    * @memberof ResendToken
    */
   requestCollect(config) {
     return this.isUpdating
       ? new Promise((resolve, reject) => {
         this.pending.push({ resolve, reject, config })
       })
       : config
   }
 
   /**
    * 返回拦截器中token过期时调用，收集相关配置用于重放
    *
    * @date 2021-08-05 11:07:49
    * @public
    * @param {Object} config 请求对象，一般为axios请求时的配置对象
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
 
       this._resend()
     })
   }
 
   /**
    * 重发请求
    *
    * @date 2021-08-05 11:10:24
    * @inner
    * @memberof ResendToken
    */
   _resend() {
     if (this.isUpdating) return
 
     this.isUpdating = true
 
     // 获取新token
     this.getTokenFn()
       .then(this._handleGetTokenResolve.bind(this))
       .catch(this._handleGetTokenReject.bind(this))
   }
 
   /**
    * 处理getTokenFn resolve，内部会调用onGetTokenFnResolved回调
    *
    * @date 2021-08-05 11:11:20
    * @inner
    * @param {String} newToken 新token
    * @memberof ResendToken
    */
   _handleGetTokenResolve(newToken) {
     console.log('_handleGetTokenResolve', newToken)
     this.timer && clearTimeout(this.timer)
     this.isUpdating = false
 
     if (!newToken) {
       this._handleGetTokenReject(
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
 
     this._resendRequests(this.processing, newToken)
     this._resendRequests(this.pending, newToken)
   }
 
   /**
    * 处理getTokenFn reject，内部会调用onGetTokenFnRejected回调
    *
    * @date 2021-08-05 11:13:13
    * @inner
    * @param {Error} err 错误
    * @memberof ResendToken
    */
   _handleGetTokenReject(err) {
     this.isUpdating = false
     this.timer && clearTimeout(this.timer)
 
     // 业务自行处理获取token错误(超时、报错，此时可以跳转登录)
     console.log('_handleGetTokenReject', err)
     this.onGetTokenFnRejected(err)
   }
 
   /**
    * 循环重发请求
    *
    * @date 2021-08-05 11:13:57
    * @inner
    * @param {Array} [queue=[]] 请求队列
    * @param {String} token 新token
    * @memberof ResendToken
    */
   _resendRequests(queue = [], token) {
     if (!queue || !queue.length || !token) return
 
     this._iterator(
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
           .catch(reject)
       }
     )
   }
 
   /**
    * 迭代器
    *
    * @date 2021-08-05 11:14:49
    * @inner
    * @param {Array} [queue=[]] 目标队列
    * @param {Function} [processorFn=this.noop] 处理函数
    * @memberof ResendToken
    */
   _iterator(queue = [], processorFn = this.noop) {
     while (queue.length) processorFn(queue.shift())
   }
 }
 