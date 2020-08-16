/**
 * @author GuangHui
 * @description intro-test 测试页
 */

const IntroTest = () =>
  import(/* webpackChunkName:'IntroTest' */ 'Views/IntroTest/IntroTest')

export default [
  {
    path: '/intro-test',
    name: 'IntroTest',
    component: IntroTest,
    meta: {
      title: '测试IntroTest'
    }
  }
]
