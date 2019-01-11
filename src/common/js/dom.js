// dom.js用来保存通用的dom操作函数
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function removeClass(el, className) {
  if (!hasClass(el, className)) {
    return
  }
  let newClassList = el.className.split(' ')
  newClassList.splice(newClassList.indexOf(className), 1)
  el.className = newClassList.join(' ')
}

export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

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
let elementStyle = document.createElement('div').style
// 利用IIFE得到支持的前缀
let vendor = (() => {
  // 利用transform做能力检测，来判断支持哪种前缀
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    // 支持某种前缀则直接返回
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  // 如果没有匹配，则返回false
  return false
})()

// 添加前缀
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

// 获取元素尺寸
export function getRect(el) {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect()
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
