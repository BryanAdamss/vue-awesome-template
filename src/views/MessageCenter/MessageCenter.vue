<script setup lang="ts">
/**
 * * MessageCenter
 */

import MessageCenterChild from './MessageCenterChild.vue'

/* setup语法中无法使用this.$mc方式 */
/* messageCenterKey自动注入 */
const mc = inject(messageCenterKey)

const onClick = () => {
  mc?.emit('messageCenterBtnClick', `Msg from App.vue with MessageCenter and app.provide/inject ${Math.random()}`)
}
</script>

<template>
  <div class="c-MessageCenter">
    <button @click="onClick">
      MessageCenter
    </button>
    <MessageCenterChild />
  </div>
</template>
