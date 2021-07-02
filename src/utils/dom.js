/**
 * @author GuangHui
 * @description dom 操作相关
 */

import { str2kebab } from 'Utils'
import { isEmpty } from 'Utils/type-judge'

/**
 * 添加样式类
 * @param {Element} el 元素
 * @param {String} className 样式名
 */
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  const newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

/**
 * 移除样式类
 * @param {Element} el 元素
 * @param {String} className 样式名
 */
export function removeClass(el, className) {
  if (!hasClass(el, className)) {
    return
  }
  const newClassList = el.className.split(' ')
  newClassList.splice(newClassList.indexOf(className), 1)
  el.className = newClassList.join(' ')
}

/**
 * 判断是否有样式类
 * @param {Element} el 元素
 * @param {String} className 样式类
 */
export function hasClass(el, className) {
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

/**
 * 获取/设置data-*
 * @param {Element} el 元素
 * @param {String} name 名称
 * @param {Any} val 需要设置的值
 */
export function getData(el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}

// 能力检测，判断浏览器支持哪种前缀
const elementStyle = document.createElement('div').style
// 利用IIFE得到支持的前缀
const vendor = (() => {
  // 利用transform做能力检测，来判断支持哪种前缀
  const transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (const key in transformNames) {
    // 支持某种前缀则直接返回
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  // 如果没有匹配，则返回false
  return false
})()

/**
 * 添加前缀
 * @param {String} style 样式字符串
 */
export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }
  // 支持标准，则直接返回
  if (vendor === 'standard') {
    return style
  }
  // 否则返回prefix后的字符串
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

/**
 * 获取元素尺寸
 * @param {Element} el 元素
 */
export function getRect(el) {
  if (el instanceof window.SVGElement) {
    const rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}

/**
 * 复制到剪贴板
 * @param {String} str 需要复制的字符串
 */
export function copyToClipboard(str) {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  if (selected) {
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(selected)
  }
}

/**
 * 滚动html到顶部
 */
export function scrollToTop() {
  const c = document.documentElement.scrollTop || document.body.scrollTop
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, c - c / 8)
  }
}

/**
 * 获取计算样式
 * @param {Object} ele
 * @returns {Object} 样式对象
 */
export function getStyle(ele) {
  // * 使用defaultView兼容FF<=30中出现的问题
  var view = ele.ownerDocument.defaultView

  if (!view || !view.opener) {
    view = window
  }

  return view.getComputedStyle(ele, null)
}

/**
 * 添加样式
 * @param {Element} el 元素
 * @param {Object} styleObj 样式obj
 */
export function addStyle(el, styleObj) {
  const oldStyle = el.style.cssText

  const newStyle = Object.entries(styleObj).reduce((acc, cur) => {
    cur[0] = str2kebab(cur[0]) // key转换成kebab-case
    return (acc += cur.join(':') + ';')
  }, oldStyle)

  el.style.cssText = newStyle
}

/**
 * 判断是否支持css3 变量
 *
 * @export
 * @returns 是否支持
 */
export function canSupportCssVar() {
  if (canSupportCssVar.isSupport != null) return canSupportCssVar.isSupport

  const id = 'test-support-css-var'
  let styleEl = document.createElement('style')
  styleEl.innerText = styleEl.innerText = `:root{--${id}:-9999;}#${id}{position:absolute;top:-99999em;left:-99999em;z-index:var(--${id});opacity:0;font-size:0;width:0;height:0;pointer-events: none;}`

  document.head.appendChild(styleEl)

  let testSpan = document.createElement('span')
  testSpan.id = id

  document.body.appendChild(testSpan)

  const styleObj = getStyle(testSpan)

  const isSupport = !!styleObj && styleObj.zIndex === '-9999'

  document.head.removeChild(styleEl)
  document.body.removeChild(testSpan)
  styleEl = null
  testSpan = null

  canSupportCssVar.isSupport = isSupport

  return isSupport
}

/**
 * 查看某元素是否命中css选择器字符串
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Element/matches
 * https://blog.csdn.net/king_xing/article/details/50460580
 *
 * @export
 * @param {Element} el 需要检测的el
 * @param {String} selector css选择器字符串
 * @returns 是否命中
 */
export function matches(el, selector) {
  const fn =
    Element.prototype.matches ||
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function(s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i = matches.length
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1
    }

  return fn.call(el, selector)
}

/**
 * 检查是否支持webp格式图片
 *
 * @export
 * @returns 是否支持webp
 */
export function supportWebp() {
  try {
    return (
      document
        .createElement('canvas')
        .toDataURL('image/webp')
        .indexOf('data:image/webp') === 0
    )
  } catch (err) {
    return false
  }
}

