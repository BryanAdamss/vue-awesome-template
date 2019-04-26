/**
 * @author ghchu
 * @description popup 测试页
 */

const PopUpTest = () =>
  import(/* webpackChunkName:'PopUpTest' */ 'Views/PopUpTest/PopUpTest')

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
