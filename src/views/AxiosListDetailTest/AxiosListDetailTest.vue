<template>
  <div class="c-AxiosListDetailTest">
    从AxiosTest传递过来的id为{{ id }} <br />
    {{ $route.query.fromRouteName }}的滚动位置:{{ $route.query.scrollTop }}
  </div>
</template>

<script>
/**
 * * AxiosListDetailTest
 */
export default {
  name: 'AxiosListDetailTest',
  beforeRouteLeave(to, from, next) {
    // * 如果需要跳转到fromRouteName(由AxiosTest页面通过query传递过来的)对应路由，则需要带上对应scrollTop
    const { fromRouteName, scrollTop } = this.$route.query

    // * 将列表的滚动距离绑定到根组件上
    if (to.name === fromRouteName) {
      // * 如果控制此处路由跳转的方法是在此组件内部，可以不用beforeRouteLeave，直接使用this.$router.push在query上带上scrollTop，将scrollTop带出去
      // * 这里因为控制路由的是返回组件，所以只能在beforeRouteLeave守卫中做处理

      // * 曾经考虑过使用next跳转并在query上带上scrollTop的方法将数据带回
      // * 但因为next带回也会触发beforeRouteLeave导致无限循环而放弃

      // * 也考虑过拦截to.query带上scrollTop，但query是只读的，不允许修改

      // * 其实这里需要的仅仅是一个可以用来存储scrollTop的东西
      // * 这里如果不将scrollTop挂载到$root上，也可以放到vuex中、localStorage、甚至window等可跨组件存储的地方
      this.$root.$_scrollTop = scrollTop
    }
    next()
  },
  props: {
    // * 这个id将会在AxiosTest通过动态参数($route.params)带过来
    id: {
      type: [Number, String],
      default: '--'
    }
  }
}
</script>
