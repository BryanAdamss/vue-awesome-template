/**
 * @author GuangHui
 * @description 页面离开提示 mixins
 */

export const mixinsName = 'LEAVE_TIPS_MIXINS'
export const getName = name => `${mixinsName}_${String(name)}`

// eslint-disable-next-line no-restricted-syntax
export default {
  data() {
    return {
      [getName('tips')]: '系统可能不会保存您所做的更改'
    }
  },
  created() {
    this[getName('init')]()
  },
  activated() {
    this[getName('init')]()
  },
  beforeRouteLeave(to, from, next) {
    this[getName('handleBeforeRouteLeave')](to, from, next)
  },
  methods: {
    /**
     * 处理beforeRouteLeave
     *
     * @param {*} to
     * @param {*} from
     * @param {*} next
     */
    [getName('handleBeforeRouteLeave')](to, from, next) {
      if (this[getName('showTips')]()) {
        next()
      } else {
        next(false)
      }
    },
    /**
     * 展示默认tips
     *
     * @returns confrim返回值
     */
    [getName('showTips')]() {
      return window.confirm(this[getName('tips')])
    },
    /**
     * 初始化
     *
     */
    [getName('init')]() {
      /* eslint-disable-next-line */
      this[getName('handleBeforeUnloadBinded')] = this[
        getName('handleBeforeUnload')
      ].bind(this)

      this[getName('bindEvents')]()

      this.$once('hook:deactivated', this[getName('cleanEvents')])
      this.$once('hook:beforeDestroy', this[getName('cleanEvents')])
    },
    /**
     * 处理beforeunload事件
     *
     * @param {*} e 事件对象
     */
    [getName('handleBeforeUnload')](e) {
      // https://developer.mozilla.org/zh-CN/docs/Web/Events/beforeunload
      ;(e || window.event).returnValue = this[getName('tips')] // Gecko and Trident

      return this[getName('tips')] // Gecko and WebKit
    },
    /**
     * 绑定事件
     *
     */
    [getName('bindEvents')]() {
      window.addEventListener(
        'beforeunload',
        this[getName('handleBeforeUnloadBinded')],
        false
      )
    },
    /**
     * 清除事件
     *
     */
    [getName('cleanEvents')]() {
      window.removeEventListener(
        'beforeunload',
        this[getName('handleBeforeUnloadBinded')],
        false
      )
    }
  }
}
