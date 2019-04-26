/**
 * @author GuangHui
 * @description directive、filters 注册器
 */
import Vue from 'vue'

import directivesMap from 'Directives'

export function directiveRegister() {
  for (let key in directivesMap) {
    if (directivesMap.hasOwnProperty(key)) {
      const { name, directive } = directivesMap[key]
      if (name && directive) Vue.directive(name, directive)
    }
  }
}
