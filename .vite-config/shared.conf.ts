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
    /* 共享配置 */
    /* https://cn.vitejs.dev/config/shared-options.html */
    root: process.cwd(), /* 项目根目录index.html所在目录；默认process.cwd() */
    base: './', /* 公共基础路径，类似assetsPublicPath；默认'/'；需要以/结尾 */
    publicDir: 'public', /* 原样拷贝资源目录，类似static；默认'public' */
    cacheDir: 'node_modules/.vite', /* vite预构建缓存产物目录；默认node_modules/.vite */

    /* 解析相关 */
    resolve: {
      /* 路径别名，配置后，需同步在tsconfig.app.json中配置paths，否则ts报TS2307错误 */
      /* import.meta.url 类似__dirname */
      alias: {
        '@': fileURLToPath(new URL('../src', import.meta.url)),
      },
      mainFields: ['module', 'jsnext:main', 'jsnext'], /* 解析三方包入口时尝试的字段列表；默认为['module', 'jsnext:main', 'jsnext']，优先从package.json中moudle字段解析 */
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'], /* 导入时想要省略的扩展名列表；默认值为['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'] */
    },

    css: {
      /* css modules行为 */
      // modules: {},
      /* postcss 配置，若提供了此配置，将不会读取其它配置如postcss.config.js */
      // postcss: {},
      /* 样式预处理器选项 */
      // preprocessorOptions: {
      //   scss: {},
      //   styl: {},
      // },
      /* 开发环境是否生成css sourcemap；默认false */
      devSourcemap: false,
    },
    json: {
      /* import json时是否支持按名导入，方便tree-shaking；默认true */
      namedExports: true,
      /* 若设置为 true，导入的 JSON 会被转换为 export default JSON.parse("...")，这样会比转译成对象字面量性能更好，尤其是当 JSON 文件较大的时候；开启此项，则会禁用按名导入；默认false */
      stringify: false,
    },
    /* esbuild 相关配置，一般自定义jsx时可能需要配置 */
    // esbuild: {},
    /* 使用 picomatch 模式 指定额外的静态资源  */
    // assetsInclude:[]
    /* 日志等级；默认info */
    logLevel: 'info',
    /* 运行vite命令时是否清屏；默认true */
    clearScreen: true,
    /* 环境变量文件目录；默认root */
    envDir: 'root',
    /* 需要通过import.meta.env暴露给客户端的变量前缀；默认VITE_ */
    envPrefix: 'VITE_',

    /* 依赖预构建选项 */
    /* https://cn.vitejs.dev/config/dep-optimization-options.html#dep-optimization-options */
    // optimizeDeps: {
    /* 预构建的入口文件列表；默认index.html；若指定了build.rollupOptions.input，则转而使用它 */
    // entries: 'index.html',
    /* 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。 */
    // include: [],
    /* 不需要预构建的依赖列表；默认[] */
    // exclude: [],
    /* 预构建时esbuild配置 */
    // esbuildOptions: {},
    /* 设置为 true 可以强制依赖预构建，而忽略之前已经缓存过的、已经优化过的依赖 */
    // force: false,
    // },

    /* ssr相关； https://cn.vitejs.dev/config/ssr-options.html#ssr-options */
    // ssr: {},

    /* worker相关；https://cn.vitejs.dev/config/worker-options.html#worker-options */
    // worker: {},

    /* 插件 */
    plugins: [vue(), vueJsx()],
  }
}
