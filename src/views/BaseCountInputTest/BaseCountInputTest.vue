<template>
  <div class="c-BaseCountInputTest">
    <BaseCountInput>

      <template>
        <input type="text">
      </template>

    </BaseCountInput>
    <hr>

    <BaseCountInput
      :max="30"
      @exceed="handleExceed">

      <template>
        <textarea
          id=""
          name=""
          cols="30"
          rows="10"/>
      </template>

    </BaseCountInput>

    <hr>

    <BaseCountInput>

      <template>
        <textarea
          id=""
          name=""
          cols="30"
          rows="10"/>
        <p>另外行</p>
      </template>

    </BaseCountInput>

    <hr>

    <BaseCountInput>

      <template>
        <div/>
      </template>

    </BaseCountInput>
  </div>
</template>

<script>
/**
 * * BaseCountInputTest
 */

import BaseCountInput from 'Base/BaseCountInput'

export default {
  name: 'BaseCountInputTest',
  components: {
    BaseCountInput
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
  methods: {
    handleExceed(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.c-BaseCountInputTest {
}
</style>
