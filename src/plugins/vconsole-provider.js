/**
 * @author ghchu
 * @description 开启vconsole
 */

import { VCONSOLE_DEBUG } from 'Config'

export function vconsoleProvider() {
  if (VCONSOLE_DEBUG && process.env.NODE_ENV !== 'production') {
    /* eslint-disable no-unused-vars */
    var vConsole = new Vconsole()
  }
}
