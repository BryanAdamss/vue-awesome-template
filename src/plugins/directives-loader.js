/**
 * @author GuangHui
 * @description 指令加载器，读取Directives目录下所有文件，并生成对应map
 */

export default function directivesLoader(defaultDirectives = []) {
  let directives = [].concat(defaultDirectives)

  // ! require.context的入参不能使用变量传入，否则会报Critical dependency: require function is used in a way in which dependencies cannot be statically extracted错误
  // 导入Directives目录下所有非index.js的文件
  const files = require.context('Directives', false, /^(?!\.\/index\b).*\.js$/)

  const reg = /([\w-]+)\.js$/ // 截取name

  files.keys().forEach(key => {
    const file = files(key)

    // 将file的default导出模块添加到routes数组中
    directives = directives.concat({
      name: key.match(reg)[1],
      directive: file.default
    })
  })

  return directives
}
