/**
 * @author GuangHui
 * @description 点击区域外指令
 */

export default {
  bind(el, binding, vnode) {
    function documentHandler(e) {
      const _target = e.target
      // * 点击自身及内部元素不做处理
      if (el.contains(_target)) return false
      // * 执行指令对应的表达式
      if (binding.expression) binding.value(e)
    }
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  update() {},
  unbind(el, binding) {
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}
