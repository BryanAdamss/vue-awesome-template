/**
 * @author GuangHui
 * @description pullup-test 测试页
 */

const PullupTest = () =>
  import(/* webpackChunkName:'PullupTest' */ 'Views/PullupTest/PullupTest')

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/pullup-test',
    name: 'PullupTest',
    component: PullupTest,
    meta: {
      title: '测试PullupTest'
    }
  }
]
