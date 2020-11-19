<template>
  <div class="c-BaseRange">
    <div ref="wp" class="c-BaseRange-bd">
      <div class="c-BaseRange-track" :style="trackStyle"></div>
      <div
        ref="thumb"
        class="c-BaseRange-thumb"
        :style="thumbStyle"
        @mousedown.stop="handleStart"
        @touchstart.stop="handleStart"
      ></div>
    </div>
  </div>
</template>

<script>
/**
 * * BaseRange
 */

// const BAR_WIDTH = 16

const NOT_NAN = val => !isNaN(Number(val))

export default {
  name: 'BaseRange',
  components: {},
  mixins: [],
  props: {
    min: {
      type: [Number, String],
      validate: NOT_NAN,
      default: 0
    },
    max: {
      type: [Number, String],
      validate: NOT_NAN,
      default: 100
    },
    value: {
      type: [Number, String],
      validate: NOT_NAN,
      default: 0
    }
  },
  data() {
    return {
      wpW: 0
    }
  },
  computed: {
    rate() {
      return this.value / (this.max - this.min)
    },
    percentage() {
      return this.rate * 100
    },
    thumbStyle() {
      return {
        left: `${isNaN(this.percentage) ? 0 : this.percentage}%`
      }
    },
    trackStyle() {
      return {
        width: `${isNaN(this.percentage) ? 0 : this.percentage}%`
      }
    }
  },
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {
    const { width } = this.$refs.wp.getBoundingClientRect()
    this.wpW = width
  },
  methods: {
    /**
     * 处理拖动
     */
    handleStart(e) {
      const lastPageX = e.pageX || e.changedTouches[0].pageX
      const lastThumbPos = this.rate * this.wpW

      const barMousemoveHandler = e => {
        e.preventDefault()
        const disX = (e.pageX || e.changedTouches[0].pageX) - lastPageX
        const newPos = lastThumbPos + disX
        const rate = newPos / this.wpW

        const value = rate * (this.max - this.min)

        this.$emit('update:value', value)
      }
      const barMouseupHandler = e => {
        e.stopPropagation()

        document.removeEventListener('mousemove', barMousemoveHandler, {
          passive: false
        })
        document.removeEventListener('mouseup', barMouseupHandler, {
          passive: false
        })
        document.removeEventListener('touchmove', barMousemoveHandler, {
          passive: false
        })
        document.removeEventListener('touchend', barMouseupHandler, {
          passive: false
        })
      }

      document.addEventListener('mousemove', barMousemoveHandler, {
        passive: false
      })
      document.addEventListener('mouseup', barMouseupHandler, {
        passive: false
      })
      document.addEventListener('touchmove', barMousemoveHandler, {
        passive: false
      })
      document.addEventListener('touchend', barMouseupHandler, {
        passive: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.c-BaseRange {
  &-bd {
    position: relative;
    z-index: 1;

    height: 8px;

    background-color: #eee;
    border-radius: 4px;
  }

  &-track {
    height: 100%;

    background-color: #115be4;
    border-radius: 4px;

    will-change: width;
  }

  &-thumb {
    position: absolute;
    top: 50%;
    z-index: 2;

    width: 16px;
    height: 16px;
    margin-top: -8px;
    margin-left: -8px;

    background-color: #fff;
    border: 4px solid #115be4;
    border-radius: 50%;
    cursor: pointer;

    will-change: transform;
  }
}
</style>
