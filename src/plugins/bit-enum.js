/**
 * @author GuangHui
 * @description 二进制枚举 inspried by https://zhuanlan.zhihu.com/p/113709328
 */

export default class BitEnum {
  constructor({ keys = [] } = {}) {
    if (!Array.isArray(keys)) throw new Error('keys must be a array')
    if (keys.length > 30) throw new Error('keys length over 30') // 左移超过30,会超过阈值，因为总共32位，最高位表示符号，当前在最低位，所以最多只能左移30位

    this.enumMap = [...new Set(keys)].reduce((acc, cur, index) => {
      acc.set(cur, 1 << index)
      return acc
    }, new Map())
  }

  /**
   * key是否存在
   *
   * @param {Any} key 键
   * @returns 是否存在
   * @memberof BitEnum
   */
  has(key) {
    return this.enumMap.has(key)
  }

  /**
   * 获取key对应值
   *
   * @param {Any} key 键
   * @returns key对应的值
   * @memberof BitEnum
   */
  get(key) {
    if (!this.check([key])) throw new Error('key not exist')

    return this.enumMap.get(key)
  }

  /**
   * 所有key
   *
   * @returns key组成的数组
   * @memberof BitEnum
   */
  keys() {
    return Array.from(this.enumMap.keys())
  }

  /**
   * 检查多个key是否都存在
   *
   * @param {Array<Any>} [keys=[]] key数组
   * @returns 数组中的每个key是否都存在
   * @memberof BitEnum
   */
  check(keys = []) {
    for (let index = 0; index < keys.length; index++) {
      if (!this.has(keys[index])) return false
    }

    return true
  }

  /**
   * 所有枚举值
   *
   * @return {Array} 枚举值list
   * @memberof BitEnum
   */
  values() {
    return Array.from(this.enumMap.values())
  }

  /**
   * 所有所有成员
   *
   * @return {Array} 成员list
   * @memberof BitEnum
   */
  entries() {
    return Array.from(this.enumMap.entries())
  }

  /**
   * 混合多个key值，生成新枚举变量
   *
   * @param {Object} [{ key, mixedKeys = [] }={}] 参数对象，key新枚举变量名，mixedKeys需要混合的key名
   * @returns
   * @memberof BitEnum
   */
  mix({ key, mixedKeys = [] } = {}) {
    if (typeof key !== 'string') throw new Error('must provide key')
    if (!Array.isArray(mixedKeys) || mixedKeys.length === 0)
      throw new Error('mixedKeys must be a valued  array')

    if (!this.check(mixedKeys)) throw new Error('mixedKeys exist invalid key')
    if (this.keys().includes(key)) throw new Error('key already exist')

    const val =
      mixedKeys.length === 1
        ? this.get(mixedKeys[0])
        : mixedKeys.reduce((acc, cur) => acc | this.get(cur), /* 二进制0 */ 0b0)

    this.enumMap.set(key, val)

    return {
      key,
      val,
      getBit: () => val.toString(2),
      getMixedKeys: () => mixedKeys,
      some: (...keys) => {
        if (!this.check(keys)) throw new Error('exist invalid key')

        return keys.some(
          key => this.get(key) & val // &&优先级低于&
        )
      },
      every: (...keys) => {
        if (!this.check(keys)) throw new Error('exist invalid key')

        return keys.every(
          key => this.get(key) & val // &&优先级低于&
        )
      }
    }
  }
}
