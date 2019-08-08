<template>
  <div class="c-DrawingBoardTest">
    <div id="board"></div>
  </div>
</template>

<script>
/**
 * * DrawingBoardTest
 */

import DrawingBoard from 'Plugins/drawing-board'

export default {
  name: 'DrawingBoardTest',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {
    this.drawingBoard=new DrawingBoard('#board')
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.c-DrawingBoardTest {
}
</style>