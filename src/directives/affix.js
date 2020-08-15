/**
 * @author GuangHui
 * @description 图钉指令
 */

import { throttle } from 'Utils'
import { addStyle } from 'Utils/dom'

export default {
  update() {},
  componentUpdated(el, binding) {
    // 屏蔽无效更新
    if (JSON.stringify(binding.value) === JSON.stringify(binding.oldValue)) {
      return
    }

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
    const onUnAffixed = binding.value && binding.value.onUnAffixed

    // 重设样式用
    const oldElStyle = el.style.cssText
    const oldElW = el.getBoundingClientRect().width

    let isAffixed = false
    let fakeEl = null // 占位元素

    const _scrollHandler = throttle(() => {
      const $top = isGlobal
        ? document.documentElement.scrollTop || document.body.scrollTop
        : $container.scrollTop

      if ($top > $threshold) {
        if (isAffixed) return

        // 创建占位元素
        // ! cloneNode会克隆元素上内联事件(<div onclick='xxx'>)
        // ! 例如，克隆了一个绑定了oninput的input,则克隆元素也会响应oninput事件
        // ! 但其不会克隆addEventListener及el.onclick=xxx绑定的事件
        fakeEl = el.cloneNode(true)
        el.__vueAffixFakeEl__ = fakeEl

        // 隐藏占位元素
        addStyle(fakeEl, {
          opacity: 0,
          visibility: 'hidden',
          pointerEvents: 'none' // 阻止鼠标事件
        })

        el.parentNode.insertBefore(fakeEl, el) // 在实际元素之前添加占位元素

        // 为实际元素添加样式
        addStyle(el, {
          width: `${oldElW}px`, // fixed后，宽度会收缩，需要重设宽度
          position: 'fixed',
          zIndex: 99,
          ...fixedElPos
        })

        // 添加标识类
        el.classList && el.classList.add('is-affixed')

        isAffixed = true

        onAffixed && onAffixed(el)
      } else {
        if (fakeEl) {
          el.parentNode.removeChild(fakeEl)

          fakeEl = null
          el.__vueAffixFakeEl__ = null

          // 重设样式
          if (oldElStyle) {
            el.style.cssText = oldElStyle
          } else {
            el.removeAttribute('style')
          }

          el.classList && el.classList.remove('is-affixed')

          onUnAffixed && onUnAffixed(el)
        }

        isAffixed = false
      }
    }, $interval)

    el.__vueAffixScrollHandler__ = _scrollHandler
    el.__vueAffixContainer__ = $container

    $container.addEventListener('scroll', el.__vueAffixScrollHandler__, false)
    window.addEventListener('resize', el.__vueAffixScrollHandler__, false)
  },
  unbind(el) {
    // * clean
    if (el.__vueAffixScrollHandler__) {
      if (el.__vueAffixFakeEl__) {
        el.__vueAffixFakeEl__.parentNode.removeChild(el.__vueAffixFakeEl__)

        el.__vueAffixFakeEl__ = null
      }

      el.__vueAffixContainer__.removeEventListener(
        'scroll',
        el.__vueAffixScrollHandler__,
        false
      )

      window.removeEventListener('resize', el.__vueAffixScrollHandler__, false)

      el.__vueAffixContainer__ = null
      el.__vueAffixScrollHandler__ = null
    }
  }
}
