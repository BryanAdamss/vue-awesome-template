/**
 * @author GuangHui
 * @description 常用类型判断
 */

/**
 * 判断是否为空（null、'',[],{},0）
 *
 * @export
 * @param {Any} obj 需要判断的对象
 * @returns {Boolean} 是否为空
 */
export function isEmpty(obj) {
  return (
    [Object, Array].includes((obj || {}).constructor) &&
    !Object.entries(obj || {}).length
  )
}

/**
 * 判断是否是数组
 * @param {Any} arr 需要判断的对象
 */
export function isArray(arr) {
  return Array.isArray
    ? Array.isArray(arr)
    : Object.prototype.toString.call(arr) === '[object Array]'
}

/**
 * 判断是否为函数
 * @param {Any} fn 需要判断的对象
 */
export function isFunction(fn) {
  return typeof fn === 'function'
}

/**
 * 判断是否为类数组
 * @param {Collection} collection
 */
export function isArrayLike(collection) {
  const MAX_ARRAY_INDEX = Math.pow(2, 53) - 1
  // 返回参数 collection 的 length 属性值
  let length = collection.length
  return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX
}

/**
 * 判断数组或对象是否为空
 * @param {Any} obj
 */
export function isEmptyArrOrObj(obj) {
  if (obj == null) return true
  if (Array.isArray(obj)) return obj.length === 0
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    return Object.keys(obj).length === 0
  }
  return false
}
