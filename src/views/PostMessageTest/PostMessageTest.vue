<template>
  <div class="c-PostMessageTest">
    <p>回传from_inner_frame事件的页面地址为：{{ href }}</p>
    <p>回传from_inner_frame事件的消息为：{{ msg }}</p>

    <iframe
      ref="frame"
      src="http://localhost:8080/#/post-message-test/inner-frame"
      frameborder="0"/>
  </div>
</template>

<script>
/**
 * * PostMessageTest
 */

import Messager from 'Plugins/messager'

export default {
  name: 'PostMessageTest',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      msg: '--',
      href: '--'
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {
    const frame = this.$refs.frame

    frame.onload = () => {
      this.messager = new Messager({
        targetWin: frame.contentWindow,
        targetOrigin: window.location.origin
      })

      // 接收回传消息
      this.messager.on('from_inner_frame', (msg, source) => {
        console.log('from_inner_frame', msg, source.location.href)

        this.msg = msg
        this.href = source.location.href
      })

      // 发送消息
      this.messager.send('from_test', { test: 3 })

      this.$once('hook:beforeDestroy', () => {
        this.messager.destroy()
      })
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.c-PostMessageTest {
  iframe {
    border: 2px solid blue;
    margin: 20px 0 0 20px;
  }
}
</style>
