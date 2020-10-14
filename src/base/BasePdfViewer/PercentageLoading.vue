<script>
/**
 * * PercentageLoading
 */

export default {
  name: 'PercentageLoading',
  functional: true,
  render(h, { data }) {
    return h('p', {
      style: {
        color: '#fff',
        'font-size': '16px',
        'text-align': 'center'
      }
    }, [`${data.attrs.percentage}%`])
  }
}
</script>
