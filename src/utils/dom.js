/**
 * @author GuangHui
 * @description dom 操作相关
 */

import { str2kebab } from 'Utils'

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
  const id = 'test-support-css-var'
  const styleEl = document.createElement('style')
  styleEl.innerText = styleEl.innerText = `:root{--${id}:-9999;}#${id}{position:absolute;top:-99999em;left:-99999em;z-index:var(--${id});opacity:0;font-size:0;width:0;height:0;pointer-events: none;}`

  document.head.appendChild(styleEl)

  const testSpan = document.createElement('span')
  testSpan.id = id

  document.body.appendChild(testSpan)

  const styleObj = getStyle(testSpan)

  const isSupport = !!styleObj && styleObj.zIndex === '-9999'

  document.head.removeChild(styleEl)
  document.body.removeChild(testSpan)

  return isSupport
}

/**
 * 查看当前元素是否命中某一css选择器字符串
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Element/matches
 * https://blog.csdn.net/king_xing/article/details/50460580
 * 使用时:el[matchesSelector]('css选择器字符串')
 *
 * @export
 */
export function matchesSelector() {
  let matchesSelector;
  ['webkitM', 'mozM', 'm', 'msM', 'o'].some(function (prefix) {
    let name = prefix + 'atches'
    if (name in document.documentElement) {
      matchesSelector = name
    }
    name += 'Selector'
    if (name in document.documentElement) {
      matchesSelector = name
    }
    return matchesSelector // If found, then truthy, and [].some() ends.
  })

  return matchesSelector
}
