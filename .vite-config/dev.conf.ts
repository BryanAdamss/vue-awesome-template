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
    /* 开发服务配置；https://cn.vitejs.dev/config/server-options.html#server-options */
    server: {
      /* 开发服务域名；默认localhost */
      host: 'localhost',
      /* 端口；默认3000； */
      port: 3000,
      /* 严格端口，端口被占用时，是否自动尝试下一个可用端口； */
      strictPort: false,
      /* https启用；https://cn.vitejs.dev/config/server-options.html#server-https */
      // https: true,
      /* 是否自动打开浏览器、打开哪个页面、用哪个浏览器打开；底层依赖open包，https://github.com/sindresorhus/open#app */
      open: false,
      /* 开发代理 */
      // proxy:{}
      /* 开发服务器cors配置，设为true，默认允许所有源 */
      // cors: true,
      /* 开发服务器响应headers */
      // headers: {},
      /* hmr相关配置 */
      // hmr: {},
      /* watch相关配置，传递给chokidar的配置 */
      // watch: {},
      /* 以中间件模式创建 Vite 服务器；https://cn.vitejs.dev/config/server-options.html#server-middlewaremode */
      // middlewareMode: 'html',
      /* 在 HTTP 请求中预留此文件夹，用于代理 Vite 作为子文件夹时使用。应该以 / 字符开始和结束 */
      // base:''
      /* fs相关；https://cn.vitejs.dev/config/server-options.html#server-fs-strict */
      // fs: { },
      /* 用于定义开发调试阶段生成资产的 origin */
      // origin: '',
    },
  }
}
