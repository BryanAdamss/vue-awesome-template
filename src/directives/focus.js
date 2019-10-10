/**
 * @author GuangHui
 * @description 聚焦指令
 */
export default {
  name: 'focus', // 指定注册名称
  directive: {
    bind(el, binding, vnode) {},
    inserted(el) {
      el.focus()
    },
    update() {},
    unbind(el, binding) {}
  }
}
