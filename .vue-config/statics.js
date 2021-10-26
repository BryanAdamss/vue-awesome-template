/**
 * @author GuangHui
 * @description statics
 */

// 配置静态资源
const setStatics = config => {
  const htmlPlug = config.plugin('html')

  const customs = {
    head: {
      css: [
        {
          noBaseURL: false,
          path: 'formula/katex/katex.css'
        }
      ],
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

    // 生产环境不移除html中的注释
    if (process.env.NODE_ENV === 'production') {
      args[0].minify.removeComments = false
    }

    return args
  })
}

module.exports = {
  setStatics
}
