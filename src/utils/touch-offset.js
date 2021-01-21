/**
 * @author GuangHui
 * @description 获取TouchEvent的offsetX
 * TouchEvent没有offsetX，通过矩阵计算模拟offsetX
 * 支持transform rotate
 */

import { inv, multiply, ones } from 'mathjs'

/**
 * 获取元素左上角offset坐标
 *
 * @export
 * @param {Element} el 目标元素
 * @return {Object} 包含坐标的对象
 */
export function getVertexPosition(el) {
  let currentTarget = el
  let top = 0
  let left = 0
  while (currentTarget !== null) {
    top += currentTarget.offsetTop
    left += currentTarget.offsetLeft
    currentTarget = currentTarget.offsetParent
  }
  return { top, left }
}

/**
 * 从transform style逆向解析出相关属性
 *
 * @export
 * @param {Element} el 目标元素
 * @return {Object} 包含转换矩阵、转换源的对象
 */
export function getTranformData(el) {
  const style = window.getComputedStyle(el)
  const transform = style.transform
  const transformOrigin = style.transformOrigin

  const origin = { x: 0, y: 0 }
  let matrix = ones([3, 3])
  if (transform !== 'none') {
    const originArray = transformOrigin.split(' ')
    origin.x = parseInt(originArray[0])
    origin.y = parseInt(originArray[1])

    const matrixString = transform.match(/\(([^)]*)\)/)[1]
    const stringArray = matrixString.split(',')
    let temp = []
    stringArray.forEach(value => {
      temp.push(parseFloat(value.trim()))
    })
    temp = [
      [temp[0], temp[2], temp[4]],
      [temp[1], temp[3], temp[5]],
      [0, 0, 1]
    ]

    matrix = inv(temp)
  } else {
    matrix = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]
  }
  return { matrix, origin }
}

/**
 * 获取偏移数组
 *
 * @export
 * @param {HTMLElement} element 目标节点
 * @return {Array} 偏移数组
 */
export function getDataByEl(element) {
  if (!element) return []

  const data = []
  let el = element

  while (el !== null && el.nodeType === 1) {
    const { left, top } = getVertexPosition(el)
    const transformData = getTranformData(el)

    if (data.length > 0) {
      data[0].vertex.left -= left
      data[0].vertex.top -= top
    }
    data.unshift({
      temp: transformData.matrix,
      origin: transformData.origin,
      vertex: {
        left,
        top
      }
    })
    el = el.parentNode
  }
}

/**
 * 计算位置
 *
 * @export
 * @param {Number} x e.pageX
 * @param {Number} y e.pageY
 * @param {Array} [data=[]] 缓存的数据列表
 * @return {Object} 包含转换后offsetX，offsetY坐标的对象
 */
export function computPosition(x, y, data = []) {
  data.forEach(obj => {
    const {
      temp,
      origin,
      vertex: { left, top }
    } = obj
    x = x - left - origin.x
    y = y - top - origin.y
    const result = multiply(temp, [x, y, 1])
    x = result[0] + origin.x
    y = result[1] + origin.y
  })
  return { x, y }
}

/**
 * 获取 TouchEvent offset
 *
 * @export
 * @param {Number} x e.pageX
 * @param {Number} y e.pageY
 * @param {Element|Array} elOrCache 元素或缓存的数据
 * @return {Object} 包含x,y坐标的对象
 */
export function getTouchOffset(pageX, pageY, elOrCache) {
  if (pageX == null || pageY == null || elOrCache == null)
    throw new Error('pageX pageY elOrCache can not be empty')

  const data = elOrCache instanceof Node ? getDataByEl(elOrCache) : elOrCache

  const { x, y } = computPosition(pageX, pageY, data)

  return { x, y, data }
}
