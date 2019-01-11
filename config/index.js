'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

// * 2019-0111-生产环境区分不同打包模式(现在由于不同打包模式不做区分，所以路径一致，实际生产中，如果是prod，prodAssetsPath可设置成服务器静态资源路径)
const prodAssetsPath = process.env.BUILD_MODE === 'prod' ? './' : './'

// * 2019-0111-实际接口地址
const API_PROXY_URL = 'http://jsonplaceholder.typicode.com'
const API_PREFIX = '/api'

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // * 经过下面配置 '/api/post'这个请求路径就会变成'http://jsonplaceholder.typicode.com/post'
      // 代理所有/api开头的请求
      [API_PREFIX]: {
        target: API_PROXY_URL, // 目标url
        changeOrigin: true, // 更改host header的origin为target URL
        // secure: false,  // 如果是https接口，需要配置这个参数
        pathRewrite: {
          // 将最终url中匹配正则的部分替换成对应字符串
          // 下面是将最终url中开头的/api替换成''
          '^/api': ''
        }
      }
    },

    // Various Dev Server settings
    // host: 'localhost', // can be overwritten by process.env.HOST
    // * 2019-0111-外网访问
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    // * 打包后index.html路径
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    // * 静态资源一级目录
    assetsRoot: path.resolve(__dirname, '../dist'),
    // * 静态资源二级目录
    assetsSubDirectory: 'static',
    // * 静态资源发布路径
    assetsPublicPath: prodAssetsPath,

    /**
     * Source Maps
     */

    // * 2019-0103-关闭生产环境sourcemap
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
