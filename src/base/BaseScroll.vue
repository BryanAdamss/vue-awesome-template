<template>
  <div
    ref="wrapper"
    class="c-BaseScroll"
  >
    <div class="c-BaseScroll-main">
      <!-- 滚动列表 -->
      <div class="c-BaseScroll-list">
        <slot />
      </div>
      <!-- 滚动列表 end -->
      <!-- 上拉加载容器 -->
      <div
        v-if="pullUpLoad"
        class="c-BaseScroll-pullup"
      >
        <div class="c-PullUp">
          <div
            v-show="pullUpOptions.isPullUpLoading"
            class="c-PullUp-spinner"
          >
            <BaseLoadingSpinner />
          </div>
          <div
            v-show="!pullUpOptions.isPullUpLoading"
            class="c-PullUp-text"
          >
            {{ pullUpOptions.noMoreData ? pullUpNoMoreDataText : pullUpText }}
          </div>
        </div>
      </div>
      <!-- 上拉加载容器 end -->
    </div>
    <!-- 下拉刷新容器 -->
    <div
      v-if="pullDownRefresh"
      ref="pulldown"
      class="c-BaseScroll-pulldown"
    >
      <div class="c-PullDown">
        <div
          v-show="pullDownOptions.isPullingDown"
          class="c-PullDown-spinner"
        >
          <BaseLoadingSpinner
            size="32"
          />
        </div>
        <div
          v-show="!pullDownOptions.isPullingDown"
          :class="{'is-overPullDown':pullDownOptions.isOverPullDown}"
          class="c-PullDown-text"
        >
          {{ pullDownOptions.isOverPullDown ? pullDownReleaseText : pullingDownText }}
        </div>
      </div>
    </div>
    <!-- 下拉刷新容器 end -->
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import BaseLoadingSpinner from 'Base/BaseLoadingSpinner'

/**
 * @description 基础滚动组件
 */
