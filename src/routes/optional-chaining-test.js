/**
 * @author GuangHui
 * @description optional-chaining-test 测试页
 */

const OptionalChainingTest = () =>
  import(/* webpackChunkName:'OptionalChainingTest' */ 'Views/OptionalChainingTest/OptionalChainingTest')

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/optional-chaining-test',
    name: 'OptionalChainingTest',
    component: OptionalChainingTest,
    meta: {
      title: '测试OptionalChainingTest'
    }
  }
]
