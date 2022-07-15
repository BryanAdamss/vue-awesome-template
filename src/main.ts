/**
 * @author GuangHui
 * @description 入口
 */

// * ----------------------------------------
// * 引入样式
// * ----------------------------------------
import '@/assets/styles/tailwind-entry.css'

import { piniaInstance } from '@/services/instance/pinia-instance'
import { routerInstance } from '@/services/instance/router-instance'
import { appInstance, mountApp } from '@/services/instance/app-instance'

// * ----------------------------------------
// * 注册实例
// * ----------------------------------------
appInstance
  .use(piniaInstance)
  .use(routerInstance)

// * ----------------------------------------
// * mount 应用
// * ----------------------------------------
mountApp('#app')
