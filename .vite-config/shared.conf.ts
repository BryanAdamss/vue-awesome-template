/**
 * @author GuangHui
 * @description 基础(共享)配置
 */

import { URL, fileURLToPath } from 'url'
import type { ConfigEnv, UserConfig } from 'vite'

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
  console.log('🚦 -> file: shared.conf.ts -> line 24 -> getSharedConf -> command, mode', command, mode)

  return {
    plugins: [vue(), vueJsx()],
    resolve: {
      /* 路径别名，配置后，需同步在tsconfig.app.json中配置paths，否则ts报TS2307错误 */
      /* import.meta.url 类似__dirname */
      alias: {
        '~': fileURLToPath(new URL('../src', import.meta.url)),
      },
    },
  }
}
