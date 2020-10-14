<script>
/**
 * * ErrorTips
 */

export default {
  name: 'ErrorTips',
  functional: true,
  render(h, { data, children }) {
    const tips = data.attrs && data.attrs.tips
      ? data.attrs.tips
      : '加载出错，请尝试其它方式预览'

    return h('p', {
      style: {
        color: '#fff',
        'font-size': '16px',
        'text-align': 'center'
      }
    }, children || tips)
  }
}
</script>
