<script>
/**
 * * ErrorTips
 */

export default {
  name: 'ErrorTips',
  functional: true,
  render(h, { data, children }) {
    return h('p', {
      style: {
        color: '#fff',
        'font-size': '16px',
        'text-align': 'center'
      }
    }, children || '加载出错，请尝试其它方式预览')
  }
}
</script>
