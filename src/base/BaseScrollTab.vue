<template>
  <div
    ref="gallery"
    class="c-BaseScrollTab">

    <div
      ref="track"
      class="c-BaseScrollTab-track">

      <div
        ref="wp"
        :style="{transform : `translateX(${offset}px)` }"
        class="c-BaseScrollTab-wp">

        <!-- item -->
        <div
          v-for="(item,index) in formatedDataList"
          :key="index"
          :class="{'is-active':index === curIndex}"
          class="c-BaseScrollTab-item"
          @click="clickHandler(index,item)">

          <slot v-bind="{item,index}">
            <div
              :title="item.text"
              class="c-BaseScrollTab-text"
              v-text="item.text"/>
          </slot>

        </div>
        <!-- item end -->

      </div>

    </div>

    <!-- prev btn -->
    <div
      v-if="showBtn"
      :class="{'is-disabled':isPrevDisabled}"
      class="c-BaseScrollTab-btn is-prev"
      title="上一页"
      @click="movePage(1)">

      <slot name="prev">
        <div class="icon">&#x276e;</div>
      </slot>

    </div>
    <!-- prev btn end -->

    <!-- next btn -->
    <div
      v-if="showBtn"
      :class="{'is-disabled':isNextDisabled}"
      class="c-BaseScrollTab-btn is-next"
      title="下一页"
      @click="movePage(-1)">
      <slot name="next">
        <div class="icon">&#x276f;</div>
      </slot>
    </div>
    <!-- next btn end -->

  </div>
</template>

<script>
/**
 * * BaseScrollTab
 * * 支持滚动的tab
 */

export default {
  name: 'BaseScrollTab',
  components: {},
  mixins: [],
  props: {
    dataList: {
      type: Array,
      required: true
    },
    activeItemId: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      formatedDataList: [],
      offset: 0, // wp偏移值
      trackW: 0, // 轨道宽度
      totalW: 0, // 所有items总宽度
      curIndex: 0 // 当前索引
    }
  },
  computed: {
    showBtn() {
      return this.totalW > this.trackW
    },
    isPrevDisabled() {
      return this.offset >= 0
    },
    isNextDisabled() {
      return this.offset <= this.rightOffsetLimit
    },
    rightOffsetLimit() {
      return -(this.totalW - this.trackW)
    },
    activeItem() {
      return this.formatedDataList[this.curIndex]
    }
  },
  watch: {
    curIndex(newVal, oldVal) {
      this.moveStep(newVal, oldVal)
    },
    activeItemId(newVal, oldVal) {
      this.initCurIndex(newVal)
    },
    dataList: {
      handler() {
        if (this.activeItemId) this.initCurIndex(this.activeItemId)

        this.formatedDataList = this.getFormatedDataList()

        this.$nextTick(() => {
          if (this.$refs.track && this.$refs.wp && this.$refs.track) {
            this.trackW = this.$refs.track.getBoundingClientRect().width
            this.totalW = this.$refs.wp.scrollWidth
            this.trackL = this.$refs.track.getBoundingClientRect().left
            this.initItemsWidth()
          }
        })
      },
      immediate: true
    }
  },
  beforeCreate() {},
  created() {},
  mounted() {},
  methods: {
    go(steps) {
      let newIndex = this.curIndex + steps

      if (newIndex > this.dataList.length - 1) {
        newIndex = this.dataList.length - 1
      } else if (newIndex < 0) {
        newIndex = 0
      }

      if (this.curIndex === newIndex) return

      this.curIndex = newIndex
    },
    goTo(index) {
      if (index > this.dataList.length - 1) {
        index = this.dataList.length - 1
      } else if (index < 0) {
        index = 0
      }

      if (this.curIndex === index) return

      this.curIndex = index
    },
    // 获取安全offset
    _getSafeOffset(offset) {
      if (offset > 0) return 0
      if (offset < this.rightOffsetLimit) return this.rightOffsetLimit
      return offset
    },
    // 初始化当前index
    initCurIndex(id) {
      const index = this.dataList.findIndex(item => item.stuId === id)
      if (index > -1) this.curIndex = index
    },
    // 按步数位移
    moveStep(end, start) {
      const dir = end - start > 0 ? -1 : 1
      // dir 方向
      // 点击了活动元素右侧元素，dir -1，移动距离为两个元素间距离
      // 点击了活动元素左侧元素，dir 1，移动距离为两个元素间距离
      const distance = Math.abs(this.formatedDataList[end]._left - this.formatedDataList[start]._left)

      this.move(dir, distance)
    },
    // 按页位移
    movePage(dir) {
      // 点击next，dir -1，移动距离为trackW
      // 点击prev，dir 1，移动距离为trackW
      this.move(dir, this.trackW)
    },
    // 位移
    move(dir, distance) {
      // dir -1，wp左移，translateX--，最小 rightOffsetLimit
      // dir 1，wp右移，translateX++，最大 0
      dir = dir >= 0 ? 1 : -1
      this.offset = this._getSafeOffset(this.offset + dir * distance)
    },
    // 格式化dataList，添加_left
    getFormatedDataList() {
      return this.dataList.map(item => ({ ...item, _left: 0 }))
    },
    // 处理点击事件
    clickHandler(index, item) {
      this.$emit('click', index, item)
      if (this.curIndex === index) return

      const oldIndex = this.curIndex
      const oldItem = this.formatedDataList[oldIndex]

      this.curIndex = index
      this.$emit('change', index, oldIndex, item, oldItem)
    },
    // 初始化每个item的_left
    initItemsWidth() {
      Array.from(this.$refs.wp.children).forEach((item, index) => {
        const target = this.formatedDataList[index]
        target._left = item.offsetLeft
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.c-BaseScrollTab {
  overflow: hidden;
  padding-left: 30px;
  padding-right: 30px;

  position: relative;

  &.no-btn {
    padding-left: 0;
    padding-right: 0;
  }

  &-track {
    overflow: hidden;
    position: relative;
  }

  &-wp {
    will-change: transform;
    white-space: nowrap;
    transition: transform 0.5s;
    font-size: 0;
  }

  &-text {
    max-width: 86px;
    padding: 16px;
    font-size: 16px;
    color: $mainTextColor;
    cursor: pointer;
    text-align: center;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      background-color: $mainTone;
      height: 3px;
      left: 50%;
      right: 50%;

      transition: left 0.3s, right 0.3s;
      will-change: left, right;
    }

    &:hover {
      color: $mainTone;
    }
  }

  &-item {
    position: relative;
    @include inline-block(middle);

    font-size: 14px;
    transition: color 0.3s;

    &.is-active {
      .c-BaseScrollTab-text {
        color: $mainTone;
      }

      .c-BaseScrollTab-text::after {
        left: 0;
        right: 0;
      }
    }
  }

  &-btn {
    cursor: pointer;

    position: absolute;
    top: 50%;
    transition: transform 0.3s;

    &.is-prev {
      left: 2px;
      transform: translate3d(0, -50%, 0);

      &:hover {
        transform: translate3d(-2px, -50%, 0);
      }
    }

    &.is-next {
      right: 2px;
      transform: translate3d(-2px, -50%, 0);

      &:hover {
        transform: translate3d(0, -50%, 0);
      }
    }

    &.is-disabled {
      color: $subTextColor;
      cursor: not-allowed;
    }

    .icon {
      font-size: 14px;
      color: $mainTextColor;
    }
  }
}
</style>
