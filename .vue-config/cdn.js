/**
 * @author GuangHui
 * @description cdn
 */

const WebpackCdnPlugin = require('webpack-cdn-plugin')

// 设置cdn
const setCDN = config => {
  if (process.env.NODE_ENV !== 'production') return

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
      },
      {
        name: 'element-ui',
        var: 'ELEMENT',
        path: 'lib/index.js',
        style: 'lib/theme-chalk/index.css'
      },
      {
        name: 'axios',
        var: 'axios',
        path: 'dist/axios.min.js'
      },
      {
        name: 'css-vars-ponyfill',
        var: 'cssVars',
        path: 'dist/css-vars-ponyfill.min.js'
      },
      {
        name: 'velocity-animate',
        var: 'Velocity',
        path: 'velocity.min.js'
      },
      {
        name: 'better-scroll',
        var: 'BScroll',
        path: 'dist/bscroll.min.js',
        version: '1.15.2'
      },
      {
        name: '@bryanadamss/num2chn',
        var: 'num2Chn',
        path: 'dist/num2chn.umd.js'
      },
      {
        name: '@bryanadamss/drawing-board',
        var: 'DrawingBoard',
        path: 'dist/drawing-board.umd.js'
      }
    ],
    prodUrl: '//cdn.jsdelivr.net/npm/:name@:version/:path'
  }

  config.plugin('cdn-plugin').use(WebpackCdnPlugin, [CDN_CONFIG])
}

module.exports = {
  setCDN
}
