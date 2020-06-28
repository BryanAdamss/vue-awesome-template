const path = require('path')
const WebpackCdnPlugin = require('webpack-cdn-plugin')

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
        name: 'css-vars-ponyfill',
        var: 'cssVars',
        path: 'dist/css-vars-ponyfill.min.js'
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
      js: ['js/flexible-custom.js', 'js/fastclick-custom.js']
    },
    body: {
      js: [
        'formula/katex/katex.min.js',
        'formula/mathjax/MathJax.js?config=TeX-AMS_CHTML',
        'formula/mathjax-config-cutom.js'
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
      // 不警告且去除console、debugger
      warnings: false,
      drop_console: true,
      drop_debugger: true
    }
    return args
  })
}

module.exports = {
  chainWebpack: config => {
    svgSprite(config)

    setCDN(config)

    setStatics(config)

    dropConsole(config)
  },
  pluginOptions: {
    // vue-cli-plugin-auto-alias 配置
    'vue-cli-plugin-auto-alias': {
      rootDirName: 'src',
      alias: {}
    },
    // vue-cli-plugin-style-resources-loader 配置
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/sass/utils/_variablesCustom-m.scss'),
        path.resolve(__dirname, 'src/sass/utils/_variables.scss'),
        path.resolve(__dirname, 'src/sass/utils/_function.scss'),
        path.resolve(__dirname, 'src/sass/utils/_mixins.scss'),
        path.resolve(__dirname, 'src/sass/utils/_mediaQuery.scss'),
        path.resolve(__dirname, 'src/sass/utils/_placeholders.scss')
      ]
    }
  }
}
