/**
 * @author GuangHui
 * @description 聚焦指令
 */
// eslint-disable-next-line
export default {
  bind(el, binding, vnode) {},
  inserted(el) {
    el.focus()
  },
  update() {},
  unbind(el, binding) {}
}
