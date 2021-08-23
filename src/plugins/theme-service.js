/**
 * @author GuangHui
 * @description 主题切换服务
 */

import { canSupportCssVar } from 'Utils/dom'

export class ThemeService {
  constructor() {
    this.styleEl = null
    this.styleElId = null
  }

  /**
   * 应用主题
   *
   * @param {Array} themeArr  主题配置数组
   * @memberof ThemeService
   */
  applyTheme(themeArr) {
    if (!Array.isArray(themeArr) || !themeArr.length) return

    if (typeof MutationObserver === 'function') {
      if (canSupportCssVar()) {
        this._apply(themeArr)
      } else {
        this._loadCssVarsPonyfill().then(res => {
          this._apply(themeArr)
        })
      }
    } else {
      this._loadMutationObserverPolyfill().then(() => {
        if (canSupportCssVar()) {
          this._apply(themeArr)
        } else {
          this._loadCssVarsPonyfill().then(res => {
            this._apply(themeArr)
          })
        }
      })
    }
  }

  destroy() {
    document.head.removeChild(this.styleEl)

    this.styleEl = null
    this.styleElId = null
  }

  /**
   * 应用主题数组
   *
   * @param {Array} themeArr 主题配置数组
   * @memberof ThemeService
   */
  _apply(themeArr) {
    const cssText = this._genCssText(themeArr)

    if (!this.styleEl) {
      this.styleEl = document.createElement('style')
      this.styleEl.innerText = `:root{${cssText}}`
      this.styleElId = Math.random()
      this.styleEl.setAttribute('data-theme-id', this.styleElId)
      document.head.appendChild(this.styleEl)
    } else {
      this.styleEl.innerText = `:root{${cssText}}`
    }
  }

  /**
   * 加载MutationObserverPolyfill
   *
   * @returns
   * @memberof ThemeService
   */
  _loadMutationObserverPolyfill() {
    return import(
      /* webpackChunkName:'mutationobserver-shim' */ 'mutationobserver-shim'
    ).catch(err => {
      console.log('加载mutationobserver-shim失败', err)
    })
  }

  /**
   * 加载CssVarsPonyfill
   *
   * @memberof ThemeService
   */
  _loadCssVarsPonyfill() {
    return import(
      /* webpackChunkName:'css-vars-ponyfill' */ 'css-vars-ponyfill'
    )
      .then(({ default: cssVars }) => {
        // https://jhildenbiddle.github.io/css-vars-ponyfill/#/
        const config = {
          watch: true, // 监听style、link的增删及修改,依赖MutationObserver
          preserveVars: true, // 保留css3变量，默认false
          onlyLegacy: false, // 默认true，默认只在ie上启用兼容，置为false，可用于调试
          silent: false /* 若为静默模式不会输出log */
        }

        cssVars(config)

        return true
      })
      .catch(err => {
        console.log('加载css-vars-ponyfill失败', err)
      })
  }

  /**
   * 生成样式字符串
   *
   * @param {Array} themeArr  主题配置数组
   * @returns css var 样式字符串
   * @memberof ThemeService
   */
  _genCssText(themeArr) {
    return themeArr.map(([prop, val]) => `--${prop}:${val};`).join('')
  }
}
