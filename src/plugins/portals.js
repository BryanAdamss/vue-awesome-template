/**
 * @author GuangHui
 * @description Portals
 */

import Vue from 'vue'

const instanceMap = new Map()

export const getInstanceMap = () => instanceMap

export const getInstanceByUid = uid => instanceMap.get(uid)

export const appendComp2Body = (compOptions, propsData = {}) => {
  const CompClazz = Vue.extend(compOptions)
  let instance = new CompClazz({ propsData })

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
