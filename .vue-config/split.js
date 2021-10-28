/**
 * @author GuangHui
 * @description split
 */

// 将node_modules所有模块拆分成单独的包
const splitAllNodeModulesVendors = config => {
  if (process.env.NODE_ENV !== 'production') return

  // const oldConfig = config.optimization.get('splitChunks')

  // const newConfig = {
  //   ...oldConfig,
  //   cacheGroups: {
  //     ...oldConfig.cacheGroups,
  //     // 追加一个拆包规则，将node_modules拆成独立的包，适合http/2
  //     // http/1.1 会有并发限制(chrome 6)
  //     'single-vendor': {
  //       test: /[\\/]node_modules[\\/]/,
  //       name(module) {
  //         const packageName = module.context.match(
  //           /[\\/]node_modules[\\/](.*?)([\\/]|$)/
  //         )[1]
  //         // 避免服务端不支持@
  //         return `npm.${packageName.replace('@', '')}`
  //       },
  //       priority: 10
  //     }
  //   }
  // }

  // config.optimization.splitChunks(newConfig)

  // 2021-1028-调整拆包规则
  // 参考https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
  // 将node_modules所有模块拆分成单独的包
  const splitAllNodeModulesVendors = config => {
    if (process.env.NODE_ENV !== 'production') return

    // 只打包一个runtime包
    // https://webpack.docschina.org/configuration/optimization/#optimizationruntimechunk
    config.optimization.runtimeChunk({
      name: 'runtime-webpack'
    })

    // 重置optimization.splitChunks
    // 将每个node_modules中的包拆成单独的包
    config.optimization.splitChunks({
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        // ...oldSplitChunkConfig.cacheGroups,
        // 追加一个拆包规则，将node_modules拆成独立的包，适合http/2
        // http/1.1 会有并发限制(chrome 6)
        'single-vendor': {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1]
            // 避免服务端不支持@
            return `npm.${packageName.replace('@', '')}`
          },
          priority: 10
        }
      }
    })
  }

  module.exports = { splitAllNodeModulesVendors }
}

module.exports = { splitAllNodeModulesVendors }
