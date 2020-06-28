/**
 * @author GuangHui
 * @description 绘图板
 */

import { blob2File } from 'Utils/file-convert'

class DrawingBoard {
  // 支持的交互模式枚举
  static INTERACTIVE_MODE_ENUM = ['mouse', 'touch', 'both']
  // 支持的图片类型枚举
  static IMG_TYPE_ENUM = ['jpg', 'jpeg', 'png', 'webp']

  // 支持的画笔模式枚举
  static PEN_MODE_ENUM = ['paint', 'drag', 'empty']

  static DEFAULT_WIDTH = 300 // 默认宽度
  static DEFAULT_HEIGHT = 150 // 默认高度

  constructor(container, options) {
    this._init(container, options)

    if (!this.manualMount) this.mount()
  }

  /**
   * 初始化
   * @param {HTMLElement|String} container 容器
   * @param {Object} options 选项
   */
  _init(container, options) {
    if (!container) throw new Error('el为必填项')

    this.container =
      typeof container === 'string'
        ? document.querySelector(container)
        : container

    this._defaultOptions = {
      size: [], // canvas尺寸
      className: '', // 自定义样式类
      manualMount: false, // 手动挂载
      maxRevokeSteps: 10, // 最大回退步数
      interactiveMode: 'mouse', // 交互模式 enum:['mouse','touch','both'] ,both将同时绑定mouse、touch事件(PointerEvent存在兼容性问题，放弃使用)
      penColor: 'red', // 画笔颜色
      penWidth: 6, // 画笔粗细
      bgImgURL: '', // 背景图url或base64
      bgImgRotate: 0, // 背景图旋转角度
      bgColor: '#fff', // 背景色
      onRevokeStackChange: null, // 撤销栈改变时的回调
      onPaintEnd: null, // 绘制一笔结束的回调
      penMode: 'empty', // 画笔模式
      minScale: 1, // 最小缩放比例
      maxScale: 3 // 最大缩放比例
    }

    this.options = {
      ...this._defaultOptions,
      ...options
    }

    const {
      size,
      className,
      manualMount,
      maxRevokeSteps,
      interactiveMode,
      penColor,
      penWidth,
      bgImgURL,
      bgImgRotate,
      bgColor,
      onRevokeStackChange,
      onPaintEnd,
      penMode,
      minScale,
      maxScale
    } = this.options

    // 尺寸未传，则使用容器的尺寸
    const [width, height] = size

    this.setSize([
      width == null ? DrawingBoard.DEFAULT_WIDTH : width,
      height == null ? DrawingBoard.DEFAULT_HEIGHT : height
    ])

    // 手动挂载
    this.manualMount = manualMount

    // 撤销栈
    this.revokeStack = []
    // 最大撤销步数
    this.MAX_REVOKE_STEPS = this._getLawfulMaxRevokeSteps(maxRevokeSteps)

    this.isPainting = false // 是否绘制中
    this.lastPaintPoint = null // 最后一个绘制点坐标

    this.isDraging = false // 是否拖拽中
    this.lastDragPoint = null // 最后一个拖拽点坐标
    this.dragTransformX = 0
    this.dragTransformY = 0

    this.penMode = DrawingBoard.PEN_MODE_ENUM.includes(penMode)
      ? penMode
      : 'empty'

    // 交互模式
    this.interactiveMode = DrawingBoard.INTERACTIVE_MODE_ENUM.includes(
      interactiveMode
    )
      ? interactiveMode
      : 'mouse'

    // 事件映射
    this.eventList = this._getEventList()

    this.setPenStyle({
      color: penColor,
      width: penWidth
    })

    this.bgImgURL = bgImgURL
    this.bgColor = bgColor

    this.bgImgRotate = this._getLawfulRotateAngle(bgImgRotate)
    this.className = className

    // 有设置背景图，则获取并绘制
    if (bgImgURL) {
      this._getImageFromURL(bgImgURL)
        .then(image => {
          this._bgImgObject = image
          // 保留原始尺寸，方便旋转时使用
          this.originalSize = [image.width, image.height]
          // TODO:此处存在异步问题，drawBg内部会使用ctx
          this._drawBg(image, ...this.originalSize)
        })
        .catch(err => {
          console.log(err)
          this._bgImgObject = null
        })
    } else {
      this._bgImgObject = null
    }

    this.onRevokeStackChange = onRevokeStackChange
    this.onPaintEnd = onPaintEnd

    this.paintCount = 0 // 记录绘制次数

    this.minScale = minScale
    this.maxScale = maxScale
    this._initScale()
  }

