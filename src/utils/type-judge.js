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
const isArrayFn = Array.isArray
  ? Array.isArray
  : val => Object.prototype.toString.call(val) === '[object Array]'
export function isArray(arr) {
  return isArrayFn(arr)
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
 * 检查 value 是否是原始有限数值
 * 会排除 Infinity, -Infinity, 以及 NaN 数值类型
 *
 * @export
 * @param {Any} val
 * @returns
 */
const isFiniteFn = Number.isFinite
  ? Number.isFinite
  : val => typeof val === 'number' && isFinite(val)
export function isFinite(val) {
  console.log(isFiniteFn)

  return isFiniteFn(val)
}

/**
 * 判断是否为函数
 * @param {Any} fn 需要判断的对象
 */
export function isFunction(fn) {
  return typeof fn === 'function'
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
