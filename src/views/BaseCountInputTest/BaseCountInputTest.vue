<template>
  <div class="c-BaseCountInputTest">
    <BaseCountInput :val.sync="textVal">
      <template>
        <input type="text" />
      </template>
    </BaseCountInput>
    <hr />

    <BaseCountInput :val.sync="textareaVal" :max="30" @exceed="handleExceed">
      <template>
        <textarea id="" name="" cols="30" rows="10" />
      </template>
    </BaseCountInput>

    <hr />

    <BaseCountInput :val.sync="otherTextareaVal">
      <template>
        <textarea id="" name="" cols="30" rows="10" />
        <p>另外行</p>
      </template>
    </BaseCountInput>

    <hr />

    <BaseCountInput>
      <template>
        <div />
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
    return {
      textVal: 1,
      textareaVal: '1239123ui91203j091',
      otherTextareaVal: 'other textarea'
    }
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
