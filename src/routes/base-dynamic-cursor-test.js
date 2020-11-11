/**
 * @author GuangHui
 * @description base-dynamic-cursor-test 测试页
 */

const BaseDynamicCursorTest = () =>
  import(
    /* webpackChunkName:'BaseDynamicCursorTest' */ 'Views/BaseDynamicCursorTest/BaseDynamicCursorTest'
  )

export default [
  {
    path: '/base-dynamic-cursor-test',
    name: 'BaseDynamicCursorTest',
    component: BaseDynamicCursorTest,
    meta: {
      title: '测试BaseDynamicCursorTest'
    }
  }
]
