/**
 * @author GuangHui
 * @description 点击外部区域测试页
 */

const ClickOutSideTest = () =>
  import(/* webpackChunkName:'ClickOutSideTest' */ 'Views/ClickOutSideTest/ClickOutSideTest')

export default [
  {
    path: '/click-outside-test',
    name: 'ClickOutSideTest',
    component: ClickOutSideTest,
    meta: {
      title: '测试自定义指令clickOutside'
    }
  }
]
