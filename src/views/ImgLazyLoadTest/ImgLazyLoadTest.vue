<template>
  <div class="c-ImgLazyLoadTest">
    <div class="c-ImgBox">
      <img
        v-for="n in 50"
        :key="n"
        v-lazy="`http://placehold.it/200x${n+1}0`"
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
  overflow-y: auto;

  border: 1px solid blue;
  -webkit-overflow-scrolling: touch;
}
</style>
