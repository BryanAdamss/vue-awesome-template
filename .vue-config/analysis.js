/**
 * @author GuangHui
 * @description analysis
 */

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

// 启用打包分析
const enableBundleAnalysis = config => {
  if (process.env.NODE_ENV !== 'production') return

  if (process.env.VUE_APP_BUNDLE_ANALYSIS) {
    config.plugin('bundle-analysis').use(BundleAnalyzerPlugin)
  }
}

module.exports = { enableBundleAnalysis }
