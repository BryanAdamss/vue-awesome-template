<template>
  <div class="c-RandomProgressTest">
    <button @click="start">开始</button>
    <button @click="pause">暂停</button>
    <button @click="done">完成</button>
  </div>
</template>

<script>
/**
 * * RandomProgressTest
 */

import { RandomProgress } from 'Plugins/random-progress'

export default {
  name: 'RandomProgressTest',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      randomProgress: new RandomProgress()
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {},
  methods: {
    handleClick() {
      alert(1)
    },
    start() {
      this.randomProgress.start()
    },
    done() {
      this.randomProgress.done()
    },
    pause() {
      this.randomProgress.pause()
    }
  }
}
</script>

<style lang="scss" scoped>
.c-RandomProgressTest {
}
</style>
