/**
 * @author GuangHui
 * @description 入口
 */

// * ----------------------------------------
// * 引入样式
// * ----------------------------------------
import '@/assets/styles/tailwind-entry.css'

import { useModules } from 'virtual:modules'
import { appInstance, mountApp } from '@/services/instance/app-instance'

// * ----------------------------------------
// * 注册实例
// * vite-plugin-use-modules插件自动导入src/services/instance下的所有实例并用useModules注册
// * ----------------------------------------
useModules(appInstance)

// * ----------------------------------------
// * mount 应用
// * ----------------------------------------
mountApp('#app')
