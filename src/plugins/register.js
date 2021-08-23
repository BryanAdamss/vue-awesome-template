/**
 * @author GuangHui
 * @description directive、filters 注册器
 */
import Vue from 'vue'

import { filtersMap } from 'Config/filters-map'

import { directivesLoader } from 'Plugins/directives-loader'
// import elementUIList from 'Config/element-ui-list'

export function directiveRegister() {
  const directives = directivesLoader()
  directives.forEach(({ name, directive }) => Vue.directive(name, directive))
}

export function filterRegister() {
  Object.entries(filtersMap).forEach(([key, value]) => Vue.filter(key, value))
}

// ! 如果你的 require 含有表达式(expressions)，就会创建一个上下文(context)，因为在编译时(compile time)并不清楚具体导入哪个模块。require将忽略变量，提取出常量，这样可能会导致导入整个目录下的所有模块!!!，所以下面函数会导入element-ui/lib/目录下的所有文件，导致最后打包体积急剧膨胀
// ! 具体参考下面链接
// ! https://webpack.docschina.org/guides/dependency-management/#%E5%B8%A6%E8%A1%A8%E8%BE%BE%E5%BC%8F%E7%9A%84-require-%E8%AF%AD%E5%8F%A5
// export function elCompRegister() {
//   const str2kebab = str => str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
//   elementUIList.forEach(compName => {
//     const comp = require('element-ui/lib/' + str2kebab(compName))
//     comp && comp.default && Vue.use(comp.default)
//   })
// }
