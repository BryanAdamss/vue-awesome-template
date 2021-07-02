<template>
  <div class="c-ConstLoaderTest">
    {{ TEST_COMMON_CONST }}
    <hr />
    {{ PARENT_NAME }}
    <hr />
    <ConstLoaderTestChild />
  </div>
</template>

<script>
/**
 * * ConstLoaderTest
 */

import * as constLoaderTestConst from 'Services/const/const-loader-test'

import ConstLoaderTestChild from './ConstLoaderTestChild'

export default {
  name: 'ConstLoaderTest',
  components: { ConstLoaderTestChild },
  mixins: [],
  // * 通过provide为子组件提供常量
  provide: constLoaderTestConst,
  inject: ['TEST_COMMON_CONST'],
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
