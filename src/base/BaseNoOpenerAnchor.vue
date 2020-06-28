<script>
/**
 * * BaseNoOpenerAnchor
 * * 无opener的a标签
 */

export default {
  name: 'BaseNoOpenerAnchor',
  functional: true,
  components: {},
  mixins: [],
  props: {
    href: {
      type: String,
      required: true
    },
    target: {
      type: String,
      default: '_blank'
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {},
  methods: {},
  render(h, { props, data, children }) {
    const { href, target } = props

    const dataObj = {
      ...data,
      attrs: {
        href,
        target,
        rel: 'noopener'
      }
    }
    return h('a', dataObj, children)
  }
}
</script>
