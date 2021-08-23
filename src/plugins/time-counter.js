/**
 * @author GuangHui
 * @description 计数器
 */

export class TimeCounter {
  constructor({ startTime, endTime, interval, onEnd, onTick } = {}) {
    this.startTime =
      startTime == null || typeof startTime !== 'number' || startTime < 0
        ? 0
        : startTime // 开始时间(ms,timestamp)必须>=0

    this.endTime =
      endTime == null || typeof endTime !== 'number' || endTime < 0
        ? Math.pow(2, 53) - 1
        : endTime // 结束时间(ms,timestamp)必须>=0

    this.interval =
      interval == null || typeof interval !== 'number' || interval < 1
        ? 1000
        : interval // 间隔时间(ms)必须>=1

    this.timer = null

    this.curTime = this.startTime // 当前累积的时间

    this.lastTime = 0 // 上一次计数触发的时间

    this.offset = 0 // 每次计时的偏移值，用以修正计时间隔

    this.isCountDown = this.startTime - this.endTime > 0 // 是否为倒计时

    if (onEnd) this.onEnd = onEnd

    if (onTick) this.onTick = onTick
  }

  /**
   * 开始
   */
  start() {
    this.onTick && this.onTick(this.curTime)
    this.lastTime = new Date().getTime()

    this._startCount()
  }

  /**
   * 启动计时
   */
  _startCount() {
    this.timer = setInterval(() => {
      const now = new Date().getTime()
      const costTime = now - this.lastTime

      this.offset = this.interval - costTime

      this.lastTime = now

      if (this.isCountDown) {
        this.curTime -= costTime

        if (this.curTime <= this.endTime) {
          this.curTime = this.endTime

          this.end()

          return
        }
      } else {
        this.curTime += costTime

        if (this.curTime >= this.endTime) {
          this.curTime = this.endTime

          this.end()

          return
        }
      }

      // 调用tick回调
      this.onTick && this.onTick(this.curTime)
    }, this.interval + this.offset) // 修正计时间隔
  }

  /**
   * 销毁(内部方法)
   */
  _destory() {
    clearInterval(this.timer)
    this.timer = null
  }

  /**
   * 结束
   */
  end() {
    this._destory()
    // 派发结束事件
    this.onEnd && this.onEnd(this.curTime)
  }

  /**
   * 暂停
   */
  pause() {
    if (!this.timer) return

    this._destory()
  }

  /**
   * 继续
   */
  resume() {
    if (this.timer) return

    this.start()
  }

  /**
   * 销毁
   */
  destory() {
    if (!this.timer) return

    this._destory()
  }
}

 
