<template>
  <div class="c-BaseAudio">
    <div class="c-BaseAudio-main">
      <div
        :class="btnClass"
        class="c-Btn"
        @click="togglePlay"
      />

      <template v-if="isSrcArray">
        <audio
          ref="audio"
          class="c-Audio"
          controls
          preload="metadata"
          @abort="abortHandler"
          @canplay="canplayHandler"
          @canplaythrough="canplaythroughHandler"
          @durationchange="durationchangeHandler"
          @emptied="emptiedHandler"
          @ended="endedHandler"
          @error="errorHandler"
          @loadeddata="loadeddataHandler"
          @loadedmetadata="loadedmetadataHandler"
          @loadstart="loadstartHandler"
          @mozaudioavailable="mozaudioavailableHandler"
          @pause="pauseHandler"
          @play="playHandler"
          @playing="playingHandler"
          @progress="progressHandler"
          @ratechange="ratechangeHandler"
          @seeked="seekedHandler"
          @seeking="seekingHandler"
          @stalled="stalledHandler"
          @suspend="suspendHandler"
          @timeupdate="timeupdateHandler"
          @volumechange="volumechangeHandler"
          @waiting="waitingHandler"
        >
          您的浏览器不支持<code>audio</code>标签

          <source
            v-for="(sour, index) in src"
            :key="index"
            :src="sour.src"
            :type="sour.type"
          >
        </audio>
      </template>
      <template v-else>
        <audio
          ref="audio"
          :src="src"
          class="c-Audio"
          controls
          preload="metadata"
          @abort="abortHandler"
          @canplay="canplayHandler"
          @canplaythrough="canplaythroughHandler"
          @durationchange="durationchangeHandler"
          @emptied="emptiedHandler"
          @ended="endedHandler"
          @error="errorHandler"
          @loadeddata="loadeddataHandler"
          @loadedmetadata="loadedmetadataHandler"
          @loadstart="loadstartHandler"
          @mozaudioavailable="mozaudioavailableHandler"
          @pause="pauseHandler"
          @play="playHandler"
          @playing="playingHandler"
          @progress="progressHandler"
          @ratechange="ratechangeHandler"
          @seeked="seekedHandler"
          @seeking="seekingHandler"
          @stalled="stalledHandler"
          @suspend="suspendHandler"
          @timeupdate="timeupdateHandler"
          @volumechange="volumechangeHandler"
          @waiting="waitingHandler"
        >
          您的浏览器不支持<code>audio</code>标签
        </audio>
      </template>
    </div>

    <div
      v-if="showProgress"
      class="c-BaseAudio-sub"
    >
      <div
        ref="progress"
        class="c-Progress"
        @mouseup="progressClickHandler"
      >
        <div
          :style="{ width: `${bufferedProgress}%` }"
          class="c-Track"
        />

        <div
          ref="bar"
          :style="{ left: `${progressLeft}px` }"
          class="c-Bar"
          @mousedown.stop="barMousedownHandler"
        >
          <div
            v-if="isLoading"
            class="c-Bar-loading"
          >
            <BaseLoadingSpinner size="12px" />
          </div>
          <div
            v-else
            class="c-Bar-circle"
          />
        </div>
      </div>
    </div>

    <div
      v-if="showTime"
      class="c-BaseAudio-extra"
    >
      <div class="c-Info">
        {{ curTime | toMMSS }}/{{ duration | toMMSS }}
      </div>
      <!-- TODO:需要完善音量调节 -->
      <!-- <div class="c-Volume">
        <div
          class="c-Volume-main"
          @click="volumeClickHandler">
          音量
        </div>
        <div class="c-Volume-sub">
          调节器
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
/**
 * * BaseAudio
 */

import BaseLoadingSpinner from 'Base/BaseLoadingSpinner'

