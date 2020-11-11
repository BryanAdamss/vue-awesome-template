/**
 * @author GaungHui
 * @description 网络情况侦测
 */

import bus from 'Plugins/event-bus'

export const bindNetworkChangeEvent = () => {
  window.addEventListener(
    'online',
    () => {
      bus.$emit('network-change', true)
    },
    false
  )

  window.addEventListener(
    'offline',
    () => {
      bus.$emit('network-change', false)
    },
    false
  )
}
