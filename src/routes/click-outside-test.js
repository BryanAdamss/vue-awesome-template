/**
 * @author GuangHui
 * @description 点击外部区域测试页
 */

const ClickOutsideTest = () =>
  import(
    /* webpackChunkName:'ClickOutsideTest' */ 'Views/ClickOutsideTest/ClickOutsideTest'
  )

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/click-outside-test',
    name: 'ClickOutsideTest',
    component: ClickOutsideTest,
    meta: {
      title: '测试自定义指令clickOutside'
    }
  }
]