export default {
  name: 'BaseAudio',
  components: {
    BaseLoadingSpinner
  },
  filters: {
    toMMSS(second) {
      const s = Math.floor(second % 60)
      const m = Math.floor(second / 60)

      return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
    }
  },
  mixins: [],
  props: {
    src: {
      type: [String, Array],
      required: true
    },
    showTime: {
      type: Boolean,
      default: true
    },
    showProgress: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isPlaying: false,
      isLoading: false,
      isPaused: true,
      curTime: 0,
      duration: 0,
      volume: 0,
      buffered: 0,
      progressW: 0,
      progressLeft: 0,
      isBarDraging: false
    }
  },
  computed: {
    isMuted() {
      return this.volume === 0
    },
    btnClass() {
      if (this.isPlaying) {
        return 'is-playing'
      } else {
        return 'is-paused'
      }
    },
    isSrcArray() {
      return Array.isArray(this.src)
    },
    progress() {
      if (!this.curTime || !this.duration) return 0

      return this.curTime / this.duration
    },
    progressLeftLimit() {
      return 0
    },
    progressRightLimit() {
      return this.progressW - this.barW
    },
    bufferedProgress() {
      if (!this.buffered || !this.duration) return 0

      return (this.buffered / this.duration) * 100
    }
  },
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {
    this.volume = this.$refs.audio.volume
    this.progressW = this.$refs.progress.offsetWidth
    this.barW = this.$refs.bar.offsetWidth

    this.$once('hook:beforeDesotryed', () => {
      window.removeEventListener('resize', this.handleResize, false)
    })

    window.addEventListener('resize', this.handleResize, false)
  },
  methods: {
    /**
     * 处理页面resize
     */
    handleResize() {
      this.updateSize()
    },
    /**
     * 更新尺寸
     */
    updateSize() {
      this.progressW = this.$refs.progress.offsetWidth
      this.barW = this.$refs.bar.offsetWidth
    },
    volumeClickHandler(e) {
      this.$refs.audio.muted = !this.$refs.audio.muted
    },
    progressClickHandler(e) {
      this.curTime = (e.offsetX / this.progressW) * this.duration
      this.$refs.audio.currentTime = this.curTime

      if (this.isPaused) this.play()
    },
    play() {
      if (this.isLoading) return

      this.$refs.audio && this.$refs.audio.play()
    },
    pause() {
      if (this.isLoading) return

      this.$refs.audio && this.$refs.audio.pause()
    },
    togglePlay() {
      if (this.isPlaying) {
        this.pause()
      } else {
        this.play()
      }
    },
    barMousedownHandler(e) {
      this.isBarDraging = true
      this.$refs.audio.pause() // 暂停播放

      const lastPageX = e.pageX
      let lastProgressLeft = this.progressLeft

      const barMousemoveHandler = e => {
        e.preventDefault()
        const disX = e.pageX - lastPageX
        const newPos = this._getSafeProgressLeft(this.progressLeft + disX)

        this.$refs.bar.style.left = `${newPos}px`
        lastProgressLeft = newPos
      }
      const barMouseupHandler = e => {
        e.stopPropagation()

        this.progressLeft = lastProgressLeft
        this.curTime = (lastProgressLeft / this.progressW) * this.duration
        this.$refs.audio.currentTime = this.curTime

        if (this.isPaused) this.play()

        this.isBarDraging = false

        document.removeEventListener('mousemove', barMousemoveHandler, true)
        document.removeEventListener('mouseup', barMouseupHandler, true)
      }

      document.addEventListener('mousemove', barMousemoveHandler, true)
      document.addEventListener('mouseup', barMouseupHandler, true)
    },
    _getSafeProgressLeft(left) {
      return Math.max(
        Math.min(left, this.progressRightLimit),
        this.progressLeftLimit
      )
    },
    // 事件处理器
    abortHandler(e) {
      console.log(e.type)
      this.$emit('abort')
    },
    canplayHandler(e) {
      console.log(e.type)
      this.$emit('canplay')
    },
    canplaythroughHandler(e) {
      console.log(e.type)
      this.$emit('canplaythrough')
    },
    durationchangeHandler(e) {
      console.log(e.type)
      this.duration = this.$refs.audio.duration

      this.$emit('durationchange', this.duration)
    },
    emptiedHandler(e) {
      console.log(e.type)
      this.$emit('emptied')
    },
    endedHandler(e) {
      console.log(e.type)
      this.isPlaying = false
      this.isPaused = true
      this.isLoading = false

      this.$emit('ended')
    },
    errorHandler(e) {
      console.log(e.type)
      this.$emit('error')
    },
    loadeddataHandler(e) {
      console.log(e.type)
      this.$emit('loadeddata')
    },
    loadedmetadataHandler(e) {
      console.log(e.type)
      // 更新总时长及缓冲时间
      this.duration = this.$refs.audio.duration
      if (this.$refs.audio.buffered.length !== 0) {
        this.buffered = this.$refs.audio.buffered.end(0)
        this.$emit('loadedmetadata', this.duration, this.bufferedProgress)
      }
    },
    loadstartHandler(e) {
      console.log(e.type)
      this.$emit('loadstart')
    },
    mozaudioavailableHandler(e) {
      console.log(e.type)
      this.$emit('mozaudioavailable')
    },
    pauseHandler(e) {
      console.log(e.type)
      this.isPlaying = false
      this.isPaused = true
      this.isLoading = false

      this.$emit('pause')
    },
    playHandler(e) {
      console.log(e.type)
      this.$emit('play')
    },
    playingHandler(e) {
      console.log(e.type)
      this.isPlaying = true
      this.isPaused = false
      this.isLoading = false

      this.$emit('playing')
    },
    progressHandler(e) {
      console.log(e.type)

      // 更新缓冲时间
      if (this.$refs.audio.buffered.length !== 0) {
        this.buffered = this.$refs.audio.buffered.end(0)
        this.$emit('progress', this.bufferedProgress)
      }
    },
    ratechangeHandler(e) {
      console.log(e.type)
      this.$emit('ratechange')
    },
    seekedHandler(e) {
      console.log(e.type)
      this.play()

      this.$emit('seeked')
    },
    seekingHandler(e) {
      console.log(e.type)
      this.$emit('seeking')
    },
    stalledHandler(e) {
      console.log(e.type)
      this.$emit('stalled')
    },
    suspendHandler(e) {
      console.log(e.type)
      this.$emit('suspend')
    },
    timeupdateHandler(e) {
      // 拖拽时，无需更新
      if (this.isBarDraging) return

      console.log(e.type)

      this.curTime = this.$refs.audio.currentTime
      if (this.$refs.audio.buffered.length !== 0) {
        this.buffered = this.$refs.audio.buffered.end(0)
      }

      this.progressLeft = this._getSafeProgressLeft(
        this.progress * this.progressW
      )

      this.$emit('timeupdate', this.curTime)
    },
    volumechangeHandler(e) {
      console.log(e.type)

      this.volume = this.$refs.audio.muted ? 0 : this.$refs.audio.volume

      this.$emit('volumechange', this.volume)
    },
    waitingHandler(e) {
      console.log(e.type)
      this.isPlaying = false
      this.isPaused = false
      this.isLoading = true

      this.$emit('waiting')
    }
  }
}
</script>

