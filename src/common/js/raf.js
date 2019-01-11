/**
 * @author ghchu
 * @description requestAnimationFrame
 */

const vendors = ['webkit', 'moz']
let r = window.requestAnimationFrame
let c = window.cancelAnimationFrame
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  // 统一前缀
  r = window[vendors[x] + 'RequestAnimationFrame']
  c =
    window[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
    window[vendors[x] + 'CancelRequestAnimationFrame']
}

export const raf = (function() {
  if (r) {
    return r
  } else {
    let lastTime = 0
    return function(callback, element) {
      var currTime = new Date().getTime()
      var timeToCall = Math.max(0, 16.7 - (currTime - lastTime))
      var id = window.setTimeout(function() {
        // eslint-disable-next-line
        callback(currTime + timeToCall)
      }, timeToCall)
      lastTime = currTime + timeToCall
      return id
    }
  }
})()

export const caf = (function() {
  if (c) {
    return c
  } else {
    return function(id) {
      clearTimeout(id)
    }
  }
})()
