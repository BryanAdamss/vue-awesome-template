<template>
  <ul class="c-LinkList">
    <!--路由跳转采用命名形式跳转-->
    <!-- exact标识路由样式匹配采用精准模式 -->
    <router-link
      v-for="(route,index) in routes"
      :key="index"
      :to="{name:route.name}"
      exact
      tag="li"
      class="c-LinkList-item"
    >
      跳转{{ route.name }}
    </router-link>
  </ul>
</template>

<script>
/**
 * * LinkList
 */
export default {
  name: 'LinkList',
  data() {
    return {
      routes: []
    }
  },
  created() {
    let { routes } = this.$router.options
    // * 剔除
    // * 含有重定向路由
    // * AxiosListDetailTest路由
    // * Login路由
    routes = routes.filter(route => {
      return (
        !route.redirect &&
        route.name !== 'AxiosListDetailTest' &&
        route.name !== 'Login'
      )
    })

    this.routes = routes
  }
}
</script>

<style scoped lang="scss">
.c-LinkList {
  @at-root #{&}-item {
    color: #333;

    cursor: pointer;
    @at-root #{&}.router-link-active {
      color: red;
    }
  }
}
</style>
