/**
 * @author GuangHui
 * @description prevent-fast-click-test 测试页
 */

const PreventFastClickBtnTest = () =>
  import(
    /* webpackChunkName:'PreventFastClickBtnTest' */ 'Views/PreventFastClickBtnTest/PreventFastClickBtnTest'
  )

// eslint-disable-next-line no-restricted-syntax
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
