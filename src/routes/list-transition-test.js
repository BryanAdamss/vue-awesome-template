/**
 * @author GuangHui
 * @description list-transition-test 测试页
 */

const ListTransitionTest = () =>
  import(
    /* webpackChunkName:'ListTransitionTest' */ 'Views/ListTransitionTest/ListTransitionTest'
  )

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/list-transition-test',
    name: 'ListTransitionTest',
    component: ListTransitionTest,
    meta: {
      title: '测试ListTransitionTest'
    }
  }
]
