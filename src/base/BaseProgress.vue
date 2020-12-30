<script>
/**
 * * BaseProgress
 */

export default {
  name: 'BaseProgress',
  props: {
    progress: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    }
  },
  render(h) {
    return h('div', {
      class: 'c-BaseProgress',
      style: { width: `${(this.progress / this.max) * 100}%` },
      on: {
        transitionend: () => {
          this.$emit('progress-transition-end')
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.c-BaseProgress {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;

  width: 0;
  height: 2px;

  background: linear-gradient(-45deg, #368fff, #05c1ae);
  background-size: 400% 100%;

  transition: width ease-in-out 0.5s;

  animation: gradient 1s ease-in-out infinite normal;

  will-change: width;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
