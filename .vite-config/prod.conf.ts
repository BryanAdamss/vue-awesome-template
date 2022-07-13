/**
 * @author GuangHui
 * @description 生产构建配置
 */

import type { ConfigEnv } from 'vite'
import type { CustomProdConf } from './shared.conf'

import { getSharedConf } from './shared.conf'

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
    ...getSharedConf({ command, mode }),
    /* 构建配置；https://cn.vitejs.dev/config/build-options.html */
    build: {
      /* 构建目标；默认是vite特有的值modules，其指代支持ESM的浏览器 */
      target: 'modules',
      /* 是否自动注入module preload 的 polyfill，vite所有入口module都会设置为modulepreload，其有一定兼容问题；默认true */
      polyfillModulePreload: true,
      /* 打包输出目录；默认dist */
      outDir: 'dist',
      /* 静态资源目录，相对于outDir；默认assets */
      // assetsDir: 'static',
    },
  }
}
