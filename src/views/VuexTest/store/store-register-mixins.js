import store from './index'

export default {
  beforeRouteEnter(to, from, next) {
    // 路由进入时注册模块
    if (!window.installed) {
      // 防止重复注册，vuex报错
      store.install()
      window.installed = true
    }
    next()
  },
  beforeRouteLeave(to, from, next) {
    this.$once('hook:beforeDestroy', () => {
      // 路由离开时卸载模块
      store.uninstall() // uninstall的最佳时机应该在 DOM 更新中或后，旧的页面组件实例销毁过程调用时
      window.installed = false
    })
    next()
  }
}
