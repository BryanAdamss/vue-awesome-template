/**
 * @author GuangHui
 * @description 绘图板
 */

class DrawingBoard {
  constructor(container, options = { size: [], manualMount: false }) {
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

    this.options = options

    const { size, manualMount } = options

    // 尺寸未传，则使用容器的尺寸
    const [width, height] = size
    this.width =
      width == null ? this.container.getBoundingClientRect().width : width
    this.height =
      height == null ? this.container.getBoundingClientRect().height : height

    this.manualMount = manualMount

    this.IMG_TYPES = ['jpg', 'jpeg', 'png', 'webp']
    this.isPainting = false
  }

  /**
   * 生成canvas元素
   */
  _makeCanvas() {
    return document.createElement('canvas')
  }

  /**
   * 设置canvas尺寸
   * @param {Number} width 宽
   * @param {Height} height 高
   */
  _setSize(width, height) {
    this.el.width = width
    this.el.height = height
  }

  /**
   * 获取绘图上下文
   */
  _getCtx() {
    return this.el && this.el.getContext && this.el.getContext('2d')
  }

  /**
   * 重新初始化
   * @param {Object} options 选项
   */
  reInit(options) {
    this._init(this.container, options)
    this.mount()
  }

  /**
   * 销毁
   */
  destory() {
    this.container.removeChild(this.el)
    this.el = null
  }

  /**
   * 挂载
   */
  mount() {
    if (!this.el) this.el = this._makeCanvas()
    if (!this.ctx) this.ctx = this._getCtx()

    this._setSize(this.width, this.height)

    // TODO:此处在reinit时，需要先移除节点或者重刷canvas
    this.container.appendChild(this.el)
  }

  /**
   * 设置绘图背景
   * @param {CanvasImageSource|String} img 需要绘制的图或url
   */
  setBg(img) {
    // TODO:此处未做兼容色值的处理
    this.ctx && this.ctx.drawImage && this.ctx.drawImage(img, 0, 0)
  }

  /**
   * 获取dataURL
   * @param {String} type 图片类型
   * @param {Number} compressRate 压缩比率
   */
  getDataUrl(type = 'png', compressRate) {
    if (
      !this.ctx ||
      !this.IMG_TYPES.includes(type) ||
      typeof compressRate !== 'number' ||
      isNaN(compressRate)
    ) {
      return
    }

    if (compressRate < 0.3) compressRate = 0.3
    if (compressRate > 1) compressRate = 1

    const resourceType = `image/${type}`

    return this.ctx.toDataURL(resourceType, compressRate)
  }

  /**
   * 下载图片
   * @param {String} type 图片类型
   * @param {Number} compressRate 压缩比率
   */
  downloadImg(type = 'png', compressRate) {
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
      link.download = 'zspic' + new Date().getTime()
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
