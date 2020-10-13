<template>
  <div
    class="c-BaseDocViewerTest"
    style="height:100%;"
  >
    <BaseDocViewer :url="'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'" />
  </div>
</template>

<script>
/**
 * * BaseDocViewerTest
 */

import BaseDocViewer from 'Base/BaseDocViewer/BaseDocViewer'

export default {
  name: 'BaseDocViewerTest',
  components: { BaseDocViewer },
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
.c-BaseDocViewerTest {

}
</style>
