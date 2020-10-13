<template>
  <div
    class="c-BasePdfViewerTest"
    style="height:100%;"
  >
    <BasePdfViewer :url="'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'" />
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
