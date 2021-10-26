/**
 * @author GuangHui
 * @description 全局loading
 */


/**
 * 全局loading
 * 请求在400ms内返回，则不展示loading
 * 两次loading间隔<1000ms,则合并展示loading
 * @class GlobalLoading
 */
export class GlobalLoading {
  constructor({
    showEventName = 'global-loading-show', // loading show时派发的事件名
    hideEventName = 'global-loading-hide', // loading hide时派发的事件名
    minReqTime = 400, // loading展示所需要的最少请求时间，请求时间超过400ms才会展示loading
    maxCombinTime = 200, // 两次独立loading合并的最大间隔时间
    debug = false, // 调试模式
    eventBus // 用于内外部通信的事件总线
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

    this.count = 0 // 请求计数

    this.eventBus = eventBus

    if(!this.eventBus) console.log('eventBus未传入，GlobalLoading内部事件无法通知到外部!')
    
  }

  start() {
    // 记录首个请求发送时间
    if (!this.startTime) this.startTime = this._getNow()

    // loading关闭的maxCombinTime时间内又有新请求发送
    // 则清除hideTimer，以此来合并loading展示
    if (this.hideTimer) this._cleanHideTimer()

    this.count++

    this.debug && console.log('start count', this.count)

    // 延迟minReqTime时间展示loading
    // 以此来屏蔽响应时间小于minReqTime的请求loading展示
    if (!this.showTimer) {
      this.showTimer = setTimeout(() => {
        this.debug && console.log('show')
        this._show()
      }, this.minReqTime)
    }
  }

  end() {
    // 记录每个请求的结束时间点
    this.endTime = this._getNow()

    this.count--

    this.debug && console.log('end count', this.count)

    // 所有请求均已完成
    if (this.count <= 0) {
      this.count = 0

      this.debug && console.log('持续时间', this.endTime - this.startTime)

      // 时间小于minReqTime，取消showTimer中的loading展示
      if (this.endTime - this.startTime < this.minReqTime) {
        this.debug && console.log(`< ${this.minReqTime}ms，取消loading的展示`)

        this._cleanShowTimer()
      } else {
        // 大于minReqTime，则showTimer中的loading会展示
        // 为了合并两个独立请求，延迟maxCombinTime关闭弹窗
        // maxCombinTime内，若有新的请求到达，则合并展示loading
        this.debug &&
          console.log(
            `> ${this.minReqTime}ms，延迟${this.maxCombinTime}ms关闭弹窗`
          )

        if (!this.hideTimer) {
          this.hideTimer = setTimeout(() => {
            this.debug && console.log('close')

            this.hide()
          }, this.maxCombinTime)
        }
      }
    }
  }

  hide() {
    this.count = 0
    this._hide()
    this._clean()
  }

  _show() {
    this.eventBus && this.eventBus.$emit(this.showEventName)
  }

  _hide() {
    this.eventBus && this.eventBus.$emit(this.hideEventName)
  }

  _getNow() {
    return new Date().getTime()
  }

  _clean() {
    this._cleanShowTimer()
    this._cleanHideTimer()

    this._cleanStartAndEnd()
  }

  _cleanShowTimer() {
    clearTimeout(this.showTimer)
    this.showTimer = null
  }

  _cleanHideTimer() {
    clearTimeout(this.hideTimer)
    this.hideTimer = null
  }

  _cleanStartAndEnd() {
    this.startTime = null
    this.endTime = null
  }
}


