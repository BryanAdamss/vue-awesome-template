<script>
/**
 * * BaseClickAreaExpand
 */
export default {
  name: 'BaseClickAreaExpand',
  functional: true,
  render(h, context) {
    let { data, props, children } = context

    // * 组件上不需要显示tag特性
    delete data.attrs.tag

    return h(
      props.tag,
      {
        ...data,
        class: 'c-BaseClickAreaExpand'
      },
      children // * 返回一个VNode数组
    )
  }
}
</script>

<style lang="scss">
.c-BaseClickAreaExpand {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: -1em;
    right: -1em;
    bottom: -1em;
    left: -1em;
  }
}
</style>
