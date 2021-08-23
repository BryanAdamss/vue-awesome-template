/**
 * @author GaungHui
 * @description 网络情况侦测
 */

import { eventBus } from 'Plugins/event-bus'

export const bindNetworkChangeEvent = () => {
  window.addEventListener(
    'online',
    () => {
      eventBus.$emit('network-change', true)
    },
    false
  )

  window.addEventListener(
    'offline',
    () => {
      eventBus.$emit('network-change', false)
    },
    false
  )
}
