/**
 * @author GuangHui
 * @description 回到顶部指令
 */

export default {
  bind(el, binding, vnode) {},
  inserted(el, binding, vnode) {
    // * 若有传递target，则滚动target，否则滚动window
    let $target = null
    if (binding.value && binding.value.target) {
      const { target } = binding.value
      $target = document.querySelector(target)
    }

    el.addEventListener('click', scrollToTop, false)

    function scrollToTop() {
      let top = $target
        ? $target.scrollTop
        : document.documentElement.scrollTop || document.body.scrollTop

      if (top > 0) {
        window.requestAnimationFrame(scrollToTop)
        let posY = top - top / 8
        $target ? $target.scrollTo(0, posY) : window.scrollTo(0, posY)
      }
    }

    el.__vueGoToTop__ = scrollToTop
  },
  update() {},
  unbind(el, binding) {
    if (el.__vueGoToTop__) {
      el.removeEventListener('click', el.__vueGoToTop__, false)
      el.__vueGoToTop__ = null
    }
  }
}
