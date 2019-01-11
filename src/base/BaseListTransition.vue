<script>
/**
 * * BaseListTransition
 */

import Velocity from 'velocity-animate'

export default {
  name: 'BaseListTransition',
  functional: true,
  render(h, context) {
    let { props, children } = context

    let dataObj = {
      props: {
        tag: props.tag || 'div',
        css: false // * 关闭css检测
      },
      on: {
        beforeEnter: function(el) {
          el.style.opacity = 0
          el.style.height = 0
        },
        enter: function(el, done) {
          let delay = el.dataset.index * 150
          setTimeout(function() {
            Velocity(
              el,
              {
                opacity: 1,
                height: '1.6em'
              },
              {
                complete: done
              }
            )
          }, delay)
        },
        leave: function(el, done) {
          let delay = el.dataset.index * 150
          setTimeout(function() {
            Velocity(
              el,
              {
                opacity: 0,
                height: 0
              },
              {
                complete: done
              }
            )
          }, delay)
        }
      }
    }
    return h('transition-group', dataObj, children)
  }
}
</script>
