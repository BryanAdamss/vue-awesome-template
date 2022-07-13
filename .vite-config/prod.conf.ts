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
      assetsDir: 'static',
      /* 资源内联限制大小；默认4kb */
      assetsInlineLimit: 4096,
      /* 是否开启css分隔，true的话，异步 js chunk中的css将单独拆分到异步css chunk中并在js chunk执行前加载，false则所有css提取到一个文件中；默认true；https://cn.vitejs.dev/guide/features.html#css-code-splitting */
      cssCodeSplit: true,
      /* 在针对非主流浏览器时使用，单独配置css的目标；默认build.target；https://cn.vitejs.dev/config/build-options.html#build-csstarget */
      // cssTarget: 'modules',
      /* 生产sourcemap；默认false */
      sourcemap: false,
      /* 自定义底层rollup打包配置，其会同vite内部的rollup选项合并 */
      // rollupOptions: {},
      /* 传递给 @rollup/plugin-commonjs 插件的选项 */
      // commonjsOptions: {},
      /* 传递给 @rollup/plugin-dynamic-import-vars 的选项。 */
      // dynamicImportVarsOptions: {},
      /* 库模式时使用；https://cn.vitejs.dev/config/build-options.html#build-lib */
      // lib: {},
      /* 后端集成时使用； https://cn.vitejs.dev/config/build-options.html#build-manifest */
      // manifest: {},
      /* 是否开启ssr；默认undefined */
      // ssr: undefined,
      /* 压缩混淆器；默认esbuild */
      minify: 'esbuild',
      /* 当minify设置为terser时，传递给terser的选项 */
      // terserOptions: {},
      /* 设置为 false 来禁用将构建后的文件写入磁盘。这常用于 编程式地调用 build() 在写入磁盘之前，需要对构建后的文件进行进一步处理 */
      write: true,
      /* 是否清空outDir；默认当outDir 在 root 目录下，则为 true */
      // emptyOutDir: true,
      /* 启用/禁用 gzip 压缩大小报告；默认true */
      reportCompressedSize: true,
      /* 触发警告的 chunk 大小；默认500kb */
      chunkSizeWarningLimit: 500,
      /* 设置为 {} 则会启用 rollup 的监听器。在涉及只用在构建时的插件时和集成开发流程中很常用；默认null */
      // watch: null,
    },
  }
}
