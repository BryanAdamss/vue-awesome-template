/**
 * @author GuangHui
 * @description svg-icon-test 测试页
 */

const SvgIconTest = () =>
  import(/* webpackChunkName:'SvgIconTest' */ 'Views/SvgIconTest/SvgIconTest')

export default [
  {
    path: '/svg-icon-test',
    name: 'SvgIconTest',
    component: SvgIconTest,
    meta: {
      title: '测试SvgIconTest'
    }
  }
]
