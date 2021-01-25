<template>
  <div class="c-EventBusTest">
    parent
    <div class="c-Msg">接收来自EventBusGrandson1的消息:{{ msg }}</div>
    <div class="c-Parent">
      <EventBusSon1 class="c-Son" />
      <EventBusSon2 class="c-Son" />
    </div>
  </div>
</template>

<script>
/**
 * * EventBusTest
 */

import EventBusSon1 from './EventBusSon1'
import EventBusSon2 from './EventBusSon2'

export default {
  name: 'EventBusTest',
  components: {
    EventBusSon1,
    EventBusSon2
  },
  data() {
    return {
      msg: ''
    }
  },
  created() {
    this.$bus.$on('grandson1-msg-to-parent', msg => {
      this.msg = msg
    })
  }
}
</script>

<style lang="scss" scoped>
.c-EventBusTest {
  padding: 10px;

  background-color: #ddd;
}
.c-Parent {
  display: flex;
  justify-content: space-between;
}

.c-Son {
  flex: 1 1 auto;
  margin-top: 10px;
  padding: 10px;

  word-break: break-all;

  border: 1px solid #333;
  & + & {
    margin-left: 10px;
  }
}

.c-Msg {
  min-height: 2em;
  margin-top: 10px;

  color: #333;

  background-color: #fff;
  border: 1px solid #999;
}
</style>
