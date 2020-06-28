<template>
  <div class="c-SVGIconTest">
    <BaseSvgIcon
      name="1"
      size="20"/>
    <BaseSvgIcon
      name="2"
      size="40"/>
    <BaseSvgIcon
      name="3"
      size="100"/>
  </div>
</template>

<script>
/**
 * * SVGIconTest
 */

import BaseSvgIcon from 'Base/BaseSvgIcon'

export default {
  name: 'SVGIconTest',
  components: {
    BaseSvgIcon
  },
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
.c-SVGIconTest {
}
</style>
