/**
 * @author GuangHui
 * @description 非swagger接口请求，使用FetchWrapper实例请求
 */

import { fetchGet } from '@/services/instance/fetch-wrapper-instance'

// TODO: 类型不安全，需要改进
export const getPetByStatus = <T>(data: { status: ('available' | 'pending' | 'sold')[] }) => fetchGet<{ status: ('available' | 'pending' | 'sold')[] }, T>('/pet/findByStatus', data)
