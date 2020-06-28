<template>
  <div class="c-TimeCounterTest">
    {{ time }}
    <br>
    开始时间：{{ startTime }}
    <br>
    结束时间：{{ endTime }}
  </div>
</template>

<script>
/**
 * * TimeCounterTest
 */

import TimeCounter from 'Plugins/time-counter'

export default {
  name: 'TimeCounterTest',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      time: 0,
      startTime: 10000,
      endTime: 2000
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {
    const that = this
    this.timeCounter = new TimeCounter({
      startTime: this.startTime,
      endTime: this.endTime,
      onTick(time) {
        that.time = time
      },
      onEnd(time) {
        that.time = time
        console.log('计时结束')
      }
    })

    this.timeCounter.start()
  },
  mounted() {},
  beforeDestroy() {
    this.timeCounter.destory()
    this.timeCounter = null
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.c-TimeCounterTest {
}
</style>
