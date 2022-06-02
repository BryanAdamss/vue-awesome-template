/**
 * @author GuangHui
 * @description nullish-coalescing-operator-test 测试页
 */

const NullishCoalescingOperatorTest = () =>
  import(/* webpackChunkName:'NullishCoalescingOperatorTest' */ 'Views/NullishCoalescingOperatorTest/NullishCoalescingOperatorTest')

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/nullish-coalescing-operator-test',
    name: 'NullishCoalescingOperatorTest',
    component: NullishCoalescingOperatorTest,
    meta: {
      title: '测试NullishCoalescingOperatorTest'
    }
  }
]
