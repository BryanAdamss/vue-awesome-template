<template>
  <div>
    <h1>UserCenter</h1>
  </div>
</template>

<script>
export default {
  name: 'UserCenter',
  // * 路由离开前，重设样式
  beforeRouteLeave(to, from, next) {
    next()
  }
}
</script>

<style lang="scss" scoped>
div {
  color: blue;
}
</style>
