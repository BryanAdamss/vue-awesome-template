/**
 * @author GuangHui
 * @description 基础(共享)配置
 */

import type { ConfigEnv, UserConfig } from 'vite'

import { URL, fileURLToPath } from 'url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export type CustomBaseConf = Omit<UserConfig, 'server' | 'build'>
export type CustomDevConf = Partial<Omit<UserConfig, 'build'>>
export type CustomProdConf = Partial<Omit<UserConfig, 'server'>>

/**
 * @description 共享配置
 *
 * @date 2022-07-09 21:47:28
 * @export
 * @return {*}  {Partial<UserConfig>}
 */
export function getSharedConf({ command, mode }: ConfigEnv): CustomBaseConf {
  return {
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../src', import.meta.url))
      }
    }
  }
}
