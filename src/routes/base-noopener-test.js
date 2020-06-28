/**
 * @author GuangHui
 * @description base-breadcrumb-test 测试页
 */

const BaseNoopenerTest = () =>
  import(
    /* webpackChunkName:'BaseNoopenerTest' */ 'Views/BaseNoopenerTest/BaseNoopenerTest'
  )

export default [
  {
    path: '/base-noopener-test',
    name: 'BaseNoopenerTest',
    component: BaseNoopenerTest,
    meta: {
      title: '测试BaseNoopenerTest'
    }
  }
]
