/**
 * @author GuangHui
 * @description split
 */

// 将node_modules所有模块拆分成单独的包
const splitAllNodeModulesVendors = config => {
  if (process.env.NODE_ENV !== 'production') return

  const oldConfig = config.optimization.get('splitChunks')

  const newConfig = {
    ...oldConfig,
    cacheGroups: {
      ...oldConfig.cacheGroups,
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
  }

  config.optimization.splitChunks(newConfig)
}

module.exports = { splitAllNodeModulesVendors }
