// utils.js用来定义通用的js操作函数
/**
 * 用来获取一个区间的随机整数
 * @param min
 * @param max
 * @returns {number}
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * 随机打乱一个数组
 * @param arr
 * @returns {Array}
 */
export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

/**
 * 去抖函数
 * (underscore 1.8.2实现)
 * http://www.css88.com/doc/underscore/docs/underscore.html
 * 连续触发某一事件时，只在最后一次事件触发时的wait时间后才真正执行处理函数
 * 场景：搜索建议（停止输入后再触发请求）
 * @param   {Function}  func  需要延迟的函数
 * @param   {Number}    wait  延迟时间
 * @param   {Boolean}   immediate 是否需要在第一次触发时立即执行func
 * @returns {Function}
 */
export function debounce(func, wait, immediate) {
  var timeout, args, context, timestamp, result

  var later = function() {
    var last = new Date().getTime() - timestamp

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function() {
    context = this
    args = arguments
    timestamp = new Date().getTime()
    var callNow = immediate && !timeout
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * 节流函数
 * (underscore 1.8.2实现)
 * http://www.css88.com/doc/underscore/docs/underscore.html
 * 连续触发某一事件时，会自动间隔wait时间去执行一次处理函数
 * wait时间内重复触发的事件会被忽略
 * 节流会稀释函数的执行频率
 * 场景：resize、scroll时并不需要如此密集的事件触发频率
 * @param   {Function}  func
 * @param   {Number}    wait
 * @param   {Boolean}   options
 * @returns {Function}
 */
export function throttle(func, wait, options) {
  var context, args, result
  var timeout = null
  var previous = 0
  if (!options) options = {}
  var later = function() {
    previous = options.leading === false ? 0 : new Date().getTime()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }
  return function() {
    var now = new Date().getTime()
    if (!previous && options.leading === false) previous = now
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}

/**
 * 实现分时的函数，在intervalTime时间间隔内执行count次fn函数
 * @author cgh
 * @time   2017-03-06
 * @param  {Array}   	ary    			每次fn执行需要的参数数组
 * @param  {Function} 	fn    			处理函数
 * @param  {Number}   	count 			每个时间间隔内执行的次数
 * @param  {Number}   	intervalTime 	时间间隔
 * @return {Function}       			函数
 */
export function timeChunk(ary, fn, count, interval) {
  var obj,
    t,
    len = ary.length,
    intervalTime = interval || 200 // 默认时间间隔200ms
  var start = function() {
    for (var i = 0; i < Math.min(count || 1, len); i++) {
      obj = ary.shift()
      fn(obj)
    }
  }
  return function() {
    t = setInterval(function() {
      if (ary.length === 0) {
        return clearInterval(t)
      }
      start()
    }, intervalTime)
  }
}

/**
 * 将一个数组按size拆分成多个数组的块，然后把这些块组成新的数组
 * @author cgh
 * @time   2018-04-09
 * @param  {[type]}   array [description]
 * @param  {[type]}   size  [description]
 * @return {[type]}         [返回一个新数组]
 * @example
 *
 * chunk(['a', 'b', 'c', 'd'], 2);
 * // => [['a', 'b'], ['c', 'd']]
 *
 * chunk(['a', 'b', 'c', 'd'], 3);
 * // => [['a', 'b', 'c'], ['d']]
 */
export function chunk(array, size) {
  let length = array.length ? array.length : 0
  if (!length || !size) {
    return []
  }
  let index = 0
  let resIndex = 0
  let result = new Array(Math.ceil(length / size))

  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size))
  }
  return result
}

/**
 * dateFormat unix时间戳格式化
 */
export function dateFormat(timestamp, format = 'yyyy-MM-dd hh:mm:ss') {
  timestamp = timestamp.length === 13 ? timestamp : timestamp * 1000
  let date = new Date(timestamp)
  let args = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var i in args) {
    let n = args[i]
    if (new RegExp('(' + i + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? n : ('00' + n).substr(('' + n).length)
      )
    }
  }
  return format
}

/**
 * 判断是否为类数组
 * @param {*} collection
 */
export function isArrayLike(collection) {
  const MAX_ARRAY_INDEX = Math.pow(2, 53) - 1
  // 返回参数 collection 的 length 属性值
  let length = collection.length
  return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX
}

/**
 * 判断数组或对象是否为空
 * @param {*} obj
 */
export function isEmpty(obj) {
  if (obj == null) return true
  if (Array.isArray(obj)) return obj.length === 0
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    return Object.keys(obj).length === 0
  }
  return false
}

/**
 * 判断浏览器是否支持passive模式
 */
export const eventListenerPassiveSupported = () => {
  let supported = false

  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        supported = true
      }
    })

    window.addEventListener('test', null, opts)
    window.removeEventListener('test', null, opts)
  } catch (e) {}

  return supported
}
