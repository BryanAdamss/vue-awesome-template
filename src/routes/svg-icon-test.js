/**
 * @author GuangHui
 * @description svg-icon-test 测试页
 */

const SVGIconTest = () =>
  import(/* webpackChunkName:'SVGIconTest' */ 'Views/SVGIconTest/SVGIconTest')

export default [
  {
    path: '/svg-icon-test',
    name: 'SVGIconTest',
    component: SVGIconTest,
    meta: {
      title: '测试SVGIconTest'
    }
  }
]
