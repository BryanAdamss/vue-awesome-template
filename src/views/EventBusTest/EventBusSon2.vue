<template>
  <div class="c-EventBusSon2">
    EventBusSon2
    <button
      type="button"
      @click="sendMsg"
    >
      发消息给son1
    </button>
    <div class="c-Msg">
      接收son1的消息:{{ msg }}
    </div>
    <div class="c-Msg">
      接收grandson1的消息:{{ msg2 }}
    </div>
  </div>
</template>

<script>
/**
 * * EventBusSon2
 */

export default {
  name: 'EventBusSon2',

  data() {
    return {
      msg: '',
      msg2: ''
    }
  },
  created() {
    this.$bus.$on('son1-msg', msg => {
      this.msg = msg
    })
    this.$bus.$on('grandson1-msg', msg => {
      this.msg2 = msg
    })
  },
  methods: {
    sendMsg() {
      this.$bus.$emit(
        'son2-msg',
        `我是来自EventBusSon2的消息${(Math.random() * 10).toFixed(2)}`
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
