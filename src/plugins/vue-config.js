/**
 * @author GuangHui
 * @description Vue 全局config
 */

import Vue from 'vue'

export const setVueConfig = () => {
  // 生产服务器不开启调试
  Vue.config.devtools = process.env.VUE_APP_TARGET_SERVER !== 'prod'

  // 关闭 vue 在启动时生成生产提示
  Vue.config.productionTip = false
}
