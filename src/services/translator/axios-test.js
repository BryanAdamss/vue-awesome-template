/**
 * @author GuangHui
 * @description axios-test模块相关接口转换器
 */

import { isEmpty } from 'Utils/type-judge'

import { NO_VALID_RES_TIPS } from 'Services/const/axios-test'

/**
 * 格式化getPost接口返回数据
 *
 * @export
 * @param {*} [{ body, id, title, userId }={}] 接口原始返回结果
 * @returns 格式化后的返回结果
 */
export function formatGetPostRes(res) {
  if (isEmpty(res)) throw new Error(NO_VALID_RES_TIPS)

  return res
}
