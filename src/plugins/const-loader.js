/**
 * @author GuangHui
 * @description 常量加载器
 */

import { isEmpty } from 'Utils/type-judge'

export function constLoader(vue, constantObj) {
  if (isEmpty(constantObj) || !vue._isVue) {
    throw new Error('首个参数非vue实例或参数为空')
  }

  Object.keys(constantObj).forEach(key => (vue[key] = constantObj[key]))
}
