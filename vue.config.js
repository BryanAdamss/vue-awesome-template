const path = require('path')
const WebpackCdnPlugin = require('webpack-cdn-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

// 设置svg sprite
const svgSprite = config => {
  const svgRule = config.module.rule('svg')

  svgRule.uses.clear()

  svgRule.include
    .add(path.resolve(__dirname, 'src/assets/svgs'))
    .end()
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({})
    .end()
    .use('svgo-loader')
    .loader('svgo-loader')
    .options({
      plugins: [{ removeViewBox: false }, { removeXMLNS: true }]
    })
    .end()
}

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

// 配置静态资源
const setStatics = config => {
  const htmlPlug = config.plugin('html')

  const customs = {
    head: {
      css: ['formula/katex/katex.css'],
      js: [
        {
          attrs: ['async'],
          path: 'js/flexible-custom.js'
        },
        {
          attrs: ['async'],
          path: 'js/fastclick-custom.js'
        }
      ]
    },
    body: {
      js: [
        // {
        //   // attrs: ['defer'],  // 可以追加到script上的attr
        //   noBaseURL: true, // 不需要拼接baseURL
        //   path:
        //     'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.5.207/es5/build/pdf.js'
        // },
      ]
    }
  }

  htmlPlug.tap(args => {
    args[0].customs = customs
    return args
  })
}

// 删除console、debugger
const dropConsole = config => {
  if (process.env.NODE_ENV !== 'production') return

  const terser = config.optimization.minimizer('terser')
  terser.tap(args => {
    args[0].terserOptions.compress = {
      ...args[0].terserOptions.compress,
      // 不在控制台警告并去除console、debugger
      warnings: false,
      drop_console: true,
      drop_debugger: true
    }
    return args
  })
}

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

// 启用打包分析
const enableBundleAnalysis = config => {
  if (process.env.NODE_ENV !== 'production') return

  if (process.env.VUE_APP_BUNDLE_ANALYSIS) {
    config.plugin('bundle-analysis').use(BundleAnalyzerPlugin)
  }
}

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

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    // https://github.com/chimurai/http-proxy-middleware
    proxy: {
      // * 经过下面配置 '/api/post'这个请求路径就会变成'http://jsonplaceholder.typicode.com/post'
      // 代理所有/api开头的请求
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        ws: true,
        changeOrigin: true, // changes the origin of the host header to the target URL
        // secure:false, // 启用https
        pathRewrite: {
          // 将最终url中匹配正则的部分替换成对应字符串
          // 下面是将最终url中开头的/api替换成''
          '^/api': ''
        }
      }
    }
  },
  chainWebpack: config => {
    svgSprite(config)

    setCDN(config)

    setStatics(config)

    dropConsole(config)

    enableGZip(config)

    enableBundleAnalysis(config)

    splitAllNodeModulesVendors(config)
  },
  pluginOptions: {
    // vue-cli-plugin-auto-alias 配置
    'vue-cli-plugin-auto-alias': {
      rootDirName: 'src',
      case: 'pascalCase',
      alias: {}
    },
    // vue-cli-plugin-style-resources-loader 配置
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/sass/utils/_function.scss'),
        path.resolve(__dirname, 'src/sass/utils/_color-palette.scss'),
        path.resolve(__dirname, 'src/sass/utils/_vars-default.scss'),
        path.resolve(__dirname, 'src/sass/utils/_vars-m.scss'),
        path.resolve(__dirname, 'src/sass/utils/_mixins.scss'),
        path.resolve(__dirname, 'src/sass/utils/_mediaQuery.scss'),
        path.resolve(__dirname, 'src/sass/utils/_placeholders.scss')
      ]
    }
  },
  css: {
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
        plugins: [
          // 使用自定义插件为不兼容css var的浏览器提供备选样式
          require('./src/plugins/postcss-plugin-add-var-value.js')
        ]
      }
    }
  }
}
