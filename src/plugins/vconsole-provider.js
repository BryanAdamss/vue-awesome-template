/**
 * @author GuangHui
 * @description 开启vconsole
 */

import { VCONSOLE_DEBUG } from 'Config'

const loadVconsole = () => {
  let script = document.createElement('script')
  script.src =
    'https://cdn.jsdelivr.net/npm/vconsole@3.3.4/dist/vconsole.min.js'
  script.async = true

  script.onload = () => {
    // eslint-disable-next-line
    var vConsole = new VConsole()
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
