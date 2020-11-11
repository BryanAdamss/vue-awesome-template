<template>
  <div class="c-HairlineTest">
    <div class="c-TestBox is-right">
      right
    </div>
    <div class="c-TestBox is-top">
      top
    </div>
    <div class="c-TestBox is-bottom">
      bottom
    </div>
    <div class="c-TestBox is-left">
      left
    </div>
    <div class="c-TestBox is-all">
      all
    </div>

    <div class="c-TestBox is-radius">
      radius
    </div>
  </div>
</template>

<script>
/**
 * * HairlineTest
 */

export default {
  name: 'HairlineTest',
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
.c-HairlineTest {
}

.c-TestBox {
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
    @include hairline-right($theme-primary);
  }

  &.is-bottom {
    @include hairline-bottom($theme-primary);
  }

  &.is-left {
    @include hairline-left($theme-primary);
  }

  &.is-all {
    @include hairline-all($theme-primary);
  }

  &.is-radius {
    @include hairline-all($theme-primary, (4px, 8px, 12px, 16px));
  }
}
</style>