export default {
  name: 'BaseScroll',
  components: {
    BaseLoadingSpinner
  },
  props: {
    // * ---------默认配置参数---------
    // * 是否启用模拟纵轴滚动(默认纵轴滚动)
    scrollY: {
      type: Boolean,
      default: true
    },
    // * 是否启用模拟横轴滚动
    scrollX: {
      type: Boolean,
      default: false
    },
    // * 如何派发scroll事件(0默认值，不派发；1屏幕滑动超过一定时间后派发(需要按住滚动一端时间才派发，轻拂时不会派发)；2实时派发；3实时派发，而且在缓动时也派发)
    probeType: {
      type: Number,
      default: 1
    },
    // * 是否主动派发点击事件
    click: {
      type: Boolean,
      default: true
    },
    // * 是否自动检测scroller内部DOM变化并自动调用 refresh 方法
    observeDOM: {
      type: Boolean,
      default: true
    },
    // * 是否阻止事件冒泡。多用在嵌套 scroll 的场景。
    stopPropagation: {
      type: Boolean,
      default: false
    },
    // * 是否开启下拉刷新
    pullDownRefresh: {
      type: [Boolean, Object],
      default: false
    },
    // * 是否开启上拉加载
    pullUpLoad: {
      type: [Boolean, Object],
      default: false
    },
    // * 是否保留原生滚动(默认不保留，使用模拟滚动)
    // 'vertical', 'horizontal',false
    keepNativeScrollDirection: {
      type: [Boolean, String],
      default: false
    },

    // * ---------是否派发相应事件的配置---------
    // * 是否监听beforeScroll事件
    listenBeforeScroll: {
      type: Boolean,
      default: false
    },
    // * 是否监听滚动事件
    listenScroll: {
      type: Boolean,
      default: false
    },
    // * 是否监听滚动到底部事件
    listenScrollToBottom: {
      type: Boolean,
      default: false
    },
    // * 是否监听滚动结束
    listenScrollEnd: {
      type: Boolean,
      default: false
    },
    // * 是否监听刷新结束事件
    listenRefreshEnd: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // * ---------下拉刷新相关配置参数---------
      pullDownOptions: {
        // * 触发pullingDown事件中
        isPullingDown: false,
        // * 是否超过下拉刷新的阈值
        isOverPullDown: false,
        // * pullDown容器返回动画是否结束
        isAfterPullDownAnimationEnd: true
      },
      // * ---------上拉加载相关配置参数---------
      pullUpOptions: {
        // * 触发上拉记载事件中
        isPullUpLoading: false,
        // * 是否有更多数据
        noMoreData: false
      }
    }
  },
  computed: {
    pullingDownText() {
      const { text: pullingDownText } = this.pullDownRefresh
      return pullingDownText || '下拉刷新'
    },
    pullDownReleaseText() {
      const { text: pullDownReleaseText } = this.pullDownRefresh
      return pullDownReleaseText || '释放更新'
    },
    pullUpNoMoreDataText() {
      const { text: noMoreDataText } = this.pullUpLoad
      return noMoreDataText || '暂无更多数据'
    },
    pullUpText() {
      const { text: pullUpText } = this.pullUpLoad
      return pullUpText || '上拉加载更多'
    }
  },
  created() {
    // * 下拉刷新的回弹停留的距离（stop）
    this.pullDownStop =
      this.pullDownRefresh && this.pullDownRefresh.stop
        ? this.pullDownRefresh.stop
        : 40
    // * 触发下拉的距离阈值（threshold）
    this.pullDownThreshold =
      this.pullDownRefresh && this.pullDownRefresh.threshold
        ? this.pullDownRefresh.threshold
        : 90
  },
  mounted() {
    const timer = setTimeout(() => {
      this._initScroll()
    }, 20)

    this.$once('hook:beforeDestroy', () => {
      clearTimeout(timer)
    })
  },
  destroyed() {
    this.$refs.scroll && this.$refs.scroll.destroy()
  },
  methods: {
    // * ---------代理相应方法---------
    // * 启用
    enable() {
      this.scroll && this.enable()
    },
    // * 禁用
    disable() {
      this.scroll && this.disable()
    },
    // * 刷新
    refresh() {
      console.log('BaseScroll', 'refresh')
      this.scroll && this.scroll.refresh()
    },
    // * 滚动到指定位置
    scrollTo() {
      this.scroll && this.scroll.scrollTo(...arguments)
    },
    // * 相对当前位置偏移滚动
    scrollBy() {
      this.scroll && this.scroll.scrollBy(...arguments)
    },
    // * 滚动到指定元素
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement(...arguments)
    },
    // * 立即停止滚动
    stop() {
      this.scroll && this.scroll.stop()
    },
    // * 销毁当前滚动实例
    destroy() {
      this.scroll && this.scroll.destroy()
    },
    // * 下拉刷新结束，需要外部调用finishPullDown告知better-scroll
    pullDownEnd() {
      this.scroll && this.scroll.finishPullDown()

      const pullDownDomEl = this.$refs.pulldown
      const pullDownOptions = this.pullDownOptions

      // * 重设下拉相关参数
      pullDownOptions.isPullingDown = false
      pullDownOptions.isAfterPullDownAnimationEnd = false

      // * 设置过渡效果
      pullDownDomEl.style.transition = 'top 0.3s'

      pullDownDomEl.style.top = `${-this.pullDownStop}px`

      // * 监听下拉容器返回动画结束
      pullDownDomEl.addEventListener(
        'transitionend',
        this._onPullDownTransitionEnd
      )
      // * 兼容写法
      pullDownDomEl.addEventListener(
        'webkitTransitionEnd',
        this._onPullDownTransitionEnd
      )
    },
    // * 上拉加载结束，需要外部调用finishPullUp告知better-scroll
    pullUpEnd({ noMoreData = false }) {
      this.scroll && this.scroll.finishPullUp()
      this.pullUpOptions.isPullUpLoading = false
      this.pullUpOptions.noMoreData = noMoreData
      // * 存在上拉结束，DOM还未刷新用户又再次上拉导致上拉位置出现问题
      // * 上拉结束时，等待DOM刷新后，主动刷新better-scroll；
      setTimeout(() => {
        this.refresh()
      }, 20)
    },
    // * 初始化滚动实例
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }

      // * 销毁之前实例
      this.scroll && this.scroll.destroy()

      const options = {
        scrollY: this.scrollY,
        scrollX: this.scrollX,
        probeType: this.probeType,
        click: this.click,
        observeDOM: this.observeDOM,
        stopPropagation: this.stopPropagation,
        pullDownRefresh: this.pullDownRefresh,
        pullUpLoad:
          typeof this.pullUpLoad === 'boolean'
            ? { threshold: 40 }
            : this.pullUpLoad,
        eventPassthrough: this.keepNativeScrollDirection
      }

      // * 创建一个新scroll实例
      this.scroll = new BScroll(this.$refs.wrapper, options)

      // * ---------派发相应事件---------
      // * 派发beforeScroll事件
      if (this.listenBeforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }

      // * 派发滚动事件
      if (this.listenScroll) {
        this.scroll.on('scroll', pos => {
          this.$emit('scroll', pos)
        })
      }

      // * 派发滚动到底部事件
      if (this.listenScrollToBottom) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit('scrollToBottom')
          }
        })
      }

      // * 派发滚动结束事件
      if (this.listenScrollEnd) {
        this.scroll.on('scrollEnd', pos => {
          this.$emit('scrollEnd', pos)
        })
      }

      // * 派发刷新结束事件
      if (this.listenRefreshEnd) {
        this.scroll.on('refresh', () => {
          this.$emit('refreshEnd')
        })
      }

      // * 下拉刷新初始化
      if (this.pullDownRefresh) {
        this._initPullDownRefresh()
      }

      // * 上拉加载初始化
      if (this.pullUpLoad) {
        this._initPullUpLoad()
      }
    },
    // * 初始化下拉刷新
    _initPullDownRefresh() {
      // * 设置下拉容器高度
      this.$refs.pulldown.style.height = `${this.pullDownStop}px`

      // * 绑定下拉刷新时滚动处理函数
      this.scroll.on('scroll', this._onPullDownScroll)

      // * 触发pullingDown
      this.scroll.on('pullingDown', () => {
        this.pullDownOptions.isPullingDown = true
        // * 解绑
        this.scroll.off('scroll', this._onPullDownScroll)
        this.$emit('pullingDown')
      })
    },
    // * 初始化上拉加载
    _initPullUpLoad() {
      if (this.pullUpOptions.isPullUpLoading) {
        return
      }

      this.scroll.on('pullingUp', () => {
        this.pullUpOptions.isPullUpLoading = true
        this.$emit('pullingUp')
      })
    },
    // * 下拉刷新时的滚动处理函数
    _onPullDownScroll(pos) {
      // * 非下拉刷新、下拉加载中、下拉容器返回动画未结束时的滚动都不做处理
      if (
        !this.pullDownRefresh ||
        this.pullDownOptions.isPullingDown ||
        !this.pullDownOptions.isAfterPullDownAnimationEnd
      ) {
        return
      }

      // * 下拉时
      if (pos.y >= 0) {
        this.$refs.pulldown.style.top = `${Math.min(
          pos.y - this.pullDownStop,
          0
        )}px`

        // * 是否过度下拉
        this.pullDownOptions.isOverPullDown = pos.y > this.pullDownThreshold
      } else {
        this.$refs.pulldown.style.top = `${-this.pullDownStop}px`
      }
    },
    // * 过渡动画结束处理函数
    _onPullDownTransitionEnd() {
      const pullDownDomEl = this.$refs.pulldown
      const pullDownOptions = this.pullDownOptions

      pullDownDomEl.style.transition = 'unset'
      pullDownOptions.isAfterPullDownAnimationEnd = true

      // * 由于启用下拉刷新后，probeType变为3，导致下拉容器transition动画结束时，仍在触发scroll事件
      // * 影响下拉容器的收回动画的展示(下拉容器transtion动画结束后会出现跳动)
      // * 所以需要监听滚动结束事件，在滚动结束时重新绑定滚动事件
      this.scroll.on('scrollEnd', this._onPullDownScrollEnd)

      // * 移除过渡动画监听
      pullDownDomEl.removeEventListener(
        'transitionend',
        this._onPullDownTransitionEnd
      )
      // * 兼容写法
      pullDownDomEl.removeEventListener(
        'webkitTransitionEnd',
        this._onPullDownTransitionEnd
      )
    },
    // * 监听下拉容器回弹动画时的scrollEnd
    _onPullDownScrollEnd() {
      // * 非下拉刷新、下拉加载中、下拉容器返回动画未结束时的滚动结束事件都不做处理
      if (
        !this.pullDownRefresh ||
        this.pullDownOptions.isPullingDown ||
        !this.pullDownOptions.isAfterPullDownAnimationEnd
      ) {
        return
      }

      // * 重新绑定下拉刷新时的滚动处理函数
      this.scroll.on('scroll', this._onPullDownScroll)

      // * 移除scrollEnd监听
      this.scroll.off('scrollEnd', this._onPullDownScrollEnd)
    }
  }
}
</script>

<style scoped>
.c-BaseScroll {
  position: relative;

  height: 100%;
  overflow: hidden;
}

.c-BaseScroll-pulldown {
  position: absolute;
  top: -40px;
  right: 0;
  left: 0;

  transform: translateZ(0);

  will-change: top;
}
.c-PullDown {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  color: #333;
  font-size: 16px;

  background: #eee;
}
.c-PullDown-spinner {
  font-size: 0;
  text-align: center;
}

.c-PullDown-text::before {
  display: inline-block;
  height: 1em;

  line-height: 1em;

  transform-origin: center;

  transition: transform 0.3s;

  content: '⇣';
  will-change: transform;
}
.c-PullDown-text.is-overPullDown::before {
  transform: rotate(180deg);
}
.c-PullUp {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
