<template>
  <div
    ref="main"
    class="c-BaseScrollbar">

    <div
      ref="bd"
      :style="{
        width: `${bdW}px`,
        height:`${bdH}px`
      }"
      class="c-BaseScrollbar-bd"
      @scroll="scrollHandler">
      <slot/>
    </div>

    <div
      ref="horizontalTrack"
      class="c-BaseScrollbar-scroller is-horizontal"
      @mousedown="clickTrackHandler($event,'h')">

      <div
        ref="horizontalThumb"
        :style="{width:horizontalThumbW,transform:`translateX(${moveX}%)`}"
        class="c-BaseScrollbar-thumb"
        @mousedown="clickThumbHandler($event,'h')"/>
    </div>

    <div
      ref="verticalTrack"
      class="c-BaseScrollbar-scroller is-vertical"
      @mousedown="clickTrackHandler($event)">

      <div
        ref="verticalThumb"
        :style="{height:verticalThumbH,transform:`translateY(${moveY}%)`}"
        class="c-BaseScrollbar-thumb"
        @mousedown="clickThumbHandler($event)"/>
    </div>
  </div>
</template>

<script>
/**
 * * BaseScrollbar
 * * 模拟滚动条
 */

import getScrollbarWidth from 'Common/js/scrollbar-width'

export default {
  name: 'BaseScrollbar',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      mainW: 0,
      mainH: 0,
      scrollbarW: 0,
      viewW: 0,
      viewH: 0,
      moveX: 0,
      moveY: 0
    }
  },
  computed: {
    bdW() {
      return this.mainW + this.scrollbarW
    },
    bdH() {
      return this.mainH + this.scrollbarW
    },
    horizontalThumbW() {
      return this.mainW / this.viewW * 100 + '%'
    },
    verticalThumbH() {
      return this.mainH / this.viewH * 100 + '%'
    }
  },
  mounted() {
    this.scrollbarW = getScrollbarWidth()

    const {width, height} = this.$refs.main.getBoundingClientRect()
    this.mainW = width
    this.mainH = height

    this.viewW = this.$refs.bd.scrollWidth
    this.viewH = this.$refs.bd.scrollHeight
  },
  methods: {
    scrollHandler() {
      const {scrollLeft, scrollTop} = this.$refs.bd

      this.moveY = ((scrollTop * 100) / this.mainH)
      this.moveX = ((scrollLeft * 100) / this.mainW)
    },
    clickThumbHandler(e, dir) {
      if (e.ctrlKey || e.button === 2) {
        return
      }

      this.startDrag(e, dir)

      if (dir) {
        // 水平方向
        this.X = (e.currentTarget.offsetWidth - (e.clientX - e.currentTarget.getBoundingClientRect().left))
      } else {
        // 垂直方向
        this.Y = (e.currentTarget.offsetHeight - (e.clientY - e.currentTarget.getBoundingClientRect().top))
      }
    },
    clickTrackHandler(e, dir) {
      if (dir) {
        // 点击水平轨道
        const offset = Math.abs(e.target.getBoundingClientRect().left - e.clientX)

        const thumbHalf = this.$refs.horizontalThumb.offsetWidth / 2
        const thumbPositionPercentage = ((offset - thumbHalf) * 100 / this.$refs.main.offsetWidth)

        this.$refs.bd.scrollLeft = (thumbPositionPercentage * this.$refs.bd.scrollWidth / 100)
      } else {
        // 点击垂直轨道
        const offset = Math.abs(e.target.getBoundingClientRect().top - e.clientY)

        const thumbHalf = this.$refs.verticalThumb.offsetHeight / 2
        const thumbPositionPercentage = ((offset - thumbHalf) * 100 / this.$refs.main.offsetHeight)

        this.$refs.bd.scrollTop = (thumbPositionPercentage * this.$refs.bd.scrollHeight / 100)
      }
    },
    startDrag(e, dir) {
      e.stopImmediatePropagation()
      this.cursorDown = true

      if (dir) {
        // 水平
        document.addEventListener('mousemove', this.horizontalMouseMoveDocumentHandler, false)
        document.addEventListener('mouseup', this.horizontalMouseUpDocumentHandler, false)
      } else {
        // 垂直
        document.addEventListener('mousemove', this.verticalMouseMoveDocumentHandler, false)
        document.addEventListener('mouseup', this.verticalMouseUpDocumentHandler, false)
      }
      document.onselectstart = () => false
    },
    horizontalMouseMoveDocumentHandler(e) {
      if (this.cursorDown === false) return
      const prevPage = this.X

      if (!prevPage) return

      const offset = ((this.$refs.horizontalTrack.getBoundingClientRect().left - e.clientX) * -1)
      const thumbClickPosition = (this.$refs.horizontalThumb.offsetWidth - prevPage)
      const thumbPositionPercentage = ((offset - thumbClickPosition) * 100 / this.$refs.horizontalTrack.offsetWidth)

      this.$refs.bd.scrollLeft = (thumbPositionPercentage * this.$refs.bd.scrollWidth / 100)
    },
    horizontalMouseUpDocumentHandler(e) {
      this.cursorDown = false
      this.X = 0

      document.removeEventListener('mousemove', this.horizontalMouseMoveDocumentHandler, false)

      document.onselectstart = null
    },
    verticalMouseMoveDocumentHandler(e) {
      if (this.cursorDown === false) return
      const prevPage = this.Y

      if (!prevPage) return

      const offset = ((this.$refs.verticalTrack.getBoundingClientRect().top - e.clientY) * -1)
      const thumbClickPosition = (this.$refs.verticalThumb.offsetHeight - prevPage)
      const thumbPositionPercentage = ((offset - thumbClickPosition) * 100 / this.$refs.verticalTrack.offsetHeight)

      this.$refs.bd.scrollTop = (thumbPositionPercentage * this.$refs.bd.scrollHeight / 100)
    },

    verticalMouseUpDocumentHandler(e) {
      this.cursorDown = false
      this.Y = 0

      document.removeEventListener('mousemove', this.verticalMouseMoveDocumentHandler, false)

      document.onselectstart = null
    }
  }
}
</script>

<style lang="scss" scoped>
.c-BaseScrollbar {
  width: 100%;
  height: 100%;
  overflow: hidden;

  position: relative;

  &:hover {
    .c-BaseScrollbar-thumb {
      opacity: 1;
    }
  }
  &-bd {
    overflow: auto;
    background-color: #eee;
  }

  &-scroller {
    position: absolute;
    font-size: 0;
    &.is-horizontal {
      left: 2px;
      right: 2px;
      bottom: 2px;

      height: 6px;
      .c-BaseScrollbar-thumb {
        height: 100%;
      }
    }
    &.is-vertical {
      top: 2px;
      right: 2px;
      bottom: 2px;

      width: 6px;
      .c-BaseScrollbar-thumb {
        width: 100%;
      }
    }
  }

  &-thumb {
    background-color: rgba(144, 147, 153, 0.5);
    border-radius: 3px;

    opacity: 0;

    will-change: opacity;
    transition: opacity 0.6s;
  }
}
</style>
