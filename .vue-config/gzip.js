/**
 * @author GuangHui
 * @description gzip
 */

const CompressionWebpackPlugin = require('compression-webpack-plugin')

// 启用本地 gzip 压缩
const enableGZip = config => {
  if (!process.env.VUE_APP_ENABLE_GZIP) return

  config.plugin('gzip').use(CompressionWebpackPlugin, [
    {
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 10 * 1024, // 10KB
      minRatio: 0.8
    }
  ])
}

module.exports = { enableGZip }
