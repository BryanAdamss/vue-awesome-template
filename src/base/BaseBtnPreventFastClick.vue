<script>
/**
 * * BaseBtnPreventFastClick
 * * 防暴击按钮
 */

import { debounce } from 'Utils'

export default {
  name: 'BaseBtnPreventFastClick',
  functional: true, // * 函数式组件(无响应式数据，无this)
  render(h, context) {
    const { props, children, data, listeners } = context

    // * 组件上不需要显示tag特性
    delete data.attrs.tag

    const $_debouncedClickHandler = listeners.click
      ? debounce(
        listeners.click,
        300,
        true // * 首次点击需要立即执行
      )
      : null

    const newData = $_debouncedClickHandler
      ? {
        ...data,
        on: {
          click: $_debouncedClickHandler
        }
      }
      : data

    return h(props.tag, newData, children)
  }
}
</script>
