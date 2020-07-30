<template>
  <div class="c-ConstLoaderTest">
    {{ TEST_COMMON_CONST }}
    <hr>
    {{ PARENT_NAME }}
    <hr>
    <ConstLoaderTestChild />
  </div>
</template>

<script>
/**
 * * ConstLoaderTest
 */

import ConstLoaderTestChild from './ConstLoaderTestChild'

import * as constLoaderTestConst from 'Services/const/const-loader-test'

export default {
  name: 'ConstLoaderTest',
  components: { ConstLoaderTestChild },
  // * 通过provide为子组件提供常量
  provide: constLoaderTestConst,
  inject: [
    'TEST_COMMON_CONST'
  ],
  mixins: [],
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  beforeCreate() {
    // * 调用常量加载器加载当前页面常量
    this.$constLoader(constLoaderTestConst)
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.c-ConstLoaderTest {
}
</style>
