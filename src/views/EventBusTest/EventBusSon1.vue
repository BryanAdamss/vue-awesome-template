<template>
  <div class="c-EventBusSon1">
    EventBusSon1
    <br />
    <button type="button" @click="sendMsg">
      发消息给son2
    </button>
    <div class="c-Msg">接收son2的消息:{{ msg }}</div>
    <EventBusGrandson1 />
  </div>
</template>

<script>
/**
 * * EventBusSon1
 */

import EventBusGrandson1 from './EventBusGrandson1'

export default {
  name: 'EventBusSon1',
  components: {
    EventBusGrandson1
  },
  data() {
    return {
      msg: ''
    }
  },
  created() {
    this.$bus.$on('son2-msg', msg => {
      this.msg = msg
    })
  },
  methods: {
    sendMsg() {
      this.$bus.$emit(
        'son1-msg',
        `我是来自EventBusSon1的消息${(Math.random() * 10).toFixed(2)}`
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.c-Msg {
  min-height: 2em;
  margin-top: 10px;

  color: #333;

  background-color: #fff;
  border: 1px solid #999;
}
</style>
