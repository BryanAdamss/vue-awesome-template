/* eslint-disable */
;(function flexible(window, document) {
  var docEl = document.documentElement

  // set 1rem = viewWidth / 10
  function setRemUnit() {
    var rem = docEl.clientWidth / 10
    // * 最小32px
    rem = Math.max(32, rem)
    // * 最大54px
    rem = Math.min(54, rem)
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function(e) {
    if (
      e.persisted ||
      (window.performance && window.performance.navigation.type === 2)
    ) {
      setRemUnit()
    }
  })
})(window, document)
