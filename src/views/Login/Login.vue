<template>
  <div class="c-Login">
    <h1>Login</h1>
    <p>
      您还未登陆，请先登陆
    </p>
    <div>
      <button @click="onClickBtn">
        假装已经填过登陆信息，直接登陆
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    onClickBtn() {
      sessionStorage.setItem('__auth__logged', '1')
      const URL = this.$route.query.redirect
      this.$router.replace(URL)
    }
  }
}
</script>
