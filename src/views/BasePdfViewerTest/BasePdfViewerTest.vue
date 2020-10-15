<template>
  <div
    class="c-BasePdfViewerTest"
    style="height:100%;"
  >
    <BasePdfViewer
      style="background-color:rgba(0,0,0,0.4);"
      :url="'https://www.adobe.com/content/dam/acom/en/devnet/acrobat/pdfs/PDFOpenParameters.pdf'"
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