<style lang="scss" scoped>
.c-BaseAudio {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;

  font-size: 16px;

  background: #fff;
  border-radius: 2px;
  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.2);
  &-main + &-sub,
  &-sub + &-extra {
    margin-left: 6px;
  }
  &-sub {
    flex: 1 1 auto;
    min-width: 40px;
  }
  &-extra {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
  }
}
.c-Audio {
  position: absolute;

  width: 1px;
  height: 1px;

  opacity: 0;

  pointer-events: none;
}

.c-Btn {
  position: relative;

  width: 28px;
  height: 28px;

  background: #eee;
  border-radius: 50%;
  cursor: pointer;

  transition: background 0.3s;
  &:hover {
    background: #dfdfdf;
  }
  &.is-playing {
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;

      width: 8px;
      height: 12px;
      margin-top: -6px;
      margin-left: -4px;

      border-right: 3px solid #666;
      border-left: 3px solid #666;

      content: '';
    }
  }
  &.is-paused {
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;

      width: 0;
      height: 0;
      margin-top: -6px;
      margin-left: -2px;

      border: 8px solid transparent;
      border-top-width: 6px;
      border-bottom-width: 6px;
      border-left-color: #666;

      content: '';
    }
  }
}

.c-Progress {
  position: relative;

  background-color: #c2c2c2;
  border-radius: 2px;
}

.c-Track {
  width: 0;
  height: 4px;

  background-color: #9c9c9c;
  border-radius: 2px;

  transition: width 0.3s;

  will-change: width;
}

.c-Bar {
  position: absolute;
  top: 50%;

  transform: translateY(-50%);

  will-change: left;
  &-circle {
    width: 12px;
    height: 12px;

    background-color: #666;
    border-radius: 50%;
    cursor: pointer;

    transition: box-shadow 0.3s;
    &:hover {
      box-shadow: 0 0 0 3px #666;
    }
  }
  &-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12px;
    height: 12px;

    background-color: #666;
    border-radius: 50%;
  }
}

.c-Info {
  color: #333;
  font-size: 14px;
}
</style>
