<template>
  <div
    class="c-Formula"
    eslint-disable-next-line
    v-html="formatedHtml(htmlString)"
  />
</template>

<script>
/**
 * @description 基础公式渲染组件
 */

import { timeChunk } from 'Utils'

window.__formula_err_queues__ = []
window.__formula_err_timer__ = null

export default {
  name: 'BaseFormulaRender',
  props: {
    htmlString: {
      type: String,
      default: ''
    }
  },
  methods: {
    formatedHtml() {
      try {
        return this.htmlString.replace(/\\\(.*?\\\)/g, function(html) {
          // * 剔除异常字符
          html = html
            .replace(/\\\(/g, '')
            .replace(/\\\)/g, '')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/，/g, ', ')
            .replace(//g, '')
            .replace(/&times;/g, '\\times ')
            .replace(/&divide;/g, '\\div ')
            .replace(/&nbsp;/g, ' ')
            .replace(/&middot;/g, '.')
            .replace(/①/g, '(1)')
            .replace(/②/g, '(2)')
            .replace(/③/g, '(3)')
            .replace(/④/g, '(4)')
            .replace(/′/g, "'")
            .replace(/﹡/g, '*')
            .replace(/～/g, '~')
            .replace(/&quot;/g, '"')
          return (
            ' ' +
            katex.renderToString(html, {
              throwOnError: false,
              unicodeTextInMathMode: true
            }) +
            ' '
          )
        })
      } catch (err) {
        // * 解析错误时，降级使用MathJax
        console.log(err)

        // * 保存报错公式元素
        if (!this.timer) {
          this.timer = setTimeout(() => {
            clearTimeout(this.timer)
            this.timer = null
            window.__formula_err_queues__.push(this.$el)
          }, 20)
        }

        // * 1000ms后无报错公式，则进行分时渲染
        clearTimeout(window.__formula_err_timer__)
        window.__formula_err_timer__ = setTimeout(() => {
          clearTimeout(window.__formula_err_timer__)
          window.__formula_err_timer__ = null

          const mathJaxRender = timeChunk(
            window.__formula_err_queues__,
            el => {
              MathJax.Hub.Queue(['Typeset', MathJax.Hub, el])
            },
            1,
            20
          )

          mathJaxRender()
        }, 1000)
        return this.htmlString
      }
    }
  }
}
</script>
