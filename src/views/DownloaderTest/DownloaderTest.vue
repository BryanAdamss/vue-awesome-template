<template>
  <div class="c-DownloaderTest">
    <a
      href="https://test.zhixue.com/paperdownload/download/preview/download?paperId=5b75fc64-da6d-412c-8b2d-73675d7d038c&fileFormat=docx&pageType=A4&paperType=1"
      download="test">下载</a>
  </div>
</template>

<script>
/**
 * * DownloaderTest
 */
import Downloader from 'Plugins/downloader'

export default {
  name: 'DownloaderTest',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {
    const downloader = new Downloader()
    downloader.download('https://test.zhixue.com/paperdownload/download/preview/download?paperId=5b75fc64-da6d-412c-8b2d-73675d7d038c&fileFormat=docx&pageType=A4&paperType=1')
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.c-DownloaderTest {
}
</style>
