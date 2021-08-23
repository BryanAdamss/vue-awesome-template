/**
 * @author GuangHui
 * @description random-progress-test 测试页
 */

const RandomProgressTest = () =>
  import(
    /* webpackChunkName:'RandomProgressTest' */ 'Views/RandomProgressTest/RandomProgressTest'
  )

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/random-progress-test',
    name: 'RandomProgressTest',
    component: RandomProgressTest,
    meta: {
      title: '测试RandomProgressTest'
    }
  }
]
