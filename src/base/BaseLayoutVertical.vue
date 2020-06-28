<template>
  <div class="c-BaseLayoutVertical">
    <div
      v-if="this.$slots.header"
      class="c-BaseLayoutVertical-hd"
    >
      <slot name="header" />
    </div>
    <div class="c-BaseLayoutVertical-bd">
      <slot />
    </div>
    <div
      v-if="this.$slots.footer"
      class="c-BaseLayoutVertical-ft"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
/**
 * * 常见垂直上中下三行布局
 */
export default {
  name: 'BaseLayoutVertical'
}
</script>

<style scoped>
/**
 * ! c-BaseLayoutVertical节点的父节点需要有高度
 */
.c-BaseLayoutVertical {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.c-BaseLayoutVertical-hd {
  flex: 0 0 auto;
}
.c-BaseLayoutVertical-bd {
  flex: 1 1 auto;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  /* 优化滚动性能 */
  will-change: scroll-position;
  position: relative;
  z-index: 1;
}
.c-BaseLayoutVertical-ft {
  flex: 0 0 auto;
}
</style>
