<template>
  <div class="c-ToastTest">
    <button type="button" @click.stop="showToast">
      我停留的时间很长
    </button>
    <button type="button" @click.stop="showToastWithText">
      传递纯文本
    </button>
  </div>
</template>

<script>
/**
 * * ToastTest
 */
export default {
  name: 'ToastTest',
  methods: {
    showToast() {
      this.$toast({
        msg: '我停留的时间很长',
        duration: 15000
      })
    },
    showToastWithText() {
      this.$toast('传递纯文本')
    }
  }
}
</script>
