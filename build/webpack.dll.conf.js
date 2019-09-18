const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const { dependencies } = require('../package.json')

console.log(Object.keys(dependencies))

const dllWebpackConfig = {
  entry: {
    // * 将下列第三方库，打包到一个dllVender.js中
    // dllVendor: [
    //   'vue/dist/vue.esm.js',
    //   'axios',
    //   'vuex',
    //   'vue-router',
    //   'better-scroll',
    //   'velocity-animate',
    //   'vue-lazyload',
    //   'babel-polyfill',
    //   'element-ui'
    // ]
    dllVendor: Object.keys(dependencies).map(depName =>
      depName === 'vue' ? 'vue/dist/vue.esm.js' : depName
    )
  },
  output: {
    // * 2019-0103-输出dllVendor.js到build/dll文件夹中
    path: path.join(__dirname, './dll'),
    filename: 'dll.[name].js',
    // * library值需要和 new webpack.DllPlugin选项中的name一致
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      // * 2019-0103-输出dllVendor.manifest.json到build/dll文件夹中
      path: path.join(__dirname, './dll/dll.[name].manifest.json'),
      // * 需要和output中library值一致
      name: '[name]_[hash]'
    }),
    // * 压缩dllVendor.js文件
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: false,
      parallel: true
    })
  ]
}

module.exports = dllWebpackConfig
