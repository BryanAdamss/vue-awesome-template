<template>
  <div class="c-FormulaRenderTest">
    <div v-for="(item, index) in items" :key="index">
      <BaseFormulaRender :htmlString="item.rawHtml" />
    </div>
  </div>
</template>

<script>
/**
 * * FormulaRenderTest
 */

import BaseFormulaRender from 'Base/BaseFormulaRender'

import { MOCK_DATA } from './mock-data'

export default {
  name: 'FormulaRenderTest',
  components: { BaseFormulaRender },
  mixins: [],
  props: {},
  data() {
    return {
      items: MOCK_DATA
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
.c-FormulaRenderTest {
}
</style>
