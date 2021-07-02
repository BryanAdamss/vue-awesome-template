/**
 * @author GuangHui
 * @description katex wrapper
 */

import { loadCss, loadJs } from 'Utils/dom'

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

export default class KatexWrapper {
  static filterMap = filterMap

  static renderToString(str) {
    if (!window.katex) throw new Error('window.katex can not access')

    return window.katex.renderToString(str, {
      throwOnError: true,
      unicodeTextInMathMode: true
    })
  }

  static getInstance(opts) {
    return this._instance || (this._instance = new KatexWrapper(opts))
  }

  constructor({
    css = '//static.zhixue.com/middlehomework/common/libs/katex-2.4.0-custom/katex.css',
    js = '//static.zhixue.com/middlehomework/common/libs/katex-2.4.0-custom/katex.min.js'
  } = {}) {
    if (KatexWrapper._instance) return KatexWrapper._instance

    if (typeof css !== 'string' || typeof js !== 'string')
      throw new Error('css、js can not be empty')

    this.css = css
    this.js = js
    this.isLoading = false
    this.pendingQueue = []

    return (KatexWrapper._instance = this)
  }

  /**
   * 加载资源
   *
   * @return {Promise} promise实例
   * @memberof KatexWrapper
   */
  load() {
    return Promise.all([loadCss(this.css), loadJs(this.js)])
  }

  /**
   * 转义正则组
   *
   * @param {String} group 正则字符串组
   * @return {String} 转移后的字符串
   * @memberof KatexWrapper
   */
  escapeGroup(group) {
    return Array.from(KatexWrapper.filterMap.entries()).reduce(
      (acc, [reg, replacement]) =>
        reg.test(acc) ? acc.replace(reg, replacement) : acc,
      group
    )
  }

  /**
   * 渲染
   *
   * @param {String} str 待渲染的字符串
   * @return {String} katex渲染后的字符串
   * @memberof KatexWrapper
   */
  _render(str) {
    if (typeof str !== 'string') throw new Error('str must be a string')

    if (!/\\\(.*?\\\)/.test(str)) return str

    return str.replace(
      /\\\(.*?\\\)/g,
      group => ` ${KatexWrapper.renderToString(this.escapeGroup(group))} `
    )
  }

  /**
   * 执行等待队列
   *
   * @param {Object} [{ immediateReject = false, immediateRejectErr }={}] 立即reject对象
   * @return {void} 无返回
   * @memberof KatexWrapper
   */
  run({ immediateReject = false, immediateRejectErr } = {}) {
    if (!this.pendingQueue || !this.pendingQueue.length)
      return Promise.resolve()

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
   * @param {String} str 待渲染的字符串
   * @return {String} katex渲染后的字符串
   * @memberof KatexWrapper
   */
  render(str) {
    return new Promise((resolve, reject) => {
      if (typeof str !== 'string')
        return reject(new Error('str can not be empty'))

      if (window.katex) {
        return resolve(this._render(str))
      } else {
        this.pendingQueue.push({ resolve, reject, str })

        if (!this.isLoading) {
          this.isLoading = true

          this.load()
            .then(() => {
              this.isLoading = false

              this.run()
            })
            .catch(err => {
              console.log('load katex err', err)
              this.isLoading = false

              // load失败，需要触发等待队列中的reject，以执行后续流程
              this.run({
                immediateReject: true,
                immediateRejectErr: err
              })
            })
        }
      }
    })
  }
}
