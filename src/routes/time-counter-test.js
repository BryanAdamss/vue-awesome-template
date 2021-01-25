/**
 * @author GuangHui
 * @description time-counter-test 测试页
 */

const TimeCounterTest = () =>
  import(
    /* webpackChunkName:'TimeCounterTest' */ 'Views/TimeCounterTest/TimeCounterTest'
  )

export default [
  {
    path: '/time-counter-test',
    name: 'TimeCounterTest',
    component: TimeCounterTest,
    meta: {
      title: '测试TimeCounterTest'
    }
  }
]
