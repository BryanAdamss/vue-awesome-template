/**
 * @author GuangHui
 * @description base-count-input-test 测试页
 */

const BaseCountInputTest = () =>
  import(
    /* webpackChunkName:'BaseCountInputTest' */ 'Views/BaseCountInputTest/BaseCountInputTest'
  )

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/base-count-input-test',
    name: 'BaseCountInputTest',
    component: BaseCountInputTest,
    meta: {
      title: '测试BaseCountInputTest'
    }
  }
]