  /**
   * 获取事件映射列表
   */
  _getEventList() {
    if (!this._handlePointerStartBinded) {
      this._handlePointerStartBinded = this._handlePointerStart.bind(this)
    }

    if (!this._handlePointerMoveBinded) {
      this._handlePointerMoveBinded = this._handlePointerMove.bind(this)
    }

    if (!this._handlePointerEndBinded) {
      this._handlePointerEndBinded = this._handlePointerEnd.bind(this)
    }

    if (!this._handlePointerLeaveBinded) {
      this._handlePointerLeaveBinded = this._handlePointerLeave.bind(this)
    }

    if (!this._handlePointerCancelBinded) {
      this._handlePointerCancelBinded = this._handlePointerCancel.bind(this)
    }

    return [
      {
        pointerType: 'mouse',
        action: 'start',
        name: 'mousedown',
        handler: this._handlePointerStartBinded
      },
      {
        pointerType: 'mouse',
        action: 'move',
        name: 'mousemove',
        handler: this._handlePointerMoveBinded
      },
      {
        pointerType: 'mouse',
        action: 'end',
        name: 'mouseup',
        handler: this._handlePointerEndBinded
      },
      {
        pointerType: 'mouse',
        action: 'leave',
        name: 'mouseleave',
        handler: this._handlePointerLeaveBinded
      },
      {
        pointerType: 'touch',
        action: 'start',
        name: 'touchstart',
        handler: this._handlePointerStartBinded
      },
      {
        pointerType: 'touch',
        action: 'move',
        name: 'touchmove',
        handler: this._handlePointerMoveBinded
      },
      {
        pointerType: 'touch',
        action: 'end',
        name: 'touchend',
        handler: this._handlePointerEndBinded
      },
      {
        pointerType: 'touch',
        action: 'cancel',
        name: 'touchcancel',
        handler: this._handlePointerCancelBinded
      }
    ]
  }

  /**
   * 绑定当前模式对应动作的所有事件
   * @param {String} action 动作
   * @returns void
   */
  _bindCurInteractiveModeEvents({ action }) {
    if (!this.el) return

    const pointerType = this._getPointerType(this.interactiveMode)

    const condition = { pointerType, action }

    this._cleanCurInteractiveModeEvents(condition)

    this._bindEvent(condition)
  }

  /**
   * 绑定符合特定条件的事件
   * @param {Object} condition 过滤条件
   * @returns void
   */
  _bindEvent(condition = {}) {
    if (!this.el) return
    const eventItems = this._getEventItems(condition)

    if (!eventItems || !eventItems.length) return

    eventItems.forEach(({ name, handler }) =>
      this.el.addEventListener(name, handler, false)
    )
  }

  /**
   * 获取模式对应的指针类型
   * @param {string} mode 模式
   * @returns 类型字符串
   */
  _getPointerType(mode) {
    if (mode === 'both') {
      return ''
    } else if (mode === 'touch') {
      return 'touch'
    } else {
      return 'mouse'
    }
  }

  /**
   * 过滤出符合条件的EventItems
   * @param {String} mode 模式
   * @param {String} action 动作
   * @returns EventItems数组
   */
  _getEventItems({ mode, action }) {
    // 默认全量返回
    let filterFn = () => true

    if (mode && action) {
      filterFn = item => item.mode === mode && item.action === action
    } else if (mode && !action) {
      filterFn = item => item.mode === mode
    } else if (!mode && action) {
      filterFn = item => item.action === action
    }

    return this.eventList.filter(filterFn)
  }

  /**
   * 清除当前模式对应动作的所有事件
   * @param {String} action 动作
   * @returns void
   */
  _cleanCurInteractiveModeEvents({ action }) {
    if (!this.el) return

    const pointerType = this._getPointerType(this.interactiveMode)

    const condition = { pointerType, action }

    this._cleanEvent(condition)
  }

  /**
   * 清除符合特定条件的事件
   * @param {Object} condition 过滤条件
   * @returns void
   */
  _cleanEvent(condition = {}) {
    if (!this.el) return
    const eventItems = this._getEventItems(condition)

    if (!eventItems || !eventItems.length) return

    eventItems.forEach(({ name, handler }) =>
      this.el.removeEventListener(name, handler, false)
    )
  }

