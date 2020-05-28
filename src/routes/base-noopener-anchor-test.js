/**
 * @author GuangHui
 * @description base-breadcrumb-test 测试页
 */

const BaseNoopenerAnchorTest = () =>
  import(
    /* webpackChunkName:'BaseNoopenerAnchorTest' */ 'Views/BaseNoopenerAnchorTest/BaseNoopenerAnchorTest'
  )

export default [
  {
    path: '/base-noopener-anchor-test',
    name: 'BaseNoopenerAnchorTest',
    component: BaseNoopenerAnchorTest,
    meta: {
      title: '测试BaseNoopenerAnchorTest'
    }
  }
]
