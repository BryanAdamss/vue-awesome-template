/**
 * @author GuangHui
 * @description 全局状态
 */

import { defineStore } from 'pinia'

export interface UserInfo {
  id: string
  name: string
  age: number
}

export const useGlobalState = defineStore({
  id: 'global-state',
  state: () => ({
    userInfo: {} as UserInfo,
  }),
  getters: {
    userId: state => state.userInfo?.id,
  },
  actions: {
    getUserInfo() {
      this.userInfo = { id: '09xx9', name: 'GuangHui', age: 18 }
    },
  },
})
