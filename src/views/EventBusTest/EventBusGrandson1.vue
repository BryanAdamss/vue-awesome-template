<template>
  <div class="c-EventBusGrandson1">
    EventBusGrandson1
    <br>
    <button
      type="button"
      @click="sendMsg"
    >
      发消息给son2
    </button>
    <button
      type="button"
      style="margin-top:10px;"
      @click="sendMsg2"
    >
      发消息给parent
    </button>
  </div>
</template>

<script>
/**
 * * EventBusGrandson1
 */
export default {
  name: 'EventBusGrandson1',
  methods: {
    sendMsg() {
      this.$bus.$emit(
        'grandson1Msg',
        `我是来自EventBusGrandson1的消息${(Math.random() * 10).toFixed(2)}`
      )
    },
    sendMsg2() {
      this.$bus.$emit(
        'grandson1MsgToParent',
        `我是来自EventBusGrandson1要发送给parent的消息${(
          Math.random() * 10
        ).toFixed(2)}`
      )
    }
  }
}
</script>
