<template>
  <div class="c-DragTest">
    <div
      v-drag="onDrag"
      class="c-Box"
    >
      拖动我
    </div>
  </div>
</template>

<script>
/**
 * * DragTest
 */

// import Drag from 'Directives/drag'
export default {
  name: 'DragTest',
  // directives: {
  //   Drag
  // },
  methods: {
    onDrag(pos) {
      console.log(pos)
    }
  }
}
</script>

<style>
.c-DragTest {
  border: 1px solid blue;
  width: 300px;
  height: 300px;
}

.c-Box {
  width: 100px;
  height: 100px;
  background-color: #f00;
}
</style>
