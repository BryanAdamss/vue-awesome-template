<template>
  <div class="c-FiltersTest">
    ms2hms
    {{ {num:100000} | ms2hms }}
    <hr>
    str2kebab
    {{ 'amCameCase' | str2kebab }}
    <hr>
    dateFormat
    {{ new Date().getTime() | dateFormat('yyyy年MM月dd日 hh:mm:ss') }}
    <hr>
    fixedDecimal
    {{ 0.334567 | fixedDecimal }}
    <hr>
    num2percentage
    {{ 0.334567 | num2percentage }}
  </div>
</template>

<script>
/**
 * * FiltersTest
 */

export default {
  name: 'FiltersTest',
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
.c-FiltersTest {
}
</style>
