/**
 * @author GuangHui
 * @description 消息中心
 */

import type { App } from 'vue'

import { MessageCenter } from '@/plugins/message-center'
import { messageCenterKey } from '@/services/const/injection-symbol'

/* 创建消息中心实例（单例） */
export const messageCenter = new MessageCenter({ singleton: true })

/* 默认导出实例注册方法供vite-plugin-use-modules使用 */
export default (app: App) => app.use(messageCenter, { injectKey: messageCenterKey })
