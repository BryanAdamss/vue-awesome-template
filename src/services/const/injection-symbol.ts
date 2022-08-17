/**
 * @author GuangHui
 * @description 依赖注入key
 */

import type { InjectionKey } from 'vue'

import type { FetchWrapper } from '@/plugins/fetch-wrapper'
import type { MessageCenter } from '@/plugins/message-center'

/* 使用InjectionKey标注类型 https://cn.vuejs.org/guide/typescript/composition-api.html#typing-provide-inject */
export const messageCenterKey = Symbol('MessageCenter') as InjectionKey<MessageCenter>

export const fetchGetKey = Symbol('FetchGet') as InjectionKey<ReturnType<FetchWrapper['create']>>

export const fetchPostKey = Symbol('FetchPost') as InjectionKey<ReturnType<FetchWrapper['create']>>
