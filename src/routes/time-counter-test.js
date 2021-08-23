/**
 * @author GuangHui
 * @description time-counter-test 测试页
 */

const TimeCounterTest = () =>
  import(
    /* webpackChunkName:'TimeCounterTest' */ 'Views/TimeCounterTest/TimeCounterTest'
  )

// eslint-disable-next-line no-restricted-syntax
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
