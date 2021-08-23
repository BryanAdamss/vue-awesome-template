/**
 * @author GuangHui
 * @description mathjax wrapper
 */
import { loadJs } from 'Utils/dom.js'

/**
 * MathJax 包装类
 *
 * @date 2021-05-20 14:12:59
 * @export
 * @class MathJaxWrapper
 */
export class MathJaxWrapper {
  /**
   * 获取实例
   *
   * @date 2021-05-20 14:13:13
   * @static
   * @param {Object} opts 入参
   * @return {MathJaxWrapper}  MathJaxWrapper实例
   * @memberof MathJaxWrapper
   */
  static getInstance(opts) {
    return this._instance || (this._instance = new MathJaxWrapper(opts))
  }

  /**
   * MathJaxWrapper构造函数
   *
   * @date 2021-05-20 14:13:45
   * @constructor
   * @param {Object} opts 入参，包含js字段，默认指向'//static.zhixue.com/middlehomework/common/libs/mathjax-2.7.4-custom/MathJax.js?config=TeX-AMS_CHTML'
   * @memberof MathJaxWrapper
   * @example
   // 自定义mathjax资源地址
   const mj = new MathJaxWrapper({js:"https://cdn.jsdelivr.net/npm/mathjax@2.7.0/unpacked/MathJax.min.js"})
   */
  constructor({
    js = '//static.zhixue.com/middlehomework/common/libs/mathjax-2.7.4-custom/MathJax.js?config=TeX-AMS_CHTML'
  } = {}) {
    if (MathJaxWrapper._instance) return MathJaxWrapper._instance

    if (typeof js !== 'string') throw new Error('js can not be empty')

    this.js = js
    this.isLoading = false
    this.pendingQueue = []

    return (MathJaxWrapper._instance = this)
  }

  /**
   * 加载mathjax
   *
   * @date 2021-05-20 14:16:12
   * @private
   * @return {Promise}  Promise实例
   * @memberof MathJaxWrapper
   */
  _load() {
    return loadJs(this.js)
  }

  /**
   * 设置mathjax config
   *
   * @date 2021-05-20 14:16:41
   * @private
   * @return {void}  无返回
   * @memberof MathJaxWrapper
   */
  _setMathJaxConfig() {
    if (!window.MathJax || !window.MathJax.Hub || !window.MathJax.Hub.Config) return Promise.reject('window.MathJax.Hub.Config not exist')

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
   * 内部渲染方法(渲染对应id节点)
   *
   * @date 2021-05-20 14:17:09
   * @private
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
   * @date 2021-05-19 15:15:29
   * @private
   * @param {Object} opt 立即reject对象，包含immediateReject、immediateRejectErr字段
   * @property immediateReject 默认为false
   * @property immediateRejectErr 自定义injected错误
   * @return {void} 无返回
   * @memberof MathJaxWrapper
   */
  _run({ immediateReject = false, immediateRejectErr } = {}) {
    if (!this.pendingQueue || !this.pendingQueue.length) return Promise.resolve()

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
   * 包装过的渲染函数
   *
   * @date 2021-05-19 15:15:54
   * @public
   * @instance
   * @param {String} id 目标节点id
   * @return {Promise} Promise实例
   * @fulfil 渲染成功，无返回
   * @reject error
   * @memberof MathJaxWrapper
   * @example
   * const wp = document.querySelector('#mathjax-wp')
   * wp.innerHTML = '\frac{AC}{DF}'
   *
   * const mathjax = new MathJaxWrapper()
   * mathjax.render('mathjax-wp')
   * .then(()=>{
   *  console.log('渲染成功')
   * })
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

          this._load()
            .then(() => {
              this._setMathJaxConfig()
              this.isLoading = false

              this._run()
            })
            .catch(err => {
              console.log('load mathjax err', err)
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
