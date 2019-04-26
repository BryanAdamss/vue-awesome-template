/**
 * @author ghchu
 * @description layout-test 测试页
 */

const LayoutTest = () =>
  import(/* webpackChunkName:'LayoutTest' */ 'Views/LayoutTest/LayoutTest')

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
