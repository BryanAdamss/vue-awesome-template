/**
 * @author GuangHui
 * @description 生成路由数组，主要用来根据Routes下文件生成对应路由数组
 */

// require.context()返回一个函数fn
// fn函数包含三个属性
// fn.resolve 一个函数；接收一个参数request,request为test文件夹下面匹配文件的相对路径,返回这个匹配文件相对于整个工程的相对路径
// fn.keys 一个函数；返回匹配成功模块的名字组成的数组
// fn.id 执行环境的id,返回的是一个字符串,主要用在module.hot.accept

// fn本身也可以接收一个fn.keys中的一项做为参数，返回文件对应内容

// 线上需要被排除的路由文件
const excludeRouteFiles = [
  {
    env: ['test', 'prod'], // 需要排除的环境
    name: './home-page.js' // 首页
  }
]

// 过滤出不在过滤列表中的路由文件
const getFilteredKeys = keys =>
  keys.filter(
    key =>
      !excludeRouteFiles.some(
        file =>
          file.name === key &&
          file.env.includes(process.env.VUE_APP_TARGET_SERVER)
      )
  )

export default function routesLoader(defaultRoutes = []) {
  let routes = [].concat(defaultRoutes)

  // ! require.context的入参不能使用变量传入，否则会报Critical dependency: require function is used in a way in which dependencies cannot be statically extracted错误
  // 导入Routes目录下所有非index.js的文件
  const files = require.context('Routes', false, /^(?!\.\/index\b).*\.js$/)
  console.log(files.keys())
  const filteredKeys = getFilteredKeys(files.keys())
  console.log(filteredKeys)
  filteredKeys.forEach(key => {
    const file = files(key)

    // 将file的default导出模块添加到routes数组中
    routes = routes.concat(file.default)
  })
  return routes
}
