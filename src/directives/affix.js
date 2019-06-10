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
      // * 若没有传递container，则监听window的滚动事件，否则监听container滚动事件
      const isGlobal = !binding.value || !binding.value.container

      const $container = isGlobal
        ? window
        : document.querySelector(binding.value.container)

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
        const $top = isGlobal
          ? document.documentElement.scrollTop || document.body.scrollTop
          : $container.scrollTop

        console.log($container, $top)
        if ($top > $threshold) {
          if (affixed) return

          // 克隆元素
          affixedEl = el.cloneNode(true)
          el.__vueAffixAffixedEl__ = affixedEl

          // 隐藏原本元素
          addStyle(el, { opacity: 0, visibility: 'hidden' })

          // 为克隆元素添加样式并追加到body中
          addStyle(affixedEl, {
            width: `${oldElW}px`, // fixed后，宽度会收缩，需要重设宽度
            position: 'fixed',
            zIndex: 99,
            ...fixedElPos
          })
          el.parentNode.appendChild(affixedEl)
          affixed = true

          onAffixed(affixedEl)
        } else {
          if (affixedEl) {
            el.parentNode.removeChild(affixedEl)

            affixedEl = null
            el.__vueAffixAffixedEl__ = null

            el.style.cssText = oldElStyle
          }

          affixed = false
        }
      }, $interval)

      el.__vueAffixScrollHandler__ = _scrollHandler
      el.__vueAffixContainer__ = $container

      $container.addEventListener('scroll', el.__vueAffixScrollHandler__, false)
      window.addEventListener('resize', el.__vueAffixScrollHandler__, false)
    },
    update() {},
    unbind(el, binding) {
      // * clean
      if (el.__vueAffixScrollHandler__) {
        if (el.__vueAffixAffixedEl__) {
          el.__vueAffixAffixedEl__.parentNode.removeChild(
            el.__vueAffixAffixedEl__
          )

          el.__vueAffixAffixedEl__ = null
        }

        el.__vueAffixContainer__.removeEventListener(
          'scroll',
          el.__vueAffixScrollHandler__,
          false
        )

        window.removeEventListener(
          'resize',
          el.__vueAffixScrollHandler__,
          false
        )

        el.__vueAffixContainer__ = null
        el.__vueAffixScrollHandler__ = null
      }
    }
  }
}
