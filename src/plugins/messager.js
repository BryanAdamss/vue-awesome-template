/**
 * @author GuangHui
 * @description postMessage封装
 */

export class Messager {
  constructor({ targetWin = null, targetOrigin = '*' } = {}) {
    this._INFOS = {
      targetOriginIsEverything:
        '如果你明确的知道消息应该发送到哪个窗口，那么请始终提供一个有确切值的targetOrigin，而不是*。不提供确切的目标将导致数据泄露到任何对数据感兴趣的恶意站点',
      noMsg: '请注意，传递的消息为空',
      noWin: 'targetWin不合法',
      cbIllegal: 'type或回调函数不合法'
    }

    if (targetOrigin === '*') {
      console.warn(this._INFOS.targetOriginIsEverything)
    }

    this.actions = {}
    this.targetOrigin = targetOrigin

    this.setTargetWin(targetWin)

    window.addEventListener('message', this._reciveMessage.bind(this), false)
  }

  /**
   * 订阅事件
   * @param {String} type 事件
   * @param {Function} cb 回调函数
   */
  on(type, cb) {
    if (!type || !cb || typeof cb !== 'function') {
      throw new Error(this._INFOS.cbIllegal)
    }

    if (!this.actions[type]) this.actions[type] = []

    this.actions[type].push(cb)
  }

  /**
   * 发送消息
   * @param {String} type 类型
   * @param {Any} msg 消息
   */
  send(type, msg) {
    if (!this.targetWin) console.log(this._INFOS.noWin)
    if (!msg) console.log(this._INFOS.noMsg)

    this.targetWin.postMessage(
      {
        type,
        msg
      },
      this.targetOrigin
    )
  }

  /**
   * 移除message监听
   */
  destroy() {
    window.removeEventListener('message', this._reciveMessage.bind(this), false)
  }

  /**
   * 设置目标窗口上下文
   * @param {Object} win 目标窗口上下文
   */
  setTargetWin(win) {
    if (win) this.targetWin = win
  }

  /**
   * 消息处理器
   * @param {Object} e MessageEvent
   */
  _reciveMessage(e) {
    const origin = e.origin || e.originalEvent.origin // chrome中origin可能会存在于originalEvent
    if (origin !== this.targetOrigin) return
    const { data, source } = e
    if (!this.actions[data.type]) return

    // 若初始化时，未指明targetWin(常出现在接收消息的页面)
    // 则在接收到消息时，自动设置targetWin为消息发送窗口的window
    source && this.setTargetWin(source)

    const { type, msg } = data

    this._fire(type, msg, source)
  }

  /**
   * 触发回调
   * @param {String} type 事件类型
   * @param {Any} message 消息
   * @param  {Object} source 消息发送窗口的上下文
   */
  _fire(type, message, source) {
    const cbs = this.actions[type]

    if (!cbs || !cbs.length) return

    cbs.forEach(que => que.call(this, message, source))
  }
}
