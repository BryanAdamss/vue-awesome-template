/**
 * @author GuangHui
 * @description 开发服务配置
 */

import type { CustomDevConf } from './shared.conf'
import type { ConfigEnv } from 'vite'

import { getSharedConf } from './shared.conf'

/**
 * @description 开发服务配置
 *
 * @date 2022-07-09 22:07:21
 * @export
 * @param {ConfigEnv} { command, mode } 命令、模式
 * @return {*}  {CustomDevConf} 开发服务配置
 */
export function getDevConf({ command, mode }: ConfigEnv): CustomDevConf {
  return {
    ...getSharedConf({ command, mode }),
    server: {}
  }
}
