<template>
  <div class="c-BaseRangeTest">
    <BaseRange :min="50" :max="100" :value.sync="value"></BaseRange>
  </div>
</template>

<script>
/**
 * * BaseRangeTest
 */

import BaseRange from 'Base/BaseRange'

export default {
  name: 'BaseRangeTest',
  components: { BaseRange },
  mixins: [],
  props: {},
  data() {
    return {
      value: 50
    }
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
.c-BaseRangeTest {
  padding: 100px 20px;
}
</style>
