/**
 * @author GuangHui
 * @description gototop 测试页
 */

const GoToTopTest = () =>
  import(/* webpackChunkName:'GoToTopTest' */ 'Views/GoToTopTest/GoToTopTest')

export default [
  {
    path: '/go-to-top-test',
    name: 'GoToTopTest',
    component: GoToTopTest,
    meta: {
      title: '测试GoToTopTest'
    }
  }
]
