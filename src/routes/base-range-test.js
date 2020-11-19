/**
 * @author GuangHui
 * @description base-range-test 测试页
 */

const BaseRangeTest = () =>
  import(
    /* webpackChunkName:'BaseRangeTest' */ 'Views/BaseRangeTest/BaseRangeTest'
  )

export default [
  {
    path: '/base-range-test',
    name: 'BaseRangeTest',
    component: BaseRangeTest,
    meta: {
      title: '测试BaseRangeTest'
    }
  }
]
