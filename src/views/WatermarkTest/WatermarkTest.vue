<template>
  <div class="c-WatermarkTest">
    <div :style="styleObj" class="c-Box">
      <button @click="toggleStyle">切换水印</button>
    </div>

    <hr />

    <div v-watermark="watermark" class="c-Box">
      水印指令
      <button @click="changeWatermark">改变水印值</button>
    </div>
  </div>
</template>

<script>
/**
 * * WatermarkTest
 */

import { watermarkSvg } from 'Utils/dom'

export default {
  name: 'WatermarkTest',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      styleObj: null,
      watermark: {
        width: 200,
        height: 200,
        content: '通过指令生成',
        transform: 'rotate(-45,100,100)'
      }
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {},
  methods: {
    toggleStyle() {
      this.styleObj = this.styleObj
        ? null
        : {
            background: `url("${watermarkSvg({
              width: 200,
              height: 200,
              content: '测试',
              transform: 'rotate(-45,100,100)'
            })}")`
          }
    },
    changeWatermark() {
      this.watermark = {
        content: ['水印1', '禁止盗版', 'GuangHui'][parseInt(Math.random() * 3)],
        color: ['red', 'blue', 'grey'][parseInt(Math.random() * 3)],
        rotate: -Math.random() * 100
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.c-WatermarkTest {
}

.c-Box {
  height: 400px;

  border: 1px solid red;
}
</style>
