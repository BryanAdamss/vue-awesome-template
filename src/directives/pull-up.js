/**
 * @author GuangHui
 * @description 上拉指令
 */

import Vue from 'vue'

import { eventListenerPassiveSupported, throttle } from 'Utils'

import BaseLoadingSpinner from 'Base/BaseLoadingSpinner'

const ExtendLoading = Vue.extend({
  render(h) {
    return h(
      'div',
      {
        style: {
          textAlign: 'center',
          fontSize: '20px'
        }
      },
      [h(BaseLoadingSpinner)]
    )
  }
})
const MyLoading = new ExtendLoading().$mount()

export default {
  bind(el, binding, vnode, oldVnode) {
    let lastScrollTop = 0
    let isInPullup = false

    const pullupEnd = () => {
      el.removeChild(MyLoading.$el)
      isInPullup = false
    }

    const pullUpScrollHandler = e => {
      const scrollTop = el.scrollTop
      const scrollH = el.scrollHeight
      const clientH = el.clientHeight

      if (isInPullup || scrollTop < lastScrollTop) {
        return
      }

      if (scrollTop + clientH === scrollH) {
        isInPullup = true
        lastScrollTop = scrollTop

        el.appendChild(MyLoading.$el)

        binding.value(pullupEnd)
      }
    }

    el.__pull_up_scroll_handler__ = throttle(pullUpScrollHandler, 300)

    el.addEventListener(
      'scroll',
      el.__pull_up_scroll_handler__,
      eventListenerPassiveSupported ? { passive: true } : false
    )
  },
  inserted(el, binding) {},
  update() {},
  componentUpdated() {},
  unbind(el) {
    el.removeEventListener('scroll', el.__pull_up_scroll_handler__)
  }
}
