<template>
  <div class="c-ToastTest">
    <button
      type="button"
      @click.stop="showToast"
    >点击展示toast</button>
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
        message: '测试Toast'
      })
    }
  }
}
</script>
