<template>
  <div class="c-BaseAudio">

    <div class="c-BaseAudio-main">
      <div
        :class="btnClass"
        class="c-Btn"
        @click="togglePlay">
        <template v-if="isPlaying">
          playing
        </template>
        <template v-else>
          paused
        </template>
      </div>

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
            v-for="(sour,index) in src"
            :key="index"
            :src="sour.src"
            :type="sour.type">

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
      v-if="!mini"
      class="c-BaseAudio-sub">
      <div class="c-Progress">
        <div
          :style="{width:`${progress}%`}"
          class="c-Progress-inner">
          <BaseLoadingSpinner
            v-if="isLoading"
            size="1em"/>
          <div
            v-else
            class="c-Progress-bar"/>
        </div>
      </div>
    </div>

    <div
      v-if="!mini"
      class="c-BaseAudio-extra">
      <div class="c-Volume">
        volume
      </div>
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
  mixins: [],
  props: {
    src: {
      type: [String, Array],
      required: true
    },
    mini: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isPlaying: false,
      isLoading: false,
      isPaused: true,
      curTime: 0,
      duration: 0,
      volume: 0
    }
  },
  computed: {
    btnClass() {
      if (this.isLoading) {
        return 'is-waiting'
      } else if (this.isPlaying) {
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

      return this.curTime / this.duration * 100
    }
  },
  watch: {},
  beforeCreate() {},
  mounted() {
    this.volume = this.$refs.audio.volume
  },
  methods: {
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
      this.duration = this.$refs.audio.duration

      this.$emit('loadedmetadata', this.duration)
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
      this.$emit('progress')
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
      console.log(e.type)
      this.curTime = this.$refs.audio.currentTime

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
  font-size: 16px;
}
.c-Audio {
  // display: none;
}

.c-Btn {
  &.is-playing {
    color: red;
  }
  &.is-paused {
    color: blue;
    position: relative;
    &::after {
    }
  }
  &.is-waiting {
    color: pink;
  }
}

.c-Progress {
  height: 4px;
  background-color: #c2c2c2;
  padding-left: 4px;
  padding-right: 4px;
  &-inner {
    height: 100%;
    width: 0;
    background-color: #9c9c9c;
    position: relative;
  }
  &-bar {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: red;

    position: absolute;
    right: -5px;
  }
}
</style>
