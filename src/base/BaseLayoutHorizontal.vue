<template>
  <div class="c-BaseLayoutHorizontal">
    <div
      v-if="this.$slots.side"
      class="c-BaseLayoutHorizontal-side"
    >
      <slot name="side"/>
    </div>
    <div class="c-BaseLayoutHorizontal-main">
      <slot/>
    </div>
    <div
      v-if="this.$slots.extra"
      class="c-BaseLayoutHorizontal-extra"
    >
      <slot name="extra"/>
    </div>
  </div>
</template>

<script>
/**
 * * 常见水平三列布局
 */
export default {
  name: 'BaseLayoutHorizontal'
}
</script>

<style scoped>
.c-BaseLayoutHorizontal {
  display: flex;
  flex-direction: row;
}
.c-BaseLayoutHorizontal-side {
  flex: 0 0 auto;
}
.c-BaseLayoutHorizontal-main {
  flex: 1 1 auto;
}
.c-BaseLayoutHorizontal-extra {
  flex: 0 0 auto;
}
</style>
