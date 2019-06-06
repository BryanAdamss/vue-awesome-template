/**
 * @author GuangHui
 * @description localStorage封装
 */

class Saver {
  constructor({
    globalNamespace = '__VUE_SAVER__',
    moduleName = 'Global',
    session = false
  } = {}) {
    // 添加全局命名空间前缀，最终key的组成模式为:namespace:key
    this.namespace = globalNamespace + moduleName

    // 对应实例已经存在，直接返回
    const saverName = session
      ? `Saver_Session_${this.namespace}`
      : `Saver_${this.namespace}`
    if (window[saverName]) return window[saverName]

    // 实例不存在，生成实例
    // 默认localStorage
    this.storage = session ? window.sessionStorage : window.localStorage

    // 则尝试收集模块之前存储的key
    const oldKeys = this._getOldKeys()
    this.keySet = oldKeys.length ? new Set(oldKeys) : new Set()

    window[saverName] = this
  }

  /**
   * 返回storage中当前模块的所有key
   */
  _getOldKeys() {
    let index = 0
    const temp = []
    const re = new RegExp(`(${this.namespace}):(.+)`)

    while (index < this.storage.length) {
      const name = this.storage.key(index)
      const ret = re.exec(name)

      if (ret && ret[2]) temp.push(ret[2])

      index++
    }

    return temp
  }

  /**
   * 设置(添加)数据项
   * @param {String} key key值
   * @param {Any} value 值
   */
  setItem(key, value) {
    if (!key || !this.storage) return

    !this.keySet.has(key) && this.keySet.add(key)

    this.storage.setItem(`${this.namespace}:${key}`, JSON.stringify(value))
  }

  /**
   * 根据key值获取数据项
   * @param {String} key key值
   */
  getItem(key) {
    if (!key || !this.storage || !this.keySet.has(key)) return

    return JSON.parse(this.storage.getItem(`${this.namespace}:${key}`))
  }

  /**
   * 根据key值移除数据项
   * @param {String} key key值
   */
  removeItem(key) {
    if (!key || !this.storage || !this.keySet.has(key)) return

    this.storage.removeItem(`${this.namespace}:${key}`)
  }

  /**
   * 清除namespace下的所有数据项
   */
  clear() {
    if (this.keySet.size === 0) return

    this.keySet.forEach(key => {
      this.removeItem(key)
    })
  }

  /**
   * 获取所有key值
   */
  getAllKeys() {
    return Array.from(this.keySet)
  }

  /**
   * 获取命名空间
   */
  getNamespace() {
    return this.namespace
  }
}

export default Saver
