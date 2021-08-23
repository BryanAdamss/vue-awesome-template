/**
 * @author GuangHui
 * @description better-scroll 测试页
 */

const BetterScrollTest = () =>
  import(
    /* webpackChunkName:'BetterScrollTest' */ 'Views/BetterScrollTest/BetterScrollTest'
  )

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/better-scroll-test',
    name: 'BetterScrollTest',
    component: BetterScrollTest,
    meta: {
      title: '测试BetterScrollTest'
    }
  }
]