  /**
   * 处理指针开始
   * @param {MouseEvent|TouchEvent} e 事件对象
   * @returns void
   */
  _handlePointerStart(e) {
    console.log('_handlePointerStart')
    if (this.penMode === 'empty') return

    if (this.penMode === 'paint') this._handlePaintStart(e)

    if (this.penMode === 'drag') this._handleDragStart(e)

    this._bindCurInteractiveModeEvents({ action: 'move' })
    this._bindCurInteractiveModeEvents({ action: 'end' })
    this._bindCurInteractiveModeEvents({ action: 'leave' })
  }

  /**
   * 处理绘制开始
   */
  _handlePaintStart(e) {
    this.isPainting = true

    this.lastPaintPoint = this._getPointOffset(e)

    // 绘制前保存状态
    this.ctx &&
      this._saveImageData(
        'paint',
        this.paintCount,
        this.ctx.getImageData(0, 0, this.width, this.height)
      )

    this._drawCircle(
      this.lastPaintPoint.x,
      this.lastPaintPoint.y,
      this.penWidth / 2,
      this.penColor
    )
  }

  /**
   * 处理拖拽开始
   */
  _handleDragStart(e) {
    console.log('drag start')

    this.isDraging = true

    this.lastDragPoint = this._getPointOffset(e)
  }

  /**
   * 处理指针移动
   * @param {MouseEvent|TouchEvent} e 事件对象
   * @returns void
   */
  _handlePointerMove(e) {
    console.log('_handlePointerMove')

    if (this.penMode === 'empty') return

    if (this.penMode === 'paint') this._handlePaintMove(e)

    if (this.penMode === 'drag') this._handleDragMove(e)
  }

  /**
   * 处理绘制移动
   */
  _handlePaintMove(e) {
    if (this.isPainting) {
      const { x, y } = this._getPointOffset(e)
      console.log(x, y)

      const { x: lastX, y: lastY } = this.lastPaintPoint

      this._drawLine(lastX, lastY, x, y, this.penWidth, this.penColor)
      this.lastPaintPoint = { x, y }
    }
  }

  /**
   * 处理拖拽移动
   */
  _handleDragMove(e) {
    console.log('drag move')
    if (this.isDraging) {
      const { x, y } = this._getPointOffset(e)

      const { x: lastX, y: lastY } = this.lastDragPoint

      this.dragTransformX += x - lastX
      this.dragTransformY += y - lastY

      this._setCanvasTransform(
        this.dragTransformX,
        this.dragTransformY,
        this.scale
      )
    }
  }

  /**
   * 处理指针结束
   * @param {MouseEvent|TouchEvent} e 事件对象
   * @returns void
   */
  _handlePointerEnd(e) {
    console.log('_handlePointerEnd')

    if (this.penMode === 'empty') return

    if (this.penMode === 'paint') this._handlePaintEnd(e)

    if (this.penMode === 'drag') this._handleDragEnd(e)

    // 解绑相关事件
    this._cleanCurInteractiveModeEvents({ action: 'move' })
    this._cleanCurInteractiveModeEvents({ action: 'end' })
    this._cleanCurInteractiveModeEvents({ action: 'leave' })
  }

  /**
   * 处理绘制结束
   */
  _handlePaintEnd(e) {
    this.isPainting = false

    this.paintCount++

    this.onPaintEnd &&
      typeof this.onPaintEnd === 'function' &&
      this.onPaintEnd(this.paintCount)

    console.log('_handlePointerEnd paintCount', this.paintCount)
  }

  /**
   * 处理拖拽结束
   */
  _handleDragEnd(e) {
    console.log('drag end')

    this.isDraging = false
  }

  /**
   * 处理指针离开
   * @param {MouseEvent|TouchEvent} e 事件对象
   * @returns void
   */
  _handlePointerLeave(e) {
    console.log('_handlePointerLeave')
    if (this.isPainting || this.isDraging) this._handlePointerEnd(e)
  }

  /**
   * 处理指针取消
   * @param {MouseEvent|TouchEvent} e 事件对象
   * @returns void
   */
  _handlePointerCancel(e) {
    console.log('_handlePointerCancel')

    if (this.isPainting || this.isDraging) this._handlePointerEnd(e)
  }

