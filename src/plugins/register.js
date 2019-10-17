/**
 * @author GuangHui
 * @description directive、filters 注册器
 */
import Vue from 'vue'

// import directivesMap from 'Directives'

import directivesLoader from 'Plugins/directives-loader'

import filtersMap from 'Config/filters-map'
// import elementUIList from 'Config/element-ui-list'

export function directiveRegister() {
  const directives = directivesLoader()
  directives.forEach(({ name, directive }) => Vue.directive(name, directive))
}

export function filterRegister() {
  Object.entries(filtersMap).forEach(([key, value]) => Vue.filter(key, value))
}

// export function elCompRegister() {
//   const str2kebab = str => str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
//   elementUIList.forEach(compName => {
//     const comp = require('element-ui/lib/' + str2kebab(compName))
//     comp && comp.default && Vue.use(comp.default)
//   })
// }
