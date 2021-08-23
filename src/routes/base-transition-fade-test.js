/**
 * @author GuangHui
 * @description base-transition-fade-test 测试页
 */

const BaseTransitionFadeTest = () =>
  import(
    /* webpackChunkName:'BaseTransitionFadeTest' */ 'Views/BaseTransitionFadeTest/BaseTransitionFadeTest'
  )

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/base-transition-fade-test',
    name: 'BaseTransitionFadeTest',
    component: BaseTransitionFadeTest,
    meta: {
      title: '测试BaseTransitionFadeTest'
    }
  }
]
