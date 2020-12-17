/**
 * @author GuangHui
 * @description affix-test 测试页
 */

const PromiseCancelableTest = () =>
  import(
    /* webpackChunkName:'PromiseCancelableTest' */ 'Views/PromiseCancelableTest/PromiseCancelableTest'
  )

export default [
  {
    path: '/promise-cancelable-test',
    name: 'PromiseCancelableTest',
    component: PromiseCancelableTest,
    meta: {
      title: '测试PromiseCancelableTest'
    }
  }
]
