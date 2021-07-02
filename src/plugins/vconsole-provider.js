/**
 * @author GuangHui
 * @description 开启vconsole
 */

import {
  GLOBAL_NAME_SPACE,
  VCONSOLE_DEBUG,
  VCONSOLE_ENABLE_COUNT,
  VCONSOLE_ENABLE_INTERVAL
} from 'Config'

const loadVconsole = () => {
  let script = document.createElement('script')
  script.src =
    'https://cdn.jsdelivr.net/npm/vconsole@3.3.4/dist/vconsole.min.js'
  script.async = true

  script.onload = () => {
    // eslint-disable-next-line
    if(VConsole){
      const obj = {
        // eslint-disable-next-line
        vconsole: new VConsole()
      }

      window[GLOBAL_NAME_SPACE] = window[GLOBAL_NAME_SPACE]
        ? Object.assign({}, window[GLOBAL_NAME_SPACE], obj)
        : obj
    }
    script = null
  }

  script.onerror = err => {
    console.log('loadVconsole', err)
    script = null
  }

  document.body.appendChild(script)
}

export function vconsoleProvider() {
  if (!VCONSOLE_DEBUG) return

  let count = 0
  let timer = null
  let loaded = false

  const handleClick = () => {
    count++
    clearTimeout(timer)
    // 点击10次加载vconsole
    if (count >= VCONSOLE_ENABLE_COUNT) {
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
      }, VCONSOLE_ENABLE_INTERVAL)
    }
  }

  document.documentElement.addEventListener('click', handleClick, false)
}
