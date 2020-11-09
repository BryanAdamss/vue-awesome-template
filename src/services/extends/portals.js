/**
 * @author GuangHui
 * @description Portals
 */

import Vue from 'vue'

const instanceMap = new Map()

export const getInstanceMap = () => instanceMap

export const append2Body = (compOptions, propsData = {}) => {
  const CompClazz = Vue.extend(compOptions)
  let instance = new CompClazz({ propsData })

  const { $el, _uid } = instance.$mount()

  // 销毁后，从body中移除
  instance.$once('hook:destroyed', () => {
    document.body.removeChild(instance.$el)

    instance = null
    instanceMap.delete(_uid)
  })

  document.body.appendChild($el)

  instanceMap.set(_uid, instance)

  return () => removeFromBody(_uid)
}

export const removeFromBody = uid => {
  const instance = instanceMap.get(uid)
  if (!instance) return
  console.log(' instance.$destroy', instance.$destroy)
  instance.$destroy()
}
