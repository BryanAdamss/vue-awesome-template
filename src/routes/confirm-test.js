/**
 * @author ghchu
 * @description confirm 测试页
 */

const ConfirmTest = () =>
  import(/* webpackChunkName:'ConfirmTest' */ 'Views/ConfirmTest/ConfirmTest')

export default [
  {
    path: '/confirm-test',
    name: 'ConfirmTest',
    component: ConfirmTest,
    meta: {
      title: '测试ConfirmTest'
    }
  }
]
