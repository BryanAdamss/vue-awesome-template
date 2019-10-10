/**
 * @author GuangHui
 * @description 自增高指令
 */

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
        const bw = parseInt(getComputedStyle(el).borderWidth)

        if (isNaN(bw)) {
          clearTimeout(timer)
          timer = null
          return
        }

        borderWidth = bw

        clearTimeout(timer)
        timer = null
      }, 20)

      function onInputHandler() {
        // 延迟20ms，以解决在ff中有字符长度限制截取的情况下，快到达截取临界值时
        // el.value值先改变了，输入框的高度随之变化，然后截取才生效，导致高度错误
        // 通过延迟20ms，让截取先生效，再改变高度
        setTimeout(() => {
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
        }, 20)
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
