'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
// * 2020-0617-添加自动添加cdn插件(开发环境使用node_modules、生产使用cdn)
// * webpack 配置cdn原理文章https://www.jianshu.com/p/9248db0349fb
// * https://github.com/shirotech/webpack-cdn-plugin
// * webpack 3.x 使用webpack-cdn-plugin@1
// * webpack 4.x 使用webpack-cdn-plugin@latest
const WebpackCdnPlugin = require('webpack-cdn-plugin')
const CDN_CONFIG = {
  modules: [
    {
      name: 'vue',
      var: 'Vue',
      path: 'dist/vue.runtime.min.js'
    },
    {
      name: 'vue-router',
      var: 'VueRouter',
      path: 'dist/vue-router.min.js'
    },
    {
      name: 'vuex',
      var: 'Vuex',
      path: 'dist/vuex.min.js'
    }
  ],
  prodUrl: '//cdn.jsdelivr.net/npm/:name@:version/:path'
}

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

// * 2019-0725-添加vue-devtools open-in-editor功能需要的中间件
const openInEditor = require('launch-editor-middleware')

// * 2019-0111-添加资源导入插件
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

// * 2019-0124-添加prefetch
const PreloadWebpackPlugin = require('preload-webpack-plugin')

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    // * 2019-0725-指明需要使用vscode打开组件
    before(app) {
      app.use('/__open-in-editor', openInEditor('code'))
    },
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(config.dev.assetsPublicPath, 'index.html')
        }
      ]
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // * 2020-0617-webpack-cdn-plugin
    new WebpackCdnPlugin(CDN_CONFIG),
    // * 2019-0111-开发环境导入公式相关资源
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [
        // *  2019-0111-导入dllVendor
        '/static/build/dll/dll.dllVendor.js',
        '/static/formula/katex/katex.css',
        '/static/formula/katex/katex.min.js',
        '/static/formula/mathjax/MathJax.js?config=TeX-AMS_CHTML',
        '/static/formula/mathjax-config-cutom.js'
      ],
      append: false,
      publicPath: false
    }),
    // * 2019-0124-prefetch 所有异步chunk
    new PreloadWebpackPlugin({
      rel: 'prefetch'
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      },
      {
        // * 2019-0111-提供dllVendor文件
        from: path.resolve(__dirname, './dll/*.js'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    // * 2018-1226-添加vconsole
    new webpack.ProvidePlugin({
      Vconsole: ['vconsole']
    }),
    // * 2019-0103-引入dllVendor.manifest
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dll/dll.dllVendor.manifest.json')
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`
            ]
          },
          onErrors: config.dev.notifyOnErrors
            ? utils.createNotifierCallback()
            : undefined
        })
      )

      resolve(devWebpackConfig)
    }
  })
})
