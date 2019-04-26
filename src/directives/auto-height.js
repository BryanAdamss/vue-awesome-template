export default {
  name: 'auto-height', // 指定注册名称
  directive: {
    bind(el, binding, vnode) {
      // * auto-height必须应用在textarea上
      if (!(el instanceof HTMLTextAreaElement)) {
        console.warn('auto-height必须应用在textarea上')
        return
      }

      // * 防止产生y轴滚动条，产生宽度，导致一些问题，统一溢出隐藏
      el.style.overflow = 'hidden'

      let lastLength = 0
      let lastHeight = 0

      let borderWidth = 1
      let timer = setTimeout(() => {
        borderWidth = parseInt(getComputedStyle(el).borderWidth)
        clearTimeout(timer)
        timer = null
      }, 20)

      function onInputHandler() {
        const currentLength = el.value.length

        // * 判断字数如果比之前少了，说明内容正在减少，需要清除高度样式，重新获取
        if (currentLength < lastLength) {
          el.style.height = ''
        }

        // * 内容高度
        const currentHeight = el.scrollHeight

        // * 如果内容高度发生了变化，再去设置高度值
        if (lastHeight !== currentHeight || !el.style.height) {
          el.style.height = currentHeight + borderWidth * 2 + 'px'
        }

        lastLength = currentLength
        lastHeight = currentHeight
      }

      el.__vueAutoHeight__ = onInputHandler

      el.addEventListener('input', onInputHandler, false)
    },
    update() {},
    unbind(el, binding) {
      if (el.__vueAutoHeight__) {
        el.removeEventListener('input', el.__vueAutoHeight__)
        delete el.__vueAutoHeight__
      }
    }
  }
}
