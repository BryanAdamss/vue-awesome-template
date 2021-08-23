/**
 * @author GuangHui
 * @description 水印
 */

import { watermarkSvg } from 'Utils/dom'

// eslint-disable-next-line
export default {
  bind(el, binding) {
    el.style.background = `url("${watermarkSvg(binding.value)}")`
  },
  componentUpdated(el, binding) {
    const { value, oldValue } = binding
    if (JSON.stringify(value) === JSON.stringify(oldValue)) return

    el.style.background = `url("${watermarkSvg(value)}")`
  }
}
