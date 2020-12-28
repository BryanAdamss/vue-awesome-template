/**
 * @author GuangHui
 * @description toast
 */

import IndexManager from 'Plugins/index-manager'
import { appendComp2Body, removeCompFromBody } from 'Plugins/portals'

const styleFactory = () => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  zIndex: new IndexManager().add(),
  transform: 'translate3d(-50%,-50%,0)',
  color: '#fff',
  fontSize: '0.8em',
  borderRadius: '0.2em',
  padding: '0.4em 0.8em',
  backgroundColor: 'rgba(0,0,0,0.5)',
  wordWrap: 'break-word',
  wordBreak: 'break-all',
  maxHeight: '80%',
  maxWidth: '80%',
  textAligh: 'center'
})

const DEFAULT_OPTIONS = {
  duration: 1500,
  msg: 'toast'
}

export const Toast = {
  name: 'Toast',
  functional: true,
  render(h, { data }) {
    const msg =
      data && data.attrs && data.attrs.msg
        ? data.attrs.msg
        : DEFAULT_OPTIONS.msg

    const child = h(
      'div',
      {
        style: styleFactory()
      },
      msg
    )

    return child
  }
}

const toast = (options = {}) => {
  const opt =
    typeof options === 'string'
      ? { ...DEFAULT_OPTIONS, msg: options }
      : {
          ...DEFAULT_OPTIONS,
          ...options
        }

  // https://forum.vuejs.org/t/functional-component-with-vue-extend/40752
  // https://stackoverflow.com/questions/53868593/vue-js-instantiate-functional-component-programmatically
  // Vue.extend + functional comp + $mount 会导致functional comp取不到context
  // 需要在functional comp上包一层非functional组件
  const wrapperComp4Toast = {
    name: 'WrapperComp4Toast',
    // 由于appendComp2Body是通过propsData传递props的
    // 又由于propsData不能在不声明props的情况下通过this.$props、this.$attrs来获取到
    // 所以，显示的声明了props，并通过attrs将$props传递到真正的Toast组件中
    props: Object.keys(DEFAULT_OPTIONS),
    render(h) {
      const child = h(Toast, { attrs: this.$props })

      const wrap = h(
        'transition',
        {
          props: {
            appear: true,
            name: 'el-fade-in',
            mode: 'out-in'
          }
        },
        [child]
      )
      return wrap
    }
  }

  const uid = appendComp2Body(wrapperComp4Toast, opt)

  const timer = setTimeout(() => {
    removeCompFromBody(uid)
    clearTimeout(timer)
  }, opt.duration)
}

export default toast
