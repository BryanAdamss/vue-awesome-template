/**
 * @author GuangHui
 * @description popup 测试页
 */

const PopUpTest = () =>
  import(/* webpackChunkName:'PopUpTest' */ 'Views/PopUpTest/PopUpTest')

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/pop-up-test',
    name: 'PopUpTest',
    component: PopUpTest,
    meta: {
      title: '测试PopUpTest'
    }
  }
]
