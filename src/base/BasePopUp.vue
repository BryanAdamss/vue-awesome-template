<script>
/**
 * * BasePopUp
 */

import IndexManager from 'Services/extends/index-manager'

const POSITIONS = ['top', 'right', 'bottom', 'left']

export default {
  name: 'BasePopUp',
  props: {
    emitShadowClickEvent: {
      // * 是否派发点击阴影事件
      type: Boolean,
      default: false
    },
    shadowClose: {
      // * 点击阴影关闭
      type: Boolean,
      default: false
    },
    position: {
      // * 位置
      type: String,
      default: 'center'
    },
    hasShadow: {
      // * 是否展示阴影
      type: Boolean,
      default: true
    },
    isShow: {
      // * 是否可见
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: [Number, String],
      default() {
        return new IndexManager().add()
      }
    }
  },
  computed: {
    positionClass() {
      const index = POSITIONS.indexOf(this.position)
      const name = index > -1 ? POSITIONS[index] : 'center'
      return `is-${name}`
    }
  },
  watch: {
    isShow: {
      handler(newVal, oldVal) {
        this._toggleBodyHidden(newVal)
        this.$emit('update:isShow', newVal)

        if (newVal === false) this.$emit('close', false)
      },
      immediate: true
    }
  },
  mounted() {
    console.log('mounted')
    if (this.appendToBody) document.body.appendChild(this.$el)
  },
  activated() {},
  created() {},
  beforeDestroy() {
    this._toggleBodyHidden(false)

    if (this.appendToBody && this.$el && this.$el.parentNode)
      this.$el.parentNode.removeChild(this.$el)
  },
  methods: {
    _toggleBodyHidden(val) {
      if (val) {
        document.body.classList.add('is-hidden')
      } else {
        document.body.classList.remove('is-hidden')
      }
    },
    open() {
      this.$emit('update:isShow', true)
    },
    close() {
      this.$emit('update:isShow', false)
    },
    onShadowClick(e) {
      // * 点击阴影
      const modal = this.$refs.modal
      const target = e.target
      // * 不是点击阴影时直接返回
      if (modal !== target) {
        return
      }

      if (this.shadowClose) {
        this.close()
      }

      this.emitShadowClickEvent && this.$emit('shadow-click', e)
    }
  },
  render(h) {
    const child = h(
      'div',
      {
        class: {
          'c-BasePopUp-main': true
        }
      },
      this.$scopedSlots.default ? this.$scopedSlots.default() : 'BasePopUp'
    )

    const wrap = h(
      'div',
      {
        class: {
          'c-BasePopUp': true,
          [this.positionClass]: true,
          'has-shadow': this.hasShadow,
          'is-visible': this.isShow
        },
        ref: 'modal',
        on: {
          click: this.onShadowClick
        },
        style: {
          zIndex: this.zIndex
        }
      },
      [child]
    )

    return wrap
  }
}
</script>

<style lang="scss" scoped>
.c-BasePopUp {
  position: fixed;
  top: 0;
  left: 0;

  opacity: 0;
  // * 设置关闭时的过渡
  transition: opacity 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
  // * 屏蔽事件
  pointer-events: none;
  // * 开启加速
  will-change: opacity;

  &.has-shadow {
    @include bg-alpha();
  }

  // * 展示时相关样式
  &.is-visible {
    width: 100%;
    height: 100%;

    opacity: 1;

    transition: opacity 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);

    pointer-events: auto;

    .c-BasePopUp-main {
      transition: transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    }

    &.is-left .c-BasePopUp-main,
    &.is-right .c-BasePopUp-main {
      transform: translateX(0);
    }

    &.is-top .c-BasePopUp-main,
    &.is-bottom .c-BasePopUp-main {
      transform: translateY(0);
    }
  }

  // * 非展示时相关样式
  &.is-center {
    .c-BasePopUp-main {
      top: 50%;
      left: 50%;

      max-width: 80%;
      max-height: 80%;

      transform: translate3d(-50%, -50%, 0);
    }
  }

  &.is-top .c-BasePopUp-main,
  &.is-bottom .c-BasePopUp-main {
    right: 0;
    left: 0;

    width: 100%;
    max-height: 80%;
  }

  &.is-top {
    .c-BasePopUp-main {
      top: 0;

      transform: translateY(-100%);
    }
  }

  &.is-bottom {
    .c-BasePopUp-main {
      bottom: 0;

      transform: translateY(100%);
    }
  }

  &.is-left .c-BasePopUp-main,
  &.is-right .c-BasePopUp-main {
    top: 0;
    bottom: 0;

    max-width: 80%;
    height: 100%;
  }

  &.is-right {
    .c-BasePopUp-main {
      right: 0;

      transform: translateX(100%);
    }
  }

  &.is-left {
    .c-BasePopUp-main {
      top: 0;

      transform: translateX(-100%);
    }
  }

  &-main {
    position: absolute;

    overflow-x: hidden;
    overflow-y: auto;

    transition: transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);

    will-change: transform;
  }
}
</style>
