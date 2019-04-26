<template>
  <div
    v-show="isReady"
    class="c-BaseSwiper"
  >
    <div
      ref="wp"
      :style="{'padding-left':paddingLeftStyle}"
      class="c-BaseSwiper-wp"
      @touchstart.capture="$_onTouchstartHandler"
    >
      <BaseSwiperSlide
        v-for="slide in activeSlides"
        :key="slide.id"
        :style="{width:`${elW}px`}"
      >
        <slot :slide="slide" />
      </BaseSwiperSlide>
    </div>
  </div>
</template>

<script>
/**
 * * Swiper
 * * @author ghchu
 * * @description 通用swiper组件
 */

import BaseSwiperSlide from './BaseSwiperSlide'

export default {
  name: 'Swiper',
  components: {
    BaseSwiperSlide
  },
  props: {
    slides: {
      type: Array,
      required: true
    },
    prerenderSlideNum: {
      type: Number,
      default: 2
    },
    width: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      cur: 0,
      elW: 0,
      isReady: false
    }
  },
  computed: {
    paddingLeftStyle() {
      return `${this.activeSlidesStart * this.elW}px`
    },
    activeSlidesStart() {
      return Math.max(this.cur - this.prerenderSlideNum, 0)
    },
    activeSlidesEnd() {
      return Math.min(this.cur + this.prerenderSlideNum + 1, this.slides.length)
    },
    activeSlides() {
      return this.slides.slice(this.activeSlidesStart, this.activeSlidesEnd)
    },
    slideLength() {
      return this.slides.length
    }
  },
  beforeCreate() {
    this.$once('hook:mounted', () => {
      this.$nextTick(() => {
        this.isReady = true
        this.elW = this.width ? this.width : this.$el.parentNode.offsetWidth
        this.$refs.wp.style.width = `${this.elW * this.slides.length}px`
      })
    })

    this.transformPosX = 0
    this.lastTransformPosX = 0

    this.threshold = 40
  },
  methods: {
    $_onTouchstartHandler(e) {
      const that = this
      const touch = e.changedTouches[0]
      const { pageX: firstPageX, pageY: firstPageY } = touch
      const target = e.currentTarget

      target.removeEventListener('transitionend', transitionendHandler)

      let direction = -1 // 方向 1横向 0竖向 -1为默认值
      let scheduledAnimationFrame = false

      function onTouchmoveHandler(e) {
        const touch = e.changedTouches[0]
        const { pageX: movePageX, pageY: movePageY } = touch

        if (direction === -1) {
          direction =
            Math.abs(movePageX - firstPageX) > Math.abs(movePageY - firstPageY)
              ? 1
              : 0
        }

        // eslint-disable-next-line
        if (direction === 0 || scheduledAnimationFrame) return // 忽略竖向

        const offset = movePageX - firstPageX

        that.transformPosX = that.lastTransformPosX + offset

        scheduledAnimationFrame = true
        target.style.transition = ''
        window.requestAnimationFrame(() => {
          scheduledAnimationFrame = false
          target.style.transform = `translate3d(${that.transformPosX}px,0,0)`
        })
      }

      function removeAllHandler() {
        target.removeEventListener('touchmove', onTouchmoveHandler)
        target.removeEventListener('touchend', onTouchendHandler)
        target.removeEventListener('touchcancel', onTouchcancelHandler)
      }

      function onTouchendHandler(e) {
        const touch = e.changedTouches[0]
        const { pageX: lastPageX } = touch
        const offset = lastPageX - firstPageX

        if (offset === 0) {
          return
        } else if (offset > 0) {
          // * 手指向右移动
          if (that.cur === 0) {
            // * 置为0
            moveAnimation(that.transformPosX, 0)
            that.transformPosX = that.lastTransformPosX = 0
          } else {
            if (Math.abs(offset) >= that.threshold) {
              // * 上一页
              const newPosX = that.lastTransformPosX + that.elW
              moveAnimation(that.transformPosX, newPosX)
              that.lastTransformPosX = that.transformPosX = newPosX

              setTimeout(() => {
                that.cur--
              }, 0)
            } else {
              // * 回到本页
              moveAnimation(that.transformPosX, that.lastTransformPosX)
              that.transformPosX = that.lastTransformPosX
            }
          }
        } else {
          // * 手指向左移动
          if (that.cur === that.slideLength - 1) {
            // * 置为最大值
            const maxPosX = -(that.elW * (that.slideLength - 1))
            moveAnimation(that.transformPosX, maxPosX)
            that.transformPosX = that.lastTransformPosX = maxPosX
          } else {
            // * 下一页
            if (Math.abs(offset) >= that.threshold) {
              const newPosX = that.lastTransformPosX - that.elW
              moveAnimation(that.transformPosX, newPosX)
              that.transformPosX = that.lastTransformPosX = newPosX

              setTimeout(() => {
                that.cur++
              }, 0)
            } else {
              // * 回到本页
              moveAnimation(that.transformPosX, that.lastTransformPosX)
              that.transformPosX = that.lastTransformPosX
            }
          }
        }

        removeAllHandler()
      }

      function onTouchcancelHandler(e) {
        removeAllHandler()
      }

      function transitionendHandler() {
        target.style.transition = ''
        target.removeEventListener('transitionend', transitionendHandler)
      }

      function moveAnimation(moveStart, moveEnd) {
        if (moveStart - moveEnd === 0) return
        target.style.transition = 'transform .3s ease-out'
        setTimeout(() => {
          target.style.transform = `translate3d(${moveEnd}px,0,0)`
        }, 20)
        target.addEventListener('transitionend', transitionendHandler)
      }

      target.addEventListener('touchmove', onTouchmoveHandler)
      target.addEventListener('touchend', onTouchendHandler)
      target.addEventListener('touchcancel', onTouchcancelHandler)
    }
  }
}
</script>

<style lang="scss" scoped>
.c-BaseSwiper {
  position: relative;
  z-index: 1;
  overflow: hidden;
  &-wp {
    overflow: hidden;
    height: 100%;
    @include clearfix();
    will-change: transform;
  }
}
</style>