/**
 * 生成svg文本
 *
 * @export
 * @param {*} [{
 *   width = 300,
 *   height = 150,
 *   fontSize = 14,
 *   fontFamily = 'system-ui, sans-serif',
 *   color = '#a2a9b6',
 *   opacity = 1,
 *   x = 50,
 *   y = 50,
 *   content = 'svg测试文本',
 *   transform = 'rotate(0,0,0)'
 * }={}]
 * @return {String} svg字符串（未转义）
 */
export function genSvgText({
  width = 300,
  height = 150,
  fontSize = 14,
  fontFamily = 'system-ui, sans-serif',
  color = '#a2a9b6',
  opacity = 1,
  x = 50,
  y = 50,
  content = 'svg测试文本',
  rotate = 0
} = {}) {
  const size =
    width === 300 && height === 150
      ? ''
      : ` width="${width}" height="${height}"`

  const fill = color === '#000000' || color === '#000' ? '' : ` fill="${color}"`

  const fillOpacity = opacity === 1 ? '' : ` fill-opacity="${opacity}"`

  const fontF = fontFamily ? ` font-family="${fontFamily}"` : ''

  // 旋转除2参考：https://www.zhangxinxu.com/wordpress/2015/10/understand-svg-transform/
  const transformAttr =
    rotate && size
      ? ` transform="rotate(${rotate}, ${width / 2} ,${height / 2})"`
      : ''

  return `<svg${size} xmlns="http://www.w3.org/2000/svg"><text x="${x}%" y="${y}%" font-size="${fontSize}"${fill}${fillOpacity}${fontF}${transformAttr} text-anchor="middle" dominant-baseline="middle">${content}</text></svg>`
}

/**
 * 安全转义svg字符串
 *
 * @export
 * @param {String} svg svg字符串
 * @return {String} 转移后的svg字符串
 */
export function escapeSvg(svg) {
  return svg
    .trim()
    .trim()
    .replace(/\n/g, '')
    .replace(/"/g, "'")
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/{/g, '%7B')
    .replace(/}/g, '%7D')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')
}

/**
 * 生成内联svg
 *
 * @export
 * @param {String} svg 未转义的svg字符串
 * @return {String} 转义后的内联svg字符串
 * 参考：
 * https://www.zhangxinxu.com/wordpress/2020/10/text-as-css-background-image/
 * https://www.zhangxinxu.com/wordpress/2015/10/understand-svg-transform/
 * https://www.zhangxinxu.com/wordpress/2018/08/css-svg-background-image-base64-encode/
 */
export function makeSvgInline(svg) {
  return `data:image/svg+xml;utf8,${escapeSvg(svg)}`
}

/**
 * 生成水印svg(包含默认属性)
 *
 * @export
 * @param {Object} params
 * @return {String} 转义后的内联svg字符串
 */
export function watermarkSvg(params = {}) {
  return makeSvgInline(
    genSvgText({
      rotate: -45,
      width: 200,
      height: 200,
      opacity: 0.5,
      content: '水印',
      ...params
    })
  )
}

/**
 * 加载css
 *
 * @export
 * @param {String} href css地址
 * @param {Object} [options={ rel: 'stylesheet' }] 额外options
 * @return {Promise}  promise实例
 */
export function loadCss(href, options = { rel: 'stylesheet' }) {
  return new Promise((resolve, reject) => {
    if (typeof href !== 'string') return reject('must specify href(string)')

    let link = document.createElement('link')
    link.href = href

    const op = Object.assign({}, { rel: 'stylesheet' }, options)
    !isEmpty(op) &&
      Object.entries(op).forEach(([key, val]) => (link[key] = val))

    document.head.appendChild(link)

    link.onload = () => {
      link = null
      resolve()
    }

    link.onerror = () => {
      document.head.removeChild(link)

      link = null
      reject(new Error(`load css failed:${href}`))
    }
  })
}

/**
 * 加载js
 *
 * @export
 * @param {String} src script地址
 * @param {Object} [options={ type: 'text/javascript' }] 额外options
 * @return {Promise}  promise实例
 */
export function loadJs(src, options = { type: 'text/javascript' }) {
  return new Promise((resolve, reject) => {
    if (typeof src !== 'string') return reject('must specify src(string)')

    let script = document.createElement('script')
    script.src = src

    const op = Object.assign({}, { type: 'text/javascript' }, options)
    !isEmpty(op) &&
      Object.entries(op).forEach(([key, val]) => (script[key] = val))

    document.body.appendChild(script)

    script.onload = () => {
      script = null
      resolve()
    }

    script.onerror = () => {
      document.body.removeChild(script)
      script = null

      reject(new Error(`load js failed:${src}`))
    }
  })
}
