<template>
  <div
    ref="modal"
    :class="{'is-visible':isCanVisible}"
    class="c-BaseModal"
    @click.stop="onShadowClick"
  >
    <div class="c-BaseModal-main">
      <slot>
        BaseModal
      </slot>
    </div>
  </div>
</template>

<script>
/**
 * * BaseModal
 */

export default {
  name: 'BaseModal',
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
    }
  },
  data() {
    return {
      isCanVisible: false
    }
  },
  created() {
    if (this.emitVisibleChangeEvent) {
      // * 手动添加观测
      const unwatch = this.$watch('isCanVisible', (newVal, oldVal) => {
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
      const modal = this.$refs.modal
      const target = e.target
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
.c-BaseModal {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  transform: scale(1.15);
  opacity: 0;
  // * 设置关闭时的过渡(根据google的用户体验原则，关闭要迅速，要快于开启)
  // * 一般的经验法则为(https://developers.google.com/web/fundamentals/design-and-ux/animations/asymmetric-animation-timing)：
  // * 对于用户交互触发的 UI 动画，例如视图变换或显示元素，采用快速前奏（短持续时间）和慢速结尾（较长持续时间）。
  // * 对于由代码触发的 UI 动画，例如错误或模态视图，采用较慢前奏（较长持续时间）和快速结尾（短持续时间）。
  transition: transform 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946),
    opacity 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946);
  // * 屏蔽事件
  pointer-events: none;
  // * 开启加速
  will-change: transform, opacity;
  @include bg-alpha();
  &.is-visible {

    transform: scale(1);
    opacity: 1;

    transition: transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946),
      opacity 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);

    pointer-events: auto;
  }
  &-main {
    position: absolute;
    top: 50%;
    left: 50%;

    max-width: 80%;
    max-height: 80%;
    overflow-x: hidden;
    overflow-y: auto;

    transform: translate3d(-50%, -50%, 0);
  }
}
</style>
