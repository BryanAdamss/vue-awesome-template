<template>
  <div class="c-BaseSwiperSlide">
    <slot />
  </div>
</template>

<script>
/**
 * * BaseSwiperSlide
 */

export default {
  name: 'BaseSwiperSlide'
}
</script>

<style lang="scss" scoped>
.c-BaseSwiperSlide {
  position: relative;

  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  @include float();
}
</style>
