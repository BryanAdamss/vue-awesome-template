/**
 * @author GuangHui
 * @description 全局loading
 */

import Bus from 'Plugins/event-bus'

/**
 * 全局loading
 * 请求在400ms内返回，则不展示loading
 * 两次loading间隔<1000ms,则合并展示loading
 * @class GlobalLoading
 */
class GlobalLoading {
  constructor({
    showEventName = 'global.loading.show', // loading show时派发的事件名
    hideEventName = 'global.loading.hide', // loading hide时派发的事件名
    minReqTime = 400, // loading展示所需要的最少请求时间，请求时间超过400ms才会展示loading
    maxCombinTime = 1000, // 两次独立loading合并的最大间隔时间
    debug = false // 调试模式
  } = {}) {
    this.showEventName = showEventName
    this.hideEventName = hideEventName
    this.minReqTime = minReqTime
    this.maxCombinTime = maxCombinTime
    this.debug = debug

    this.showTimer = null
    this.hideTimer = null

    this.startTime = null
    this.endTime = null

    this.count = 0
  }

  start() {
    this.startTime = this._getNow()

    if (this.hideTimer) {
      clearTimeout(this.hideTimer)
      this.hideTimer = null
    }

    this.count++

    this.debug && console.log('start count', this.count)

    if (!this.showTimer) {
      this.showTimer = setTimeout(() => {
        this.debug && console.log('show')
        this._show()
      }, this.minReqTime)
    }
  }

  end() {
    this.endTime = this._getNow()

    this.count--

    this.debug && console.log('end count', this.count)

    // 所有请求均已完成
    if (this.count <= 0) {
      this.count = 0

      this.debug && console.log('持续时间', this.endTime - this.startTime)

      // 时间<400ms取消loading的展示
      if (this.endTime - this.startTime < this.minReqTime) {
        this.debug && console.log(`< ${this.minReqTime}ms，取消loading的展示`)

        clearTimeout(this.showTimer)
        this.showTimer = null
      } else {
        // >400ms，则展示loading，并延迟1s关闭弹窗
        // 1s内，若有新的请求到达，则合并展示loading
        this.debug &&
          console.log(
            `> ${this.minReqTime}ms，延迟${this.maxCombinTime}ms关闭弹窗`
          )

        this.hideTimer = setTimeout(() => {
          this.debug && console.log('close')

          this._hide()
          this._clean()
        }, this.maxCombinTime)
      }
    }
  }

  hide() {
    this.count = Math.max(--this.count, 0)

    this._hide()
    this._clean()
  }

  _show() {
    Bus.$emit(this.showEventName)
  }

  _hide() {
    Bus.$emit(this.hideEventName)
  }

  _getNow() {
    return new Date().getTime()
  }

  _clean() {
    clearTimeout(this.showTimer)
    clearTimeout(this.hideTimer)

    this.showTimer = null
    this.hideTimer = null
    this.startTime = null
    this.endTime = null
  }
}

export default GlobalLoading
