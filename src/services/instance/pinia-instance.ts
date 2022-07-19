/**
 * @author GuangHui
 * @description pinia实例
 */

import type { App } from 'vue'

import { createPinia } from 'pinia'

export const piniaInstance = createPinia()

/* 默认导出实例注册方法 */
export default (app: App) => app.use(piniaInstance)
