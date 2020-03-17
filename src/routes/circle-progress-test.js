/**
 * @author GuangHui
 * @description circle-progress 测试页
 */

const CircleProgressTest = () =>
  import(
    /* webpackChunkName:'CircleProgressTest' */ 'Views/CircleProgressTest/CircleProgressTest'
  )

export default [
  {
    path: '/circle-progress-test',
    name: 'CircleProgressTest',
    component: CircleProgressTest,
    meta: {
      title: '测试CircleProgressTest'
    }
  }
]
