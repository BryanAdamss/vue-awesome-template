/**
 * @author GuangHui
 * @description 绘图板
 */

class DrawingBoard {
  constructor(container, options) {
    this._init(container, options)

    if (!this.manualMount) this.mount(this.container)
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
      size: [],
      manualMount: false,
      maxRevokeSteps: 10,
      useMouse: true,
      penColor: 'red',
      penWidth: 6,
      bgImgURL: '',
      bgColor: '#fff',
      rotate: 0
    }

    this.options = {
      ...this._defaultOptions,
      ...options
    }

    const {
      size,
      manualMount,
      maxRevokeSteps,
      useMouse,
      penColor,
      penWidth,
      bgImgURL,
      bgColor,
      rotate
    } = this.options

    // 尺寸未传，则使用容器的尺寸
    const [width, height] = size
    this.setSize([
      width == null ? this.container.getBoundingClientRect().width : width,
      height == null ? this.container.getBoundingClientRect().height : height
    ])

    // 手动挂载
    this.manualMount = manualMount

    // 撤销栈
    this.revokeStack = []
    // 最大撤销步数
    this.MAX_REVOKE_STEPS = this._getLawfulMaxRevokeSteps(maxRevokeSteps)

    // 支持的图片类型
    this.IMG_TYPES = ['jpg', 'jpeg', 'png', 'webp']

    this.lastPoint = null
    this.isPainting = false

    // 交互模式
    this.mode = useMouse ? 'mouse' : 'touch'

    this.setPenStyle({
      color: penColor,
      width: penWidth
    })

    this.bgImgURL = bgImgURL
    this.bgColor = bgColor

