<script>
/**
 * @description 基础公式渲染组件
 */

import { uuid } from 'Utils'

import KatexWrapper from 'Services/extends/katex-wrapper'
import MathJaxWrapper from 'Services/extends/mathjax-wrapper'

const katex = new KatexWrapper()
const mathjax = new MathJaxWrapper()

export default {
  name: 'BaseFormulaRender',
  props: {
    htmlString: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      html: ''
    }
  },
  created() {
    this.id = uuid()

    katex
      .render(this.htmlString)
      .then(katexedStr => {
        this.html = katexedStr
      })
      .catch(err => {
        console.log('katex render error', err)

        this.html = this.htmlString

        // 确保节点内有内容，再渲染
        this.$nextTick(() => {
          mathjax.render(this.id)
        })
      })
  },
  render(h) {
    return h('div', {
      class: ['c-Formula'],
      attrs: {
        id: this.id
      },
      domProps: {
        innerHTML: this.html
      }
    })
  }
}
</script>
