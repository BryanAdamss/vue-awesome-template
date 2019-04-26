/**
 * @author ghchu
 * @description localStorage封装
 */

import { GLOBAL_NAME_SPACE } from 'Config'

class Saver {
  constructor({ name }) {
    this.namespace =
      name && typeof name === 'string'
        ? GLOBAL_NAME_SPACE + name // 添加全局命名空间前缀，最终key的组成模式为:namespace:key
        : GLOBAL_NAME_SPACE

    this.keySet = new Set()
  }

  /**
   * 设置(添加)数据项
   * @param {String} key key值
   * @param {Any} value 值
   */
  setItem(key, value) {
    if (!key || !localStorage) return

    !this.keySet.has(key) && this.keySet.add(key)

    localStorage.setItem(`${this.namespace}:${key}`, JSON.stringify(value))
  }

  /**
   * 根据key值获取数据项
   * @param {String} key key值
   */
  getItem(key) {
    if (!key || !localStorage || !this.keySet.has(key)) return

    return JSON.parse(localStorage.getItem(`${this.namespace}:${key}`))
  }

  /**
   * 根据key值移除数据项
   * @param {String} key key值
   */
  removeItem(key) {
    if (!key || !localStorage || !this.keySet.has(key)) return

    localStorage.removeItem(`${this.namespace}:${key}`)
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
