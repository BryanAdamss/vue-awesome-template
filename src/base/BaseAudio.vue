<template>
  <div class="c-BaseAudio">

    <div class="c-BaseAudio-main">
      <div
        :class="btnClass"
        class="c-Btn"
        @click="togglePlay">
        btn
        {{ duration }}
        <br>
        {{ curTime }}
        <br>
        {{ progress }}
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
        progress
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

export default {
  name: 'BaseAudio',
  components: {},
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
      curTime: 0,
      duration: 0
    }
  },
  computed: {
    btnClass() {
      if (this.isWaiting) {
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
      return this.curTime / this.duration * 100
    }
  },
  watch: {},
  beforeCreate() {},
  mounted() {
  },
  methods: {
    play() {
      this.$refs.audio && this.$refs.audio.play()
    },
    pause() {
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
    abortHandler(e) { console.log(e.type) },
    canplayHandler(e) { console.log(e.type) },
    canplaythroughHandler(e) { console.log(e.type) },
    durationchangeHandler(e) {
      console.log(e.type)
      this.duration = this.$refs.audio.duration
    },
    emptiedHandler(e) { console.log(e.type) },
    endedHandler(e) {
      console.log(e.type)
      this.isPlaying = false
      this.isPaused = true
      this.isWaiting = false
    },
    errorHandler(e) { console.log(e.type) },
    loadeddataHandler(e) { console.log(e.type) },
    loadedmetadataHandler(e) {
      console.log(e.type)
      this.duration = this.$refs.audio.duration
    },
    loadstartHandler(e) { console.log(e.type) },
    mozaudioavailableHandler(e) { console.log(e.type) },
    pauseHandler(e) {
      console.log(e.type)
      this.isPlaying = false
      this.isPaused = true
      this.isWaiting = false
    },
    playHandler(e) { console.log(e.type) },
    playingHandler(e) {
      console.log(e.type)
      this.isPlaying = true
      this.isPaused = false
      this.isWaiting = false
    },
    progressHandler(e) { console.log(e.type) },
    ratechangeHandler(e) { console.log(e.type) },
    seekedHandler(e) {
      console.log(e.type)
      this.play()
    },
    seekingHandler(e) { console.log(e.type) },
    stalledHandler(e) { console.log(e.type) },
    suspendHandler(e) { console.log(e.type) },
    timeupdateHandler(e) {
      console.log(e.type)
      this.curTime = this.$refs.audio.currentTime
    },
    volumechangeHandler(e) { console.log(e.type) },
    waitingHandler(e) {
      console.log(e.type)
      this.isPlaying = false
      this.isPaused = false
      this.isWaiting = true
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
  }
  &.is-waiting {
    color: pink;
  }
}
</style>
