<template>
  <div class="c-PostMessageTestFrame">
    PostMessageTestFrame
    <p>发送页面的地址：{{ href }}</p>
    <p>接收到的消息：{{ msg }}</p>
  </div>
</template>

<script>
/**
 * * PostMessageTestFrame
 */

import { Messager } from 'Plugins/messager'

export default {
  name: 'PostMessageTestFrame',
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
    this.messager2 = new Messager({
      // 消息接收方可暂不设置targetWin
      // 其会在接收到消息时，自动设置
      // 也可以手动调用setTargetWin方法
      targetOrigin: window.location.origin
    })

    // 接收消息
    this.messager2.on('from_test', (msg, source) => {
      console.log('from_test', msg, source.location.href)

      this.msg = msg
      this.href = source.location.href

      // 回传消息
      this.messager2.send('from_inner_frame', '我是来自from_inner_frame的消息')
    })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.c-PostMessageTestFrame {
}
</style>
