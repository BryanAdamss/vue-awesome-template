<template>
  <div class="c-HomeChild1">
    我是用来测试子路由

  </div>
</template>

<script>
/**
 * * HomeChild1
 */

export default {
  name: 'HomeChild1',

  beforeRouteEnter(to, from, next) {
    console.log(
      '我是HomeChild1，我是一个用来定义子路由的组件，我能触发组件内的守卫'
    )
    next()
  }
}
</script>
