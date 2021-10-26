/**
 * @author GuangHui
 * @description vue配置
 */

const path = require('path')

const { setCDN } = require('./.vue-config/cdn.js')
const { svgSprite } = require('./.vue-config/svg.js')
const { enableGZip } = require('./.vue-config/gzip.js')
const { setStatics } = require('./.vue-config/statics.js')
const { dropConsole } = require('./.vue-config/drop-console.js')
const { enableBundleAnalysis } = require('./.vue-config/analysis.js')
const { splitAllNodeModulesVendors } = require('./.vue-config/split.js')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist', // 打包产物存放目录，默认dist
  assetsDir: 'static', // 非/public目录静态资源存放目录(经过webpack处理的资源)，相对于outputDir
  indexPath: 'views/index.html', // 入口html地址，相对于outputDir
  lintOnSave: false, // 保存时lint，关闭
  filenameHashing: true, // 文件content hash，若资源要上CND，且外层有唯一的版本号文件夹时，内部资源无需要做控制
  // transpileDependencies: [/node_modules[/\\]@hw/], // 需要被转码的依赖包
  productionSourceMap: false, // 生产环境sourceMap
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
        path.resolve('src/sass/utils/_use.scss'),
        path.resolve('src/sass/utils/_function.scss'),
        path.resolve('src/sass/utils/_color-palette.scss'),
        path.resolve('src/sass/utils/_vars-default.scss'),
        path.resolve('src/sass/utils/_vars-m.scss'),
        path.resolve('src/sass/utils/_mixins.scss'),
        path.resolve('src/sass/utils/_mediaQuery.scss'),
        path.resolve('src/sass/utils/_placeholders.scss')
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
          require('./.build/plugins/postcss-plugin-add-var-value.js')
        ]
      }
    }
  }
}
