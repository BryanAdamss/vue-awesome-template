<template>
  <div class="c-DrawingBoardTest">
    <div
      id="board"
      style="width:300px;height:300px;"/>
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
    this.drawingBoard = new DrawingBoard('#board')

    console.log(this.drawingBoard)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.c-DrawingBoardTest {
  #board {
    border: 1px solid blue;
  }
}
</style>