  /**
   * 设置canvas transform
   * @param {Number} x 横轴
   * @param {Number} y 纵轴
   * @param {Number} scale 缩放比例
   * @param {Boolean} transition 过度动画
   */
  _setCanvasTransform(x, y, scale, transition = false) {
    if (!this.el) return

    const text = `transform:scale(${scale}) translate3d(${x}px,${y}px,0);transform-origin:center;`
    const cssText = transition ? text + 'transition:0.3s;' : text

    this.el.setAttribute('style', cssText)
  }

  /**
   * 设置画笔模式
   * @param {String} mode 画笔模式
   */
  _setPenMode(mode) {
    if (!DrawingBoard.PEN_MODE_ENUM.includes(mode)) return

    this.penMode = mode
  }

  /**
   * 绘制圆形
   * @param {Number} x 横轴
   * @param {Number} y 纵轴
   * @param {Number} radius 半径
   * @param {String} color 画笔颜色
   * @returns void
   */
  _drawCircle(x, y, radius = 3, color = 'red') {
    if (!this.ctx) return
    this.ctx.save()

    this.ctx.fillStyle = color

    this.ctx.beginPath()
    this.ctx.arc(x, y, radius, 0, (Math.PI / 180) * 360, false)
    this.ctx.fill()

    this.ctx.restore()
  }

  /**
   * 绘制移动时的直线
   * @param {Number} x1 起点x1
   * @param {Number} y1 起点y1
   * @param {Number} x2 终点x2
   * @param {Number} y2 终点y2
   * @param {Number} width 线条宽度
   * @param {String} color 颜色
   * @returns void
   */
  _drawLine(x1, y1, x2, y2, width = 6, color = 'red') {
    if (!this.ctx) return
    this.ctx.save()

    this.ctx.strokeStyle = color
    this.ctx.lineWidth = width
    this.ctx.lineCap = 'round'
    this.ctx.lineJoin = 'round'

    this.ctx.beginPath()
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.stroke()

    this.ctx.restore()
  }

  /**
   * 获取事件相对触发对象的偏移值
   * @param {MouseEvent|TouchEvent} e 事件对象
   * @returns 偏移值对象
   */
  _getPointOffset(e) {
    if (e instanceof MouseEvent) {
      return {
        x: e.offsetX,
        y: e.offsetY
      }
    } else if (e instanceof TouchEvent) {
      const { touches, target } = e

      const { clientX, clientY } = touches[0]
      const { left, top } = target.getBoundingClientRect()

      return {
        x: clientX - left,
        y: clientY - top
      }
    }
  }

  /**
   * 获取合法的最大撤销步数
   * @param {Number} steps 步数
   * @returns 合法的最大撤销步数
   */
  _getLawfulMaxRevokeSteps(steps) {
    if (steps <= 0 || typeof steps !== 'number' || isNaN(steps)) return 10
    // 最大撤销步数
    const LIMIT_MAX_REVOKE_STEPS = 50
    if (steps > LIMIT_MAX_REVOKE_STEPS) return LIMIT_MAX_REVOKE_STEPS
    return steps
  }

  /**
   * 保存当前画布状态
   * @param {String} type 类型(绘制paint、清空clear) 默认paint
   * @param {Number} paintCount 绘制次数
   * @param {ImageData} imageData 像素数据
   * @returns void
   */
  _saveImageData(type = 'paint', paintCount, imageData) {
    if (
      !['paint', 'clear'].includes(type) ||
      paintCount == null ||
      !imageData ||
      !(imageData instanceof ImageData)
    ) {
      return
    }

    if (this.revokeStack.length >= this.MAX_REVOKE_STEPS) {
      this.revokeStack.shift()
    }

    // 保存类型及绘制次数(撤销时使用)
    this.revokeStack.push({ type, paintCount, imageData })

    this.onRevokeStackChange &&
      typeof this.onRevokeStackChange === 'function' &&
      this.onRevokeStackChange(this.revokeStack)

    console.log('_saveImageData onRevokeStackChange', this.revokeStack)
  }

  /**
   * 生成canvas元素
   * @returns canvas DOM对象
   */
  _makeCanvas() {
    return document.createElement('canvas')
  }

