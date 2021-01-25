/**
 * @author GuangHui
 * @description scrollbar-test 测试页
 */

const ScrollbarTest = () =>
  import(
    /* webpackChunkName:'ScrollbarTest' */ 'Views/ScrollbarTest/ScrollbarTest'
  )

export default [
  {
    path: '/scrollbar-test',
    name: 'ScrollbarTest',
    component: ScrollbarTest,
    meta: {
      title: '测试ScrollbarTest'
    }
  }
]
