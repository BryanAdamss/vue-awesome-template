<template>
  <div class="c-HairLineTest">
    <div class="c-Box is-right">
      right
    </div>
    <div class="c-Box is-top">
      top
    </div>
    <div class="c-Box is-bottom">
      bottom
    </div>
    <div class="c-Box is-left">
      left
    </div>
    <div class="c-Box is-all">
      all
    </div>

    <div class="c-Box is-radius">
      radius
    </div>
  </div>
</template>

<script>
/**
 * * HairLineTest
 */

export default {
  name: 'HairLineTest',
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
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.c-HairLineTest {
}

.c-Box {
  width: 100px;
  height: 100px;
  margin-left: 10px;

  & + & {
    margin-top: 10px;
  }

  &.is-top {
    @include hairline-top($theme-primary);
  }

  &.is-right {
    @include hairline-right(red);
  }

  &.is-bottom {
    @include hairline-bottom(red);
  }

  &.is-left {
    @include hairline-left(red);
  }

  &.is-all {
    @include hairline-all(red);
  }

  &.is-radius {
    @include hairline-all(red, (4px, 8px, 12px, 16px));
  }
}
</style>
