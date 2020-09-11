/**
 * @author GuangHui
 * @description 全局Storage
 */

import { GLOBAL_NAME_SPACE } from 'Config'

import Saver from 'Plugins/saver'

/**
 * 生成全局的localStorage
 */
export const _getNewGlobalSaver = moduleName =>
  new Saver({ globalNamespace: GLOBAL_NAME_SPACE, moduleName })

/**
 * 生成全局sessionStorageSaver
 */
export const _getNewGlobalSessionSaver = moduleName =>
  new Saver({
    moduleName,
    isSession: true,
    globalNamespace: GLOBAL_NAME_SPACE
  })

export const globalSaver = _getNewGlobalSaver()
export const globalSessionSaver = _getNewGlobalSessionSaver()
