<template>
  <div
    ref="modal"
    :class="[positionClass,{'has-shadow':hasShadow},{'is-visible':isCanVisible}]"
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
    emitVisibleChangeEvent: {
      // * 是否派发visibleChange事件
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
    }
  },
  data() {
    return {
      isCanVisible: false
    }
  },
  computed: {
    positionClass() {
      const index = POSITIONS.indexOf(this.position)
      let name = index > -1 ? POSITIONS[index] : 'center'
      return `is-${name}`
    }
  },
  created() {
    if (this.emitVisibleChangeEvent) {
      // * 手动添加观测
      let unwatch = this.$watch('isCanVisible', (newVal, oldVal) => {
        this.$emit('onVisibleChange', newVal, oldVal)
      })
      // * 销毁时，取消观测
      this.$once('hook:beforeDestroy', () => {
        unwatch()
      })
    }
  },
  methods: {
    open() {
      this.isCanVisible = true
    },
    close() {
      this.isCanVisible = false
    },
    onShadowClick(e) {
      // * 点击阴影
      const modal = this.$refs.modal
      const target = e.target
      // * 不是点击阴影或者不需要派发阴影点击事件时直接返回
      if (modal !== target || !this.emitShadowClickEvent) {
        return
      }

      if (this.shadowClose) {
        this.close()
      }

      this.$emit('onShadowClick', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.c-BasePopUp {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
