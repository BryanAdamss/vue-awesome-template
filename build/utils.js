'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

exports.assetsPath = function(_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function(options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS
      ? [cssLoader, postcssLoader]
      : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    // 添加全局引用sass文件的loader，这样就不用在每个组件中import 变量/mixin/placeholder了
    scss: generateLoaders('sass').concat({
      loader: 'sass-resources-loader',
      options: {
        resources: [
          // 每个组件都将自动导入以下scss文件，由于sass-resources-loader不支持在导入的文件中使用sass @import，无法将文件集中到一个文件(_utils.scss)中再导入，所以只能直接导入每个文件；注意导入的文件不要包含直接的css定义，因为导入的文件会在所有组件中使用，会造成代码重复
          path.resolve(__dirname, '../src/sass/utils/_variablesCustom-m.scss'),
          path.resolve(__dirname, '../src/sass/utils/_variables.scss'),
          path.resolve(__dirname, '../src/sass/utils/_function.scss'),
          path.resolve(__dirname, '../src/sass/utils/_mixins.scss'),
          path.resolve(__dirname, '../src/sass/utils/_mediaQuery.scss'),
          path.resolve(__dirname, '../src/sass/utils/_placeholders.scss')
          // path.resolve(__dirname, '../src/sass/utils/_utils.scss'),
        ]
      }
    }),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
