<template>
  <div class="c-ImgLazyLoadTest">
    <div class="c-ImgBox">
      <img
        v-lazy="`http://placehold.it/200x${n+1}0`"
        v-for="n in 50"
        :key="n"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImgLazyLoadTest'
}
</script>

<style scoped>
.c-ImgBox {
  height: 500px;
  border: 1px solid blue;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
