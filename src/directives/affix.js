/**
 * @author GuangHui
 * @description 图钉指令
 */

import { throttle } from 'Utils'
import { addStyle } from 'Utils/dom'

export default {
  name: 'affix',
  directive: {
    bind(el, binding, vnode) {},
    inserted(el, binding, vnode) {
      // * 若有传递container，则监听container，否则监听window的滚动事件
      const $container =
        binding.value && binding.value.container
          ? document.querySelector(binding.value.container)
          : window

      // * 触发affixed的阈值
      const $threshold =
        binding.value && binding.value.threshold ? binding.value.threshold : 0

      // * 滚动事件触发频率
      const $interval =
        binding.value && binding.value.interval ? binding.value.interval : 20

      // * affixed后的位置(可接收任意样式)
      const fixedElPos =
        binding.value && binding.value.fixedElPos
          ? binding.value.fixedElPos
          : {
            top: 0
          }

      // * affixed的回调
      const onAffixed = binding.value && binding.value.onAffixed

      const oldElStyle = el.style.cssText
      const oldElW = el.getBoundingClientRect().width

      let affixed = false
      let affixedEl = null

      const _scrollHandler = throttle(e => {
        if ($container.scrollTop > $threshold) {
          if (affixed) return

          // 克隆元素
          affixedEl = el.cloneNode(true)

          // 隐藏原本元素
          addStyle(el, { opacity: 0, visibility: 'hidden' })

          // 为克隆元素添加样式并追加到body中
          addStyle(affixedEl, {
            width: `${oldElW}px`, // fixed后，宽度会收缩，需要重设宽度
            position: 'fixed',
            zIndex: 99,
            ...fixedElPos
          })
          document.body.appendChild(affixedEl)
          affixed = true

          onAffixed(affixedEl)
        } else {
          if (affixedEl) {
            document.body.removeChild(affixedEl)
            affixedEl = null

            el.style.cssText = oldElStyle
          }

          affixed = false
        }
      }, $interval)

      el.__vueAffix__ = _scrollHandler

      $container.addEventListener('scroll', el.__vueAffix__, false)
      window.addEventListener('resize', el.__vueAffix__, false)
    },
    update() {},
    unbind(el, binding) {
      if (el.__vueAffix__) {
        el.removeEventListener('click', el.__vueAffix__, false)
        window.removeEventListener('resize', el.__vueAffix__, false)
        el.__vueAffix__ = null
      }
    }
  }
}