  /**
   * 设置canvas dom尺寸
   * @param {Number} width 宽
   * @param {Number} height 高
   * @returns void
   */
  _setDOMSize([width, height]) {
    if (width != null && this.el) this.el.width = width
    if (height != null && this.el) this.el.height = height
  }

  /**
   * 获取绘图上下文
   * @returns canvas context
   */
  _getCtx() {
    return this.el && this.el.getContext && this.el.getContext('2d')
  }

  /**
   * 单步撤销
   * @returns void
   */
  _revoke() {
    if (!this.ctx || !this.revokeStack || !this.revokeStack.length) return

    const {
      imageData,
      paintCount: afterRevokePaintCount
    } = this.revokeStack.pop()

    this.ctx.putImageData(imageData, 0, 0)

    // 恢复绘制次数
    this.paintCount = afterRevokePaintCount

    this.onRevokeStackChange &&
      typeof this.onRevokeStackChange === 'function' &&
      this.onRevokeStackChange(this.revokeStack)

    console.log(
      '_revoke onRevokeStackChange',
      this.revokeStack,
      afterRevokePaintCount
    )
  }

  /**
   * 从url获取图片
   * @param {String} imgURL 图片url，支持base64
   * @returns void
   */
  _getImageFromURL(imgURL) {
    return new Promise((resolve, reject) => {
      if (!/^(http[s]?)|(data:image)/.test(imgURL)) {
        reject(new Error('图片url格式不正确'))
        return
      }

      const image = new Image()
      image.src = imgURL

      image.onload = () => {
        resolve(image)
      }

      image.onerror = reject

      // 确保从缓存加载图片时，也能触发load事件
      if (image.complete || image.complete === undefined) {
        image.src =
          'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
        image.src = imgURL
      }
    })
  }

  /**
   * 绘制背景底图
   * @param {CanvasImageSource} imgObject 图像对象
   * @param {Number} w 宽
   * @param {Number} h 高
   * @returns void
   */
  _drawBg(imgObject, w, h) {
    if (
      !imgObject ||
      !this.ctx ||
      !this.ctx.drawImage ||
      !w ||
      !h ||
      w <= 0 ||
      h <= 0
    ) {
      return
    }

    const sx = 0
    const sy = 0
    const sWidth = w
    const sHeight = h

    const dx =
      this.bgImgRotate === 0 || this.bgImgRotate === 180
        ? -this.width / 2
        : -this.height / 2
    const dy =
      this.bgImgRotate === 0 || this.bgImgRotate === 180
        ? -this.height / 2
        : -this.width / 2

    const dWidth =
      this.bgImgRotate === 0 || this.bgImgRotate === 180
        ? this.width
        : this.height
    const dHeight =
      this.bgImgRotate === 0 || this.bgImgRotate === 180
        ? this.height
        : this.width

    this.ctx.save()

    this.ctx.translate(this.width / 2, this.height / 2)
    this.ctx.rotate((Math.PI / 180) * this.bgImgRotate)

    console.log(
      '旋转参数:',
      sx,
      sy,
      sWidth,
      sHeight,
      dx,
      dy,
      dWidth,
      dHeight,
      this.bgImgRotate
    )

    this.ctx.drawImage(
      imgObject,
      sx,
      sy,
      sWidth,
      sHeight,
      dx,
      dy,
      dWidth,
      dHeight
    )

    this.ctx.restore()
  }

  /**
   * 获取合法角度值(逆时针旋转角度记录为正值，-90度 记录为270；450记录为90,10度记录为0,55度记录为90)
   * @param {Number} angle 角度
   * @returns 合法角度值
   */
  _getLawfulRotateAngle(angle) {
    if (typeof angle !== 'number' || isNaN(angle)) return
    const tempAngle = angle % 360
    const newAngle = tempAngle < 0 ? tempAngle + 360 : tempAngle
    // 角度>=45，计入下一个90度，保证返回的角度 % 90 ===0
    const roundAngle =
      newAngle % 90 >= 45
        ? (Math.ceil(newAngle / 90) * 90) % 360
        : (Math.floor(newAngle / 90) * 90) % 360

    // 可能存在-0
    return Math.abs(roundAngle)
  }

  /**
   * 初始化缩放
   */
  _initScale() {
    this.scale = 1 // 初始缩放比例设置为1
    if (this.container) this.container.style.overflow = 'hidden'
  }

