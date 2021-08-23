/**
 * @author GuangHui
 * @description debounce-throttle-test 测试页
 */

const DebounceThrottleTest = () =>
  import(
    /* webpackChunkName:'DebounceThrottleTest' */ 'Views/DebounceThrottleTest/DebounceThrottleTest'
  )

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/debounce-throttle-test',
    name: 'DebounceThrottleTest',
    component: DebounceThrottleTest,
    meta: {
      title: '测试DebounceThrottleTest'
    }
  }
]
