<template>
  <div
    ref="modal"
    :class="[positionClass,{'has-shadow':hasShadow},{'is-visible':isShow}]"
    class="c-BasePopUp"
    @click.stop="onShadowClick"
  >
    <div class="c-BasePopUp-main">
      <slot>
        BasePopUp
      </slot>
    </div>
  </div>
</template>

<script>
/**
 * * BasePopUp
 */

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
    }
  },

  computed: {
    positionClass() {
      const index = POSITIONS.indexOf(this.position)
      const name = index > -1 ? POSITIONS[index] : 'center'
      return `is-${name}`
    }
  },
  activated() {
    this._addWatch()
  },
  created() {
    this._addWatch()
  },
  methods: {
    _addWatch() {
      // * 手动添加观测
      const unwatch = this.$watch('isShow', (newVal, oldVal) => {
        this._toggleBodyHidden(newVal)
        this.$emit('update:isShow', newVal)
      }, {
        immediate: true
      })

      // * 销毁时，取消观测
      this.$once('hook:beforeDestroy', () => {
        this._toggleBodyHidden(false)
        unwatch()
      })
    },
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

      this.emitShadowClickEvent && this.$emit('onShadowClick', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.c-BasePopUp {
  position: fixed;
  top: 0;
  left: 0;

  &.has-shadow {
    @include bgAlpha();
  }
  // * 屏蔽事件
  pointer-events: none;
  opacity: 0;
  // * 设置关闭时的过渡
  transition: opacity 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
  // * 开启加速
  will-change: opacity;

  // * 展示时相关样式
  &.is-visible {
    width: 100%;
    height: 100%;
    z-index: 999;

    pointer-events: auto;
    opacity: 1;
    transition: opacity 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);

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
      transform: translate3d(-50%, -50%, 0);
      max-width: 80%;
      max-height: 80%;
    }
  }

  &.is-top .c-BasePopUp-main,
  &.is-bottom .c-BasePopUp-main {
    left: 0;
    right: 0;
    max-height: 80%;
    width: 100%;
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
    height: 100%;
    max-width: 80%;
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
    will-change: transform;
    transition: transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
  }
}
</style>