  /**
   * 处理缩放比例改变
   */
  _handleScaleChange() {
    if (!this.el) return

    this._setCanvasTransform(
      this.dragTransformX,
      this.dragTransformY,
      this.scale
    )
  }

  /**
   * scale + 0.1
   */
  makeScaleAddZeroPointOne() {
    const newScale = this.scale + 0.1
    this.setScale(newScale)
  }

  /**
   * scale - 0.1
   */
  makeScaleSubtractZeroPointOne() {
    const newScale = this.scale - 0.1
    this.setScale(newScale)
  }

  /**
   * 重置缩放比例、位置
   */
  reset() {
    this.dragTransformX = this.dragTransformY = 0
    this.scale = 1

    this._setCanvasTransform(
      this.dragTransformX,
      this.dragTransformY,
      this.scale,
      true
    )
  }

  /**
   * 设置画笔模式为绘制模式
   */
  setPenModePaint() {
    this._setPenMode('paint')
  }

  /**
   * 设置画笔模式为拖拽模式
   */
  setPenModeDrag() {
    this._setPenMode('drag')
  }

  /**
   * 重置画笔模式为空
   */
  setPenModeEmpty() {
    this._setPenMode('empty')
  }

  /**
   * 设置缩放比例
   * @param {Number} scale 缩放比例
   */
  setScale(scale) {
    let s = parseFloat(scale)
    if (isNaN(s)) return

    if (s < this.minScale) s = this.minScale
    if (s > this.maxScale) s = this.maxScale

    this.scale = s

    this._handleScaleChange()
  }

  /**
   * 获取当前画面的绘制次数
   * @returns 绘制次数
   */
  getPaintCount() {
    return this.paintCount
  }

  /**
   * 旋转
   * @param {Boolean} direction 方向 1顺时针 -1逆时针
   * @returns void
   */
  rotate(direction = 1) {
    if (![1, -1].includes(direction)) return

    this.bgImgRotate = this._getLawfulRotateAngle(
      this.bgImgRotate + direction * 90
    )

    // 重设尺寸，旋转90度，宽高互换即可
    this.setSize([this.height, this.width])

    this._drawBg(this._bgImgObject, ...this.originalSize)

    // 因为旋转操作不记录到撤销栈中
    // 旋转时需要清空撤销栈并重置绘制数量，不然会导致撤销状态错误
    this.paintCount = 0
    this.revokeStack = []
  }

  /**
   * 设置画笔样式(粗细、颜色)
   * @param {Object} penStyle 画笔样式
   * @returns void
   */
  setPenStyle({ color, width }) {
    if (color && typeof color === 'string') this.penColor = color
    if (width && typeof width === 'number' && !isNaN(width) && width > 0) {
      this.penWidth = width
    }
  }

  /**
   * 撤销
   * @returns void
   */
  revoke() {
    this._revoke()
  }

  /**
   * 清空绘制
   * @returns void
   */
  clear() {
    if (!this.ctx || !this.el) return

    // 清空前保存状态
    this._saveImageData(
      'clear',
      this.paintCount,
      this.ctx.getImageData(0, 0, this.width, this.height)
    )

    this.ctx.clearRect(0, 0, this.width, this.height)

    // 重置绘制次数
    this.paintCount = 0

    // 如果有背景图，则需要重新绘制背景图
    this._bgImgObject && this._drawBg(this._bgImgObject, ...this.originalSize)

    console.log('clear paintCount', this.paintCount)
  }

  /**
   * 设置canvas尺寸
   * @param {Number} width 宽
   * @param {Number} height 高
   * @returns void
   */
  setSize([width, height]) {
    if (width) this.width = width
    if (height) this.height = height

    this._setDOMSize([width, height])
  }

  /**
   * 重新初始化
   * @param {Object} options 选项
   * @returns void
   */
  reInit(options) {
    this._init(this.container, options || this.options)
    this.mount()
  }

  /**
   * 销毁
   * @returns void
   */
  destory() {
    this.container.removeChild(this.el)
    this.el = null
    this._bgImgObject = null
  }

  /**
   * 设置样式名
   * @param {String} name 样式类字符串
   * @returns void
   */
  setClassName(name) {
    if (!name || !this.el) return
    this.el.className = name
  }

