<template>
  <div class="c-BasePdfViewerTest" style="height:80vh;">
    <BasePdfViewer
      style="background-color:rgba(0,0,0,0.4);"
      resourcePath="/compressed.tracemonkey-pldi-09.pdf"
      fileName="compressed.tracemonkey-pldi-09.pdf"
      scale="page-width"
      :needPinch="true"
    />
  </div>
</template>

<script>
/**
 * * BasePdfViewerTest
 */

import BasePdfViewer from 'Base/BasePdfViewer/BasePdfViewer'

export default {
  name: 'BasePdfViewerTest',
  components: { BasePdfViewer },
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
.c-BasePdfViewerTest {
}
</style>
