/**
 * @author GuangHui
 * @description 随机进度条
 */

import Vue from 'vue'

import {
  appendComp2Body,
  getInstanceByUid,
  removeCompFromBody
} from 'Plugins/portals'

export default class RandomProgress {
  constructor({ limit = 90, initial = 0, max = 100 } = {}) {
    this.limit = limit
    this.max = max

    this.isDone = false

    this.initial = initial

    // 创建响应式数据
    this.propsData = Vue.observable({
      progress: initial,
      max
    })

    window.propsData2 = this.propsData

    this.rafId = null
    this.compOptions = null
    this.instanceUid = null
  }

  /**
   * 开始
   *
   * @memberof RandomProgress
   */
  start() {
    if (this.instanceUid) {
      this._step()
    } else {
      this._getProgressDefinition()
        .then(this._initProgress.bind(this))
        .catch(console.log)
    }
  }

  /**
   * 暂停
   *
   * @memberof RandomProgress
   */
  pause() {
    this._caf()
  }

  /**
   * 完成动画
   *
   * @memberof RandomProgress
   */
  done() {
    if (this.propsData.progress === this.initial) return

    this.propsData.progress = this.max

    this.isDone = true
  }

  /**
   * 更新动画
   *
   * @memberof RandomProgress
   */
  update() {
    if (this.isDone || this.propsData.progress >= this.limit) {
      this._caf()
      return
    }

    this.propsData.progress = Math.min(
      this.propsData.progress + Math.random(),
      this.limit
    )

    this._step()
  }

  /**
   * 移除节点
   *
   * @memberof RandomProgress
   */
  remove() {
    removeCompFromBody(this.instanceUid)

    this.propsData.progress = 0
    this.isDone = false
    this.instanceUid = null
  }

  /**
   * 获取BaseProgress实例
   *
   * @return {Object} BaseProgress实例
   * @memberof RandomProgress
   */
  getProgressInstance() {
    return getInstanceByUid(this.instanceUid)
  }

  /**
   * 清除raf
   *
   * @memberof RandomProgress
   */
  _caf() {
    cancelAnimationFrame(this.rafId)
    this.rafId = null
  }

  /**
   * raf 步进动画
   *
   * @memberof RandomProgress
   */
  _step() {
    this.rafId = requestAnimationFrame(this.update.bind(this))
  }

  /**
   * BaseProgress mounted后开始动画
   *
   * @memberof RandomProgress
   */
  _onInstanceMounted() {
    this._step()
  }

  /**
   * 初始化BaseProgress
   *
   * @memberof RandomProgress
   */
  _initProgress(compOptions) {
    this.instanceUid = appendComp2Body(compOptions, this.propsData, {
      // mounted及之后的生命周期钩子，才会被触发
      'hook:mounted': this._onInstanceMounted.bind(this),
      'progress-transition-end': () => {
        this.propsData.progress === this.propsData.max && this.remove()
      }
    })
  }

  /**
   * 获取BaseProgress定义
   *
   * @return {Object} 组件定义
   * @memberof RandomProgress
   */
  _getProgressDefinition() {
    return import(
      /* webpackChunkName:'BaseProgress' */ 'Base/BaseProgress'
    ).then(({ default: compOptions }) => compOptions)
  }
}
