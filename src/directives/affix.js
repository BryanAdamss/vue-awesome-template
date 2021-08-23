/**
 * @author GuangHui
 * @description 图钉指令
 */

import { throttle } from 'Utils'
import { addStyle } from 'Utils/dom'

// eslint-disable-next-line
export default {
  bind(el, binding, vnode) {},
  inserted(el, binding, vnode) {},
  update() {},
  componentUpdated(el, binding) {
    const { value, oldValue } = binding
    // 屏蔽无效更新
    if (JSON.stringify(value) === JSON.stringify(oldValue)) return

    // 若没有传递container，则监听window的滚动事件，否则监听container滚动事件
    const isGlobal = !value || !value.container

    // 容器
    const $container = isGlobal
      ? window
      : document.querySelector(value.container)

    // 触发affixed的阈值
    const $threshold = value && value.threshold ? value.threshold : 0

    // 滚动事件触发频率
    const $interval = value && value.interval ? value.interval : 20

    // affixed的回调
    const onAffixed = value && value.onAffixed
    const onUnAffixed = value && value.onUnAffixed

    // 重设样式用
    const oldElStyle = el.style.cssText
    const oldElW = el.getBoundingClientRect().width

    let isAffixed = false // 是否affix
    let placeholder = null // 占位元素

    // 更新样式
    const updateStyle = () => {
      // affixed后的位置(可接收任意样式)，fixedElPos可以是一个工厂函数
      let fixedElPos = { top: 0 }
      if (value && value.fixedElPos) {
        fixedElPos =
          typeof value.fixedElPos === 'function'
            ? value.fixedElPos()
            : value.fixedElPos
      }

      // 为实际元素添加样式
      addStyle(el, {
        width: `${oldElW}px`, // fixed后，宽度会收缩，需要重设宽度
        position: 'fixed',
        zIndex: 99,
        ...fixedElPos
      })
    }

    // 创建占位元素
    const createPlaceholder = () => {
      // ! cloneNode会克隆元素上内联事件(<div onclick='xxx'>)
      // ! 例如，克隆了一个绑定了oninput的input,则克隆元素也会响应oninput事件
      // ! 但其不会克隆addEventListener及el.onclick=xxx绑定的事件
      placeholder = el.cloneNode(true)
      el.__affixPlaceholder__ = placeholder

      // 隐藏占位元素
      addStyle(placeholder, {
        opacity: 0,
        visibility: 'hidden',
        pointerEvents: 'none' // 阻止鼠标事件
      })

      el.parentNode.insertBefore(placeholder, el) // 在实际元素之前添加占位元素
    }

    // 清理(恢复非affix状态)
    const clean = () => {
      el.parentNode.removeChild(placeholder)

      placeholder = null
      el.__affixPlaceholder__ = null

      // 重设样式
      if (oldElStyle) {
        el.style.cssText = oldElStyle
      } else {
        el.removeAttribute('style')
      }

      el.classList && el.classList.remove('is-affixed')
    }

    // 滚动处理函数
    const scrollHandler = () => {
      const $top = isGlobal
        ? document.documentElement.scrollTop || document.body.scrollTop
        : $container.scrollTop

      // 超过阈值
      if ($top > $threshold) {
        if (!isAffixed) createPlaceholder() // 未affix则创建占位元素

        // 无论是否affix，只要超过阈值，都要更新样式，因为在affix状态下，用户也可能需要更改样式
        updateStyle()

        // 添加标识类
        el.classList && el.classList.add('is-affixed')

        isAffixed = true

        onAffixed && onAffixed(el)
      } else {
        if (placeholder) {
          clean()

          onUnAffixed && onUnAffixed(el)
        }

        isAffixed = false
      }
    }

    // 修复多次绑定问题
    if (el.__affixScrollHandler__) {
      $container.removeEventListener('scroll', el.__affixScrollHandler__, false)
      window.removeEventListener('resize', el.__affixScrollHandler__, false)
    }

    el.__affixScrollHandler__ = throttle(scrollHandler, $interval)
    el.__affixContainer__ = $container

    $container.addEventListener('scroll', el.__affixScrollHandler__, false)
    window.addEventListener('resize', el.__affixScrollHandler__, false)
  },
  unbind(el, binding) {
    if (!el.__affixScrollHandler__) return

    if (el.__affixPlaceholder__) {
      // ! 黑科技解决路由切换动画时提前移除DOM节点导致布局错乱的问题
      let timer = setTimeout(() => {
        el.__affixPlaceholder__.parentNode.removeChild(el.__affixPlaceholder__)

        el.__affixPlaceholder__ = null

        clearTimeout(timer)
        timer = null
      }, 300)
    }

    el.__affixContainer__.removeEventListener(
      'scroll',
      el.__affixScrollHandler__,
      false
    )

    window.removeEventListener('resize', el.__affixScrollHandler__, false)

    el.__affixContainer__ = null
    el.__affixScrollHandler__ = null
  }
}
