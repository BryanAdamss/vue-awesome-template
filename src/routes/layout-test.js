/**
 * @author GuangHui
 * @description layout-test 测试页
 */

const LayoutTest = () =>
  import(/* webpackChunkName:'LayoutTest' */ 'Views/LayoutTest/LayoutTest')

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/layout-test',
    name: 'LayoutTest',
    component: LayoutTest,
    meta: {
      title: '测试LayoutTest'
    }
  }
]