    // 获取背景图
    if (bgImgURL) {
      this._getImageFromURL(bgImgURL)
        .then(image => {
          this._bgImgObject = image
          this._drawBg(image)
        })
        .catch(err => {
          console.log(err)
          this._bgImgObject = null
        })
    } else {
      this._bgImgObject = null
    }
  }

  /**
   * 绑定事件
   * @param {String} mode 交互模式(鼠标、触摸)
   */
  _bindEvents(mode) {
    if (!mode || !this.el) return
    this._cleanEvents(mode)

    const startEventName = mode === 'mouse' ? 'mousedown' : 'touchstart'
    const moveEventName = mode === 'mouse' ? 'mousemove' : 'touchmove'
    const endEventName = mode === 'mouse' ? 'mouseup' : 'touchend'

    this._handlePointerStartBinded = this._handlePointerStart.bind(this)
    this._handlePointerMoveBinded = this._handlePointerMove.bind(this)
    this._handlePointerEndBinded = this._handlePointerEnd.bind(this)

    this.el.addEventListener(
      startEventName,
      this._handlePointerStartBinded,
      false
    )
    this.el.addEventListener(
      moveEventName,
      this._handlePointerMoveBinded,
      false
    )
    this.el.addEventListener(endEventName, this._handlePointerEndBinded, false)
  }

  /**
   * 处理指针开始
   * @param {MouseEvent|TouchEvent} e 事件对象
   */
  _handlePointerStart(e) {
    this.isPainting = true

    this.lastPoint = this._getPointOffset(e)

    // TODO:存在用户轻点，占用撤销栈的问题
    this.ctx &&
      this._saveImageData(this.ctx.getImageData(0, 0, this.width, this.height))
  }

  /**
   * 处理指针移动
   * @param {MouseEvent|TouchEvent} e 事件对象
   */
  _handlePointerMove(e) {
    if (!this.isPainting) return
    const { x, y } = this._getPointOffset(e)
    const { x: lastX, y: lastY } = this.lastPoint

    this._drawLine(lastX, lastY, x, y, this.penWidth, this.penColor)
    this.lastPoint = { x, y }
  }

  /**
   * 处理指针结束
   * @param {MouseEvent|TouchEvent} e 事件对象
   */
  _handlePointerEnd(e) {
    this.isPainting = false
  }

  _drawCircle(x, y, radius = 10, color = 'red') {
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

      console.log('_getPointOffset', clientX, clientY, left, top)

      return {
        x: clientX - left,
        y: clientY - top
      }
    }
  }

  /**
   * 清除事件
   * @param {String} mode 交互模式(鼠标、触摸)
   */
  _cleanEvents(mode) {
    if (!this.el || !mode) return
    const startEventName = mode === 'mouse' ? 'mousedown' : 'touchstart'
    const moveEventName = mode === 'mouse' ? 'mousemove' : 'touchmove'
    const endEventName = mode === 'mouse' ? 'mouseup' : 'touchend'

    this.el.removeEventListener(
      startEventName,
      this._handlePointerStartBinded,
      false
    )
    this.el.removeEventListener(
      moveEventName,
      this._handlePointerMoveBinded,
      false
    )
    this.el.addEventListener(endEventName, this._handlePointerEndBinded, false)
  }

  /**
   * 获取合法的最大撤销步数
   * @param {Number} steps 步数
   */
  _getLawfulMaxRevokeSteps(steps) {
    if (steps <= 0 || typeof steps !== 'number' || isNaN(steps)) return 10
    // 最大撤销步数
    const LIMIT_MAX_REVOKE_STEPS = 50
    if (steps > LIMIT_MAX_REVOKE_STEPS) return LIMIT_MAX_REVOKE_STEPS
    return steps
  }

  /**
   * 保存当前画布像素数据
   * @param {ImageData} imageData 像素数据
   */
  _saveImageData(imageData) {
    if (!imageData || !(imageData instanceof ImageData)) return

    if (this.revokeStack.length >= this.MAX_REVOKE_STEPS) {
      this.revokeStack.shift()
    }

    this.revokeStack.push(imageData)

    console.log('revokeStack', this.revokeStack)
  }

  /**
   * 生成canvas元素
   */
  _makeCanvas() {
    return document.createElement('canvas')
  }

  /**
   * 设置canvas dom尺寸
   * @param {Number} width 宽
   * @param {Number} height 高
   */
  _setDOMSize([width, height]) {
    if (width != null && this.el) this.el.width = width
    if (height != null && this.el) this.el.height = height
  }

  /**
   * 获取绘图上下文
   */
  _getCtx() {
    return this.el && this.el.getContext && this.el.getContext('2d')
  }

  /**
   * 单步撤销
   */
  _revoke() {
    if (!this.ctx || !this.revokeStack || !this.revokeStack.length) return

    this.ctx.putImageData(this.revokeStack.pop(), 0, 0)
    console.log('_revoke', this.revokeStack)
  }

  /**
   * 从url获取图片
   * @param {String} imgURL 图片url，支持base64
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
   * 设置画笔样式(粗细、颜色)
   * @param {Object} penStyle 画笔样式
   */
  setPenStyle({ color, width }) {
    if (color && typeof color === 'string') this.penColor = color
    if (width && typeof width === 'number' && !isNaN(width) && width > 0) {
      this.penWidth = width
    }
  }

  /**
   * 撤销
   */
  revoke() {
    this._revoke()
  }

  /**
   * 清空绘图板
   */
  clear() {
    if (!this.ctx || !this.el) return

    this._saveImageData(this.ctx.getImageData(0, 0, this.width, this.height))

    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  /**
   * 设置canvas尺寸
   * @param {Number} width 宽
   * @param {Number} height 高
   */
  setSize([width, height]) {
    if (width) this.width = width
    if (height) this.height = height

    this._setDOMSize([width, height])
  }

  /**
   * 重新初始化
   * @param {Object} options 选项
   */
  reInit(options) {
    this._init(this.container, options || this.options)
    this.mount()
  }

  /**
   * 销毁
   */
  destory() {
    this.container.removeChild(this.el)
    this.el = null
    this._bgImgObject = null
  }

  /**
   * 挂载
   */
  mount() {
    if (!this.el) this.el = this._makeCanvas()
    if (!this.ctx) this.ctx = this._getCtx()

    this._setDOMSize([this.width, this.height])

    this._bindEvents(this.mode)

    // TODO:此处在reinit时，需要先移除节点或者重刷canvas
    this.container.appendChild(this.el)
  }

  /**
   * 设置绘图背景
   * @param {CanvasImageSource|String} img 需要绘制的图或url
   */
  setBgImg(urlOrObject) {
    if (
      typeof urlOrObject === 'string' &&
      /^(http[s]?)|(data:image)/.test(urlOrObject)
    ) {
      // 从url中获取图片对象
      this._getImageFromURL(urlOrObject)
        .then(image => {
          this._bgImgObject = image
          this._drawBg(image)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      this._bgImgObject = urlOrObject
      this._drawBg(urlOrObject)
    }
  }

  /**
   * 绘制背景
   * @param {Image} imgObject 图片对象
   */
  _drawBg(imgObject) {
    if (!imgObject || !this.ctx || !this.ctx.drawImage) return

    this.ctx.drawImage(imgObject, 0, 0)
  }

  /**
   * 设置背景色
   * @param {String} color 背景色
   */
  setBgColor(color = '#fff') {
    if (typeof color !== 'string' || !this.ctx) return

    this.bgColor = color

    this.ctx.save()

    this.ctx.beginPath()
    this.ctx.fillRect(color, 0, 0, this.width, this.height)

    this.ctx.restore()
  }

  /**
   * 获取dataURL
   * @param {String} type 图片类型
   * @param {Number} compressRate 压缩比率
   */
  getDataUrl(type = 'png', compressRate = 1) {
    if (
      !this.el ||
      !this.IMG_TYPES.includes(type) ||
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
   * 下载图片
   * @param {String} type 图片类型
   * @param {Number} compressRate 压缩比率，默认原图输出
   */
  download(type = 'png', compressRate = 1, name = 'drawing-board') {
    if (
      !this.IMG_TYPES.includes(type) ||
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
