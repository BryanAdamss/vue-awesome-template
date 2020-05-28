/**
 * @author GuangHui
 * @description 浏览器判断
 */

export const inBrowser = typeof window !== 'undefined'

const UA = inBrowser && window.navigator.userAgent.toLowerCase()

export const isIE = UA && /msie|trident/.test(UA)
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
export const isEdge = UA && UA.indexOf('edge/') > 0
export const isAndroid = UA && UA.indexOf('android') > 0
export const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge
export const isPhantomJS = UA && /phantomjs/.test(UA)
export const isFF = UA && UA.match(/firefox\/(\d+)/)

/**
 * 使用noopener打开一个新标签页
 * https://juejin.im/post/5ecfc6b5f265da76d53c0c91
 */
export function openInNewTabWithoutOpener(href) {
  if (typeof href !== 'string') return

  var newTab = window.open()
  newTab.opener = null
  newTab.location = href
}

/**
 * 旧版本的Safari中,使用noopener打开一个新标签页
 * https://juejin.im/post/5ecfc6b5f265da76d53c0c91
 */
export function openInNewTabWithNoopenerInSafari(href) {
  if (typeof href !== 'string') return

  const aTag = document.createElement('a')
  aTag.rel = 'noopener'
  aTag.target = '_blank'
  aTag.href = href
  aTag.click()
}
