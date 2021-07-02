/**
 * @author GuangHui
 * @description mathjax wrapper
 */
import { loadJs } from 'Utils/dom'

export default class MathJaxWrapper {
  static getInstance(opts) {
    return this._instance || (this._instance = new MathJaxWrapper(opts))
  }

  constructor({
    src = '//static.zhixue.com/middlehomework/common/libs/mathjax-2.7.4-custom/MathJax.js?config=TeX-AMS_CHTML'
  } = {}) {
    if (MathJaxWrapper._instance) return MathJaxWrapper._instance

    if (typeof src !== 'string') throw new Error('src can not be empty')

    this.src = src
    this.isLoading = false
    this.pendingQueue = []

    return (MathJaxWrapper._instance = this)
  }

  /**
   * 加载资源
   *
   * @return {void} 无返回
   * @memberof MathJaxWrapper
   */
  load() {
    return loadJs(this.src)
  }

  /**
   * 设置mathjax config
   *
   * @return {void} 无返回
   * @memberof MathJaxWrapper
   */
  setMathJaxConfig() {
    if (!window.MathJax || !window.MathJax.Hub || !window.MathJax.Hub.Config)
      return Promise.reject('window.MathJax.Hub.Config not exist')

    window.MathJax.Hub.processSectionDelay = 10

    window.MathJax.Hub.Config({
      showProcessingMessages: false,
      messageStyle: 'none',
      showMathMenu: false,
      CommonHTML: {
        showMathMenu: false,
        styles: {
          '.mjx-chtml': {
            padding: '5px 2px',
            'font-size': '100% !important',
            outline: 'none'
          },
          '.mjx-charbox': { width: '50% !important' },
          '.mjx-chtml[tabindex]:focus, body :focus .mjx-chtml[tabindex]': {
            display: 'inline-block'
          }
        },
        scale: 50
      }
    })

    return true
  }

  /**
   * 渲染对应id节点
   *
   * @param {String} id 目标节点id
   * @return {Object} typeset返回值
   * @memberof MathJaxWrapper
   */
  _render(id) {
    return MathJax.Hub.Queue(['Typeset', MathJax.Hub, id])
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
      const { resolve, reject, id } = this.pendingQueue.shift()
      if (immediateReject) {
        reject(immediateRejectErr)
      } else {
        try {
          resolve(this._render(id))
        } catch (error) {
          reject(error)
        }
      }
    }
  }

  /**
   * 包装后的渲染对应id节点
   *
   * @param {String} id 目标节点id
   * @return {Object} typeset返回值
   * @memberof MathJaxWrapper
   */
  render(id) {
    return new Promise((resolve, reject) => {
      if (!id) return reject(new Error('id can not be empty'))

      if (window.MathJax) {
        return resolve(this._render(id))
      } else {
        this.pendingQueue.push({ resolve, reject, id })

        if (!this.isLoading) {
          this.isLoading = true

          this.load()
            .then(() => {
              this.setMathJaxConfig()
              this.isLoading = false

              this.run()
            })
            .catch(err => {
              console.log('load mathjax err', err)
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
