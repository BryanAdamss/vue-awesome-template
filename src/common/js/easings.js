/**
 * @author ghchu
 * @description 常用缓动算法函数
 */

/**
 *
 * 匀速
 * @export
 * @param {Number} t 当前时间
 * @param {Number} b 开始值
 * @param {Number} c 变化值(结束值-开始值)
 * @param {Number} d 结束时间
 * @returns {Number} 当前时间对应的值
 */
export function Linear(t, b, c, d) {
  return (c * t) / d + b
}

/**
 *
 * 先慢后快
 * @export
 * @param {Number} t 当前时间
 * @param {Number} b 开始值
 * @param {Number} c 变化值(结束值-开始值)
 * @param {Number} d 结束时间
 * @returns {Number} 当前时间对应的值
 */
export function easeIn(t, b, c, d) {
  return c * (t /= d) * t + b
}

/**
 *
 * 先快后慢
 * @export
 * @param {Number} t 当前时间
 * @param {Number} b 开始值
 * @param {Number} c 变化值(结束值-开始值)
 * @param {Number} d 结束时间
 * @returns {Number} 当前时间对应的值
 */
export function easeOut(t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b
}

/**
 *
 * 先慢再匀速再慢
 * @export
 * @param {Number} t 当前时间
 * @param {Number} b 开始值
 * @param {Number} c 变化值(结束值-开始值)
 * @param {Number} d 结束时间
 * @returns {Number} 当前时间对应的值
 */
export function easeInOut(t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t + b
  return (-c / 2) * (--t * (t - 2) - 1) + b
}
