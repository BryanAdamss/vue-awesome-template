/**
 * @author ghchu
 * @description fastclick绑定器
 */

export function fastclickBinder() {
  document.addEventListener(
    'DOMContentLoaded',
    function() {
      FastClick.attach(document.body)
    },
    false
  )
}
