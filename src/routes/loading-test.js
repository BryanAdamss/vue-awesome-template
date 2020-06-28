/**
 * @author GuangHui
 * @description loading-test 测试页
 */

const LoadingTest = () =>
  import(/* webpackChunkName:'LoadingTest' */ 'Views/LoadingTest/LoadingTest')

export default [
  {
    path: '/loading-test',
    name: 'LoadingTest',
    component: LoadingTest,
    meta: {
      title: '测试LoadingTest'
    }
  }
]
