<script lang="ts" setup>
import type { MessageCenter } from '@/plugins/message-center'

const mc = inject<MessageCenter>('mc')

const text = ref('')

mc?.on('messageCenterBtnClick', (msg) => {
  console.log('🚦 -> file: About.vue -> line 9 -> mc?.on -> msg', msg)
  text.value = msg
})
</script>

<template>
  <div class="about">
    <div>
      <h1>This is an about page</h1>
    </div>
    <div>
      <h2>{{ text }}</h2>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
