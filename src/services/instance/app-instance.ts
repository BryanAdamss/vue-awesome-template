/**
 * @author GuangHui
 * @description 应用实例
 */

import { createApp } from 'vue'

import App from '@/App.vue'

/* 应用实例 */
export const appInstance = createApp(App)

/**
 * mount 应用
 *
 * @date 2022-07-15 18:10:08
 * @export
 * @param {string} [elOrSelector='#app'] 应用挂载元素或选择器
 */
export function mountApp(elOrSelector = '#app') {
  appInstance.mount(elOrSelector)
}

