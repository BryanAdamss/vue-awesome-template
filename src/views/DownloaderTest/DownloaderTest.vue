<template>
  <div class="c-DownloaderTest">
    <button @click="download">
      下载测试文件
    </button>
  </div>
</template>

<script>
/**
 * * DownloaderTest
 */
import { Downloader } from 'Plugins/downloader'

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
  created() {},
  mounted() {},
  methods: {
    download() {
      const downloader = new Downloader()
      downloader.download('http://down10.zol.com.cn/tuxcl/acdseefree.exe')
    }
  }
}
</script>

<style lang="scss" scoped>
.c-DownloaderTest {
}
</style>
