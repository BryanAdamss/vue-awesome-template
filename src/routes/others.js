/**
 * @author GuangHui
 * @description 其它路由（如测试页面）
 */

const BaseTest = () =>
  import(/* webpackChunkName:'BaseTest' */ 'Views/BaseTest/BaseTest')

export default [
  {
    path: '/base-test',
    name: 'BaseTest',
    component: BaseTest
  }
]
