/**
 * @author GuangHui
 * @description 拖拽指令
 */

export default {
  bind(el, binding, vnode, oldVnode) {},
  inserted(el, binding) {
    const willChange = getComputedStyle(el).willChange
    const position = getComputedStyle(el).position
    const transform = getComputedStyle(el).transform

    // * 添加动画属性
    if (['absolute', 'fixed'].indexOf(position) === -1) {
      el.style.position = 'absolute'
    }

    el.style.willChange =
      willChange === 'auto' ? 'left,top' : `${willChange},left,top`

    el.style.transform =
      transform === 'none' ? 'translateZ(0)' : `${transform} translateZ(0)`

    const addDocListener = document.addEventListener
    const removeDocListener = document.removeEventListener

    let disX = 0
    let disY = 0

    function touchstartHandler(e) {
      const point = e.changedTouches[0]
      const { pageX, pageY } = point
      const { offsetLeft, offsetTop } = el
      // * 记录首次点击手指距离拖拽元素左侧及顶部的距离
      disX = pageX - offsetLeft
      disY = pageY - offsetTop

      addDocListener('touchmove', touchmoveHandler, false)
      addDocListener('touchend', touchendHandler, false)
      addDocListener('touchcancel', touchcancelHandler, false)
    }
    function touchmoveHandler(e) {
      const point = e.changedTouches[0]
      const { pageX, pageY } = point
      // * 获取手指便宜距离
      let l = pageX - disX
      let t = pageY - disY

      el.style.left = `${l}px`
      el.style.top = `${t}px`
      typeof binding.value === 'function' &&
        binding.value({
          left: l,
          top: t
        })
    }
    function touchendHandler(e) {
      removeDocListener('touchmove', touchmoveHandler)
      removeDocListener('touchend', touchendHandler)
      removeDocListener('touchcancel', touchcancelHandler)
    }
    function touchcancelHandler(e) {
      removeDocListener('touchmove', touchmoveHandler)
      removeDocListener('touchend', touchendHandler)
      removeDocListener('touchcancel', touchcancelHandler)
    }

    el.__dragTouchstartHandler__ = touchstartHandler

    el.addEventListener('touchstart', touchstartHandler, false)
  },
  update() {},
  componentUpdated() {},
  unbind(el) {
    el.__dragTouchstartHandler__ &&
      el.removeEventListener('touchstart', el.__dragTouchstartHandler__)
  }
}
