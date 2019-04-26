/**
 * @author ghchu
 * @description prevent-fast-click-test 测试页
 */

const PreventFastClickBtnTest = () =>
  import(/* webpackChunkName:'PreventFastClickBtnTest' */ 'Views/PreventFastClickBtnTest/PreventFastClickBtnTest')

export default [
  {
    path: '/prevent-fast-click-test',
    name: 'PreventFastClickBtnTest',
    component: PreventFastClickBtnTest,
    meta: {
      title: '测试PreventFastClickBtnTest'
    }
  }
]
