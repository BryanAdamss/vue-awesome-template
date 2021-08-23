/**
 * @author GuangHui
 * @description katex wrapper
 */

import { loadCss, loadJs } from 'Utils/dom'

/**
 * 特殊字符过滤正则映射表
 * @example
 * new Map([
  [/\\\(/g, ''],
  [/\\\)/g, ''],
  [/&lt;/g, '<'],
  [/&gt;/g, '>'],
  [/，/g, ', '],
  [//g, ''],
  [/&times;/g, '×'],
  [/&divide;/g, '÷'],
  [/&nbsp;/g, ' '],
  [/&middot;/g, '.'],
  [/①/g, '(1)'],
  [/②/g, '(2)'],
  [/③/g, '(3)'],
  [/④/g, '(4)'],
  [/′/g, "'"],
  [/﹡/g, '*'],
  [/～/g, '~'],
  [/&quot;/g, '"']
])
 */
export const filterMap = new Map([
  [/\\\(/g, ''],
  [/\\\)/g, ''],
  [/&lt;/g, '<'],
  [/&gt;/g, '>'],
  [/，/g, ', '],
  [//g, ''],
  [/&times;/g, '×'],
  [/&divide;/g, '÷'],
  [/&nbsp;/g, ' '],
  [/&middot;/g, '.'],
  [/①/g, '(1)'],
  [/②/g, '(2)'],
  [/③/g, '(3)'],
  [/④/g, '(4)'],
  [/′/g, "'"],
  [/﹡/g, '*'],
  [/～/g, '~'],
  [/&quot;/g, '"']
])

/**
 * katex包装器，支持按需加载katex库
 *
 * @date 2021-05-19 14:35:05
 * @export
 * @class KatexWrapper
 */
export class KatexWrapper {
  /**
   * 特殊字符过滤正则映射表
   *
   * @date 2021-05-19 14:43:02
   * @static
   * @memberof KatexWrapper
   * @example
   * 自定义过滤映射表
   * KatexWrapper.filterMap = new Map([[/\s/,'\n']])
   */
  static filterMap = filterMap

  /**
   * 使用katex.renderToString渲染一个字符串
   *
   * @date 2021-05-19 14:43:11
   * @static
   * @param {String} str 输入字符串
   * @return {String}  渲染后的字符串
   * @memberof KatexWrapper
   */
  static renderToString(str) {
    if (!window.katex) throw new Error('window.katex can not access')

    return window.katex.renderToString(str, {
      throwOnError: true,
      unicodeTextInMathMode: true
    })
  }

  /**
   * 获取KatexWrapper实例（单例）
   *
   * @date 2021-05-19 14:44:02
   * @static
   * @param {Object} opts 构造参数
   * @return {KatexWrapper}  KatexWrapper Instance
   * @memberof KatexWrapper
   * @example
   * const a = new KatexWrapper()
   * const b = new KatexWrapper()
   * const c = KatexWrapper.getInstance()
   *
   * console.log(a === b) // true
   * console.log(a === c) // true
   * console.log(b === c) // true
   */
  static getInstance(opts) {
    return this._instance || (this._instance = new KatexWrapper(opts))
  }

  /**
    * KatexWrapper构造函数
    * @date 2021-05-19 14:35:58
    * @constructor
    * @param {Object} options 参数对象，参数对象包含字段css、js，为远程katex CDN地址；
    * @property css 默认值：'//static.zhixue.com/middlehomework/common/libs/katex-2.4.0-custom/katex.css'
    * @property js 默认值：'//static.zhixue.com/middlehomework/common/libs/katex-2.4.0-custom/katex.min.js'
    * @memberof KatexWrapper
    * @example
    * 自定义资源cdn地址
    * new KatexWrapper({
    *   css:'https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css',
    *   js:'https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.js'
    * })
    */
  constructor({
    css = '//static.zhixue.com/middlehomework/common/libs/katex-2.4.0-custom/katex.css',
    js = '//static.zhixue.com/middlehomework/common/libs/katex-2.4.0-custom/katex.min.js'
  } = {}) {
    if (KatexWrapper._instance) return KatexWrapper._instance

    if (typeof css !== 'string' || typeof js !== 'string') throw new Error('css、js can not be empty')

    this.css = css
    this.js = js
    this.isLoading = false
    this.pendingQueue = []

    return (KatexWrapper._instance = this)
  }

  /**
   * 加载js、css
   *
   * @date 2021-05-19 15:03:01
   * @private
   * @return {Promise} promise实例
   * @memberof KatexWrapper
   */
  _load() {
    return Promise.all([loadCss(this.css), loadJs(this.js)])
  }

  /**
   * 转义正则组
   *
   * @date 2021-05-19 15:14:00
   * @private
   * @param {String} group 正则字符串组
   * @return {String} 转义后的字符串
   * @memberof KatexWrapper
   */
  _escapeGroup(group) {
    return Array.from(KatexWrapper.filterMap.entries()).reduce(
      (acc, [reg, replacement]) => reg.test(acc) ? acc.replace(reg, replacement) : acc,
      group
    )
  }

  /**
   * 内部渲染方法
   *
   * @date 2021-05-19 15:16:22
   * @private
   * @param {String} str 待渲染的字符串
   * @return {String} katex渲染后的字符串
   * @memberof KatexWrapper
   */
  _render(str) {
    if (typeof str !== 'string') throw new Error('str must be a string')

    if (!/\\\(.*?\\\)/.test(str)) return str

    return str.replace(
      /\\\(.*?\\\)/g,
      group => ` ${KatexWrapper.renderToString(this._escapeGroup(group))} `
    )
  }

  /**
   * 执行等待队列
   *
   * @date 2021-05-19 15:15:29
   * @private
   * @param {Object} opt 立即reject对象，包含immediateReject、immediateRejectErr字段
   * @property immediateReject 默认为false
   * @property immediateRejectErr 自定义injected错误
   * @return {void} 无返回
   * @memberof KatexWrapper
   */
  _run({ immediateReject = false, immediateRejectErr } = {}) {
    if (!this.pendingQueue || !this.pendingQueue.length) return Promise.resolve()

    while (this.pendingQueue.length) {
      const { resolve, reject, str } = this.pendingQueue.shift()
      if (immediateReject) {
        reject(immediateRejectErr)
      } else {
        try {
          resolve(this._render(str))
        } catch (error) {
          reject(error)
        }
      }
    }
  }

  /**
   * 包装过的渲染函数
   *
   * @date 2021-05-19 15:15:54
   * @public
   * @instance
   * @param {String} str 待渲染的字符串
   * @return {Promise} Promise实例
   * @fulfil katex渲染后的字符串
   * @reject error
   * @memberof KatexWrapper
   * @example
   * const katex = new KatexWrapper()
   * katex.render('\frac{AC}{DF}').then(katexedStr =>console.log(katexedStr))
   */
  render(str) {
    return new Promise((resolve, reject) => {
      if (typeof str !== 'string') return reject(new Error('str can not be empty'))

      if (window.katex) {
        return resolve(this._render(str))
      } else {
        this.pendingQueue.push({ resolve, reject, str })

        if (!this.isLoading) {
          this.isLoading = true

          this._load()
            .then(() => {
              this.isLoading = false

              this._run()
            })
            .catch(err => {
              console.log('load katex err', err)
              this.isLoading = false

              // load失败，需要触发等待队列中的reject，以执行后续流程
              this._run({
                immediateReject: true,
                immediateRejectErr: err
              })
            })
        }
      }
    })
  }
}
