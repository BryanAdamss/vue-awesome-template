/**
 * @author GuangHui
 * @description 开启vconsole
 */

import { VCONSOLE_DEBUG } from 'Config'

const loadVconsole = () => {
  import(/* webpackChunkName:'vconsole' */ 'vconsole/dist/vconsole.min.js')
    .then(({ default: Vconsole }) => {
      /* eslint-disable no-unused-vars */
      var vConsole = new Vconsole()
    })
    .catch(err => {
      console.log('vconsole', err)
    })
}

export function vconsoleProvider() {
  if (!VCONSOLE_DEBUG) return

  let count = 0
  let timer = null
  let loaded = false

  const handleClick = () => {
    count++
    clearTimeout(timer)

    if (count >= 10) {
      clearTimeout(timer)
      count = 0

      if (!loaded) {
        loaded = true

        loadVconsole()

        document.documentElement.removeEventListener(
          'click',
          handleClick,
          false
        )
      }
    } else {
      timer = setTimeout(() => {
        clearTimeout(timer)
        count = 0
      }, 200)
    }
  }

  document.documentElement.addEventListener('click', handleClick, false)
}
