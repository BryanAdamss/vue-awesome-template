/**
 * @author GuangHui
 * @description 消息中心（发布订阅）
 */

/* 文档参阅：https://www.npmjs.com/package/eventemitter3 */
import EventEmitter from 'eventemitter3'

import type { App } from 'vue'

/**
 * 消息中心（继承自EventEmitter3）
 * 支持vue plugin使用、支持单例
 *
 * @date 2022-07-26 15:24:20
 * @export
 * @class MessageCenter
 * @extends {EventEmitter}
 */
export class MessageCenter extends EventEmitter {
  static _instance: MessageCenter | undefined

  constructor({ singleton = false } = {}) {
    if (singleton && MessageCenter._instance)
      return MessageCenter._instance

    super()

    return (MessageCenter._instance = this)
  }

  /* 暴露install方法供vue注册plugin调用 */
  install(
    app: App,
    { injectKey = 'mc' }: { injectKey?: Symbol | string } = {},
  ) {
    const name = typeof injectKey === 'symbol'
      ? injectKey.description
      : injectKey

    /* this.$mc仅在非setup中生效 */
    app.config.globalProperties[`$${name}`] = this

    /* provide/inject方式，可在setup中生效 */
    app.provide(injectKey, this)
  }
}

