/**
 * @author GuangHui
 * @description base-scroll-tab-test 测试页
 */

const BaseScrollTabTest = () =>
  import(
    /* webpackChunkName:'BaseScrollTabTest' */ 'Views/BaseScrollTabTest/BaseScrollTabTest'
  )

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/base-scroll-tab-test',
    name: 'BaseScrollTabTest',
    component: BaseScrollTabTest,
    meta: {
      title: '测试BaseScrollTabTest'
    }
  }
]
