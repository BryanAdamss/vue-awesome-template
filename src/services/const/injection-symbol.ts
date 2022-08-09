/**
 * @author ghchu
 * @description 依赖注入key
 */

import type { MessageCenter } from '@/plugins/message-center'

import type { InjectionKey } from 'vue'

export const messageCenterKey = Symbol('MessageCenter') as InjectionKey<MessageCenter>
