/**
 * @author GuangHui
 * @description Portals
 */

import Vue from 'vue'

const instanceMap = new Map()

export const getInstanceMap = () => instanceMap

export const getInstanceByUid = uid => instanceMap.get(uid)

export const getCompInstance = (compOptions, propsData, listeners) => {
  const CompClazz = Vue.extend(compOptions)
  // let instance = new CompClazz({ propsData })
  // https://forum.vuejs.org/t/dynamically-add-vue-component-with-reactive-properties/17360/6
  // 通过_props传入props，所以不需要显示传递propsData
  // 不使用$props是因为$props只读，不可修改
  const instance = new CompClazz()

  // 绑定自定义事件
  Object.entries(listeners).forEach(([type, handler]) =>
    instance.$on(type, handler)
  )

  // 将compOptions.props中有而propsData中没有的key，拷贝到propsData中
  // 不用Object.assign，是因为传入的propsData可能是reactive的，必须保持它的reactive
  Object.entries(compOptions.props).forEach(([key, value]) => {
    if (!Object.prototype.hasOwnProperty.call(propsData, key)) {
      propsData[key] = value.default
    }
  })

  // 在mount之前覆盖_props
  instance._props = propsData

  return instance
}

export const appendComp2Body = (
  compOptions,
  propsData = {},
  listeners = {}
) => {
  let instance = getCompInstance(compOptions, propsData, listeners)

  let { $el, _uid } = instance.$mount()

  // 销毁后，从body中移除
  instance.$once('hook:destroyed', () => {
    document.body.removeChild($el)

    $el = null
    instance = null
    instanceMap.delete(_uid)
    _uid = null
  })

  document.body.appendChild($el)

  instanceMap.set(_uid, instance)

  return _uid
}

export const removeCompFromBody = uid => {
  const instance = getInstanceByUid(uid)
  if (!instance) return
  instance.$destroy()
}
