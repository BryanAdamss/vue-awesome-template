/**
 * @author GuangHui
 * @description 生产构建配置
 */

import type { ConfigEnv } from 'vite'

import { getBaseConf } from './base.conf'
import type { CustomProdConf } from './base.conf'

/**
 * @description 生产构建配置
 *
 * @date 2022-07-09 22:06:39
 * @export
 * @param {ConfigEnv} { command, mode } 命令、模式
 * @return {*}  {CustomProdConf} 生产构建配置
 */
export function getProdConf({ command, mode }: ConfigEnv): CustomProdConf {
  return {
    ...getBaseConf({ command, mode }),
    build: {}
  }
}
