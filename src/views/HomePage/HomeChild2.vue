<template>
  <div class="c-HomeChild2">
    我是用来测试子路由HomeChild2
  </div>
</template>

<script>
/**
 * * HomeChild1
 */

export default {
  name: 'HomeChild2',

  beforeRouteEnter(to, from, next) {
    console.log('我是HomeChild2，我是一个子路由组件，我能触发组件内的守卫')
    next()
  }
}
</script>
