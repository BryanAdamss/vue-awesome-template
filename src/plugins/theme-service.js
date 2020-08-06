/**
 * @author GuangHui
 * @description 主题切换服务
 */

export default class ThemeService {
  constructor() {
    this.styleEl = null
  }

  /**
   * 应用主题
   *
   * @param {Map} themeMap  主题map
   * @memberof ThemeService
   */
  applyTheme(themeMap) {
    if (!(themeMap instanceof Map)) throw new Error('themeMap必须为Map类型')

    const cssText = this._genCssText(themeMap)

    if (!this.styleEl) {
      this.styleEl = document.createElement('style')
      this.styleEl.innerText = `:root{${cssText}}`
      this.styleEl.setAttribute('data-theme-id', Math.random())
      document.head.appendChild(this.styleEl)
    } else {
      this.styleEl.innerText = `:root{${cssText}}`
    }
  }

  destroy() {
    document.head.removeChild(this.styleEl)

    this.styleEl = null
  }

  /**
   * 生成样式字符串
   *
   * @param {Map} themeMap 主题map
   * @returns css var 样式字符串
   * @memberof ThemeService
   */
  _genCssText(themeMap) {
    return Array.from(themeMap.entries())
      .map(([prop, val]) => `--${prop}:${val};`)
      .join('')
  }
}
