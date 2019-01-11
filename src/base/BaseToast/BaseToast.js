const STYLES = {
  normal: `position: fixed;top: 50%;left: 50%;-webkit-transform: translate3d(-50%, -50%, 0);transform: translate3d(-50%, -50%, 0);color: #fff;font-size: 0.8em;border-radius: 0.2em;padding: 0.2em 0.8em;background-color: #333;background-color: rgba(0, 0, 0, 0.5);opacity: 0;word-break: break-all;word-wrap: break-word;will-change: opacity;-webkit-transition: opacity 0.2s;transition: opacity 0.2s;max-height: 80%;max-width: 80%;`,
  show: `opacity: 1;transition: opacity 0.3s ease-in;`
}

const DEFAULT_OPTIONS = {
  duration: 1500,
  message: 'toast'
}

function Toast(options = {}) {
  this.$options = {
    ...DEFAULT_OPTIONS,
    ...options
  }

  this.init()
}

Toast.prototype = {
  constructor: Toast,

  init() {
    const { duration, message } = this.$options

    this.$el = this._createNode(message)

    this._addToBody(this.$el)

    this.$timer = setTimeout(() => {
      clearTimeout(this.$timer)
      this._removeFromBody(this.$el)
    }, duration)
  },

  _createNode(msg) {
    let el = document.createElement('div')

    el.style.cssText = STYLES.normal

    el.textContent = msg
    return el
  },

  _addToBody(el) {
    document.body.appendChild(el)

    let timer = setTimeout(() => {
      clearTimeout(timer)
      el.style.cssText = STYLES.normal + STYLES.show
    }, 0)
  },

  _removeFromBody(el) {
    el.style.cssText = STYLES.normal
    el.addEventListener('transitionend', function() {
      if (el) document.body.removeChild(el)
    })
  }
}

function toastCore(options) {
  return new Toast(options)
}

export default toastCore