  /**
   * 挂载
   * @returns void
   */
  mount() {
    if (!this.el) this.el = this._makeCanvas()
    if (!this.ctx) this.ctx = this._getCtx()

    this._setDOMSize([this.width, this.height])
    this.setClassName(this.className)

    this._bindCurInteractiveModeEvents({ action: 'start' })

    this.container.appendChild(this.el)
  }

  /**
   * 设置背景
   * @param {CanvasImageSource|String} urlOrObject 需要绘制的图像对象(HTMLImageElement、SVGImageElement、HTMLVideoElement、HTMLCanvasElement、ImageBitmap、OffscreenCanvas)或图像url
   * @param {Number} originalWidth 原图像宽度。当无法从urlOrObject直接获取原始尺寸时需要手动提供原始尺寸
   * @param {Number} originalHeight 原图像高度
   * @returns void
   */
  setBgImg(urlOrObject, originalWidth, originalHeight) {
    // TODO:此处可能需要保存状态
    if (
      typeof urlOrObject === 'string' &&
      /^(http[s]?)|(data:image)/.test(urlOrObject)
    ) {
      // 从url中获取图片对象
      this._getImageFromURL(urlOrObject)
        .then(image => {
          this._bgImgObject = image
          this.originalSize = [
            originalWidth || image.width,
            originalHeight || image.height
          ]
          this._drawBg(image, ...this.originalSize)
        })
        .catch(err => {
          console.log(err)
          this._bgImgObject = null
        })
    } else {
      if (urlOrObject !== this._bgImgObject) this._bgImgObject = urlOrObject
      this.originalSize = [
        originalWidth || this.width,
        originalHeight || this.height
      ]
      this._drawBg(urlOrObject, ...this.originalSize)
    }
  }

  /**
   * 获取dataURL
   * @param {String} type 图片类型
   * @param {Number} compressRate 压缩比率
   * @returns dataURL
   */
  getDataUrl(type = 'png', compressRate = 1) {
    if (
      !this.el ||
      !DrawingBoard.IMG_TYPE_ENUM.includes(type) ||
      typeof compressRate !== 'number' ||
      isNaN(compressRate)
    ) {
      return
    }

    if (compressRate < 0.3) compressRate = 0.3
    if (compressRate > 1) compressRate = 1

    const resourceType = `image/${type}`

    return this.el.toDataURL(resourceType, compressRate)
  }

  /**
   * 获取Blob
   * @param {String} type 图片类型
   * @param {Number} compressRate 压缩比率
   * @returns promise resolved a blob
   */
  getBlob(type = 'png', compressRate = 1) {
    if (
      !this.el ||
      !DrawingBoard.IMG_TYPE_ENUM.includes(type) ||
      typeof compressRate !== 'number' ||
      isNaN(compressRate)
    ) {
      return
    }

    if (compressRate < 0.3) compressRate = 0.3
    if (compressRate > 1) compressRate = 1

    const resourceType = `image/${type}`

    return new Promise((resolve, reject) => {
      this.el.toBlob(resolve, resourceType, compressRate)
    })
  }

  /**
   * 获取File
   * @param {String} type 图片类型
   * @param {Number} compressRate 压缩比率
   * @returns promise resolved a file
   */
  getFile(name = 'drawingBoard', type = 'png', compressRate = 1) {
    return this.getBlob(type, compressRate).then(blob => blob2File(blob, name))
  }

  /**
   * 下载图片
   * @param {String} type 图片类型
   * @param {Number} compressRate 压缩比率，默认原图输出
   * @returns void
   */
  download(type = 'png', compressRate = 1, name = 'drawing-board') {
    if (
      !DrawingBoard.IMG_TYPE_ENUM.includes(type) ||
      typeof compressRate !== 'number' ||
      isNaN(compressRate)
    ) {
      return
    }

    if (compressRate < 0.3) compressRate = 0.3
    if (compressRate > 1) compressRate = 1

    const url = this.getDataUrl(type, compressRate)

    if (url) {
      let link = document.createElement('a')
      document.body.appendChild(link)
      link.href = url
      link.download = `${name}-${new Date().getTime()}`
      link.target = '_blank'
      link.click()

      let timer = setTimeout(() => {
        document.body.removeChild(link)
        link = null

        clearTimeout(timer)
        timer = null
      }, 200)
    }
  }
}

export default DrawingBoard
