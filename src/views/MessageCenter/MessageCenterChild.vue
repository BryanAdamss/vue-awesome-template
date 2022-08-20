<script setup lang="ts">
/**
 * * MessageCenterChild
 */

const msgRef = ref('')

const mc = inject(messageCenterKey)

mc?.on('messageCenterBtnClick', (msg) => {
  msgRef.value = msg
})
</script>

<template>
  <div class="c-MessageCenterChild">
    Msg from MessageCenter.vue with MessageCenter and app.provide/inject {{ msgRef }}
  </div>
</template>
