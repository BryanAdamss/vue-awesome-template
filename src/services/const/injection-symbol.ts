/**
 * @author GuangHui
 * @description 依赖注入key
 */

import type { InjectionKey } from 'vue'

import type { MessageCenter } from '@/plugins/message-center'

export const messageCenterKey = Symbol('MessageCenter') as InjectionKey<MessageCenter>
