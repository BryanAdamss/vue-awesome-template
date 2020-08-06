/**
 * @author GaungHui
 * @description ie css3 vars 兼容
 */

import { isIE } from 'Utils/browser'

import { ENABLE_IE_CSS_VARS_COMPAT } from 'Config'

export function ieCssVarCompat() {
  if (!ENABLE_IE_CSS_VARS_COMPAT || !isIE) return

  if (window.cssVars && typeof cssVars === 'function') {
    window.cssVars({ watch: true /* 监听 */, silent: true /* 静默 */ })
  } else {
    import(/* webpackChunkName:'cssVars' */ 'css-vars-ponyfill')
      .then(({ default: cssVars }) => {
        window.cssVars = cssVars
        // ie不支持css var的降级解决方案
        cssVars({ watch: true /* 监听 */, silent: true /* 静默 */ })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
