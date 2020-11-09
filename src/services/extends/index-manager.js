/**
 * @author GuangHui
 * @description 层级管理(单例)
 */

export default class IndexManager {
  static MIN = Math.pow(2, -53)
  static MAX = Math.pow(2, 53)

  static ZERO=0
  static NEGATIVE = -1

  static isSafeNumber(n) {
    return typeof n === 'number' && !isNaN(n) && n < IndexManager.MAX && n > IndexManager.MIN
  }

  static getInstance(opts) {
    return this._instance || (this._instance = new IndexManager(opts))
  }

  constructor(opts) {
    if (IndexManager._instance) return IndexManager._instance

    this.init(opts)

    return (IndexManager._instance = this)
  }

  init({ inital = 1, step = 1 } = {}) {
    if (!IndexManager.isSafeNumber(inital)) throw new Error('not a safe inital index')

    if (!IndexManager.isSafeNumber(step) || step === IndexManager.ZERO) throw new Error('not a vaild step')

    this._index = Math.max(inital, IndexManager.MIN)
    this._oldIndex = this._index

    this.step = step
  }

  get index() {
    return this._index
  }

  set index(val) {
    if (!IndexManager.isSafeNumber(val)) throw new Error('not a vaild index')

    this._oldIndex = this._index
    this._index = Math.max(val, IndexManager.MIN)
  }

  add() {
    return (this.index += this.step)
  }

  subtract() {
    return (this.index = Math.max((this.index - this.step), IndexManager.MIN))
  }

  getOldIndex() {
    return this._oldIndex
  }
}
