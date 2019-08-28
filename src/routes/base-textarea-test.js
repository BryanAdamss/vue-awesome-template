/**
 * @author GuangHui
 * @description base-textarea-test 测试页
 */

const BaseTextAreaTest = () =>
  import(
    /* webpackChunkName:'BaseTextAreaTest' */ 'Views/BaseTextAreaTest/BaseTextAreaTest'
  )

export default [
  {
    path: '/base-textarea-test',
    name: 'BaseTextAreaTest',
    component: BaseTextAreaTest,
    meta: {
      title: '测试BaseTextAreaTest'
    }
  }
]
