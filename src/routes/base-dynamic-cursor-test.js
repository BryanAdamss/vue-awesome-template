/**
 * @author GuangHui
 * @description base-dynamic-cursor-test 测试页
 */

const BaseDynamicCurosrTest = () =>
  import(
    /* webpackChunkName:'BaseDynamicCurosrTest' */ 'Views/BaseDynamicCurosrTest/BaseDynamicCurosrTest'
  )

export default [
  {
    path: '/base-dynamic-cursor-test',
    name: 'BaseDynamicCurosrTest',
    component: BaseDynamicCurosrTest,
    meta: {
      title: '测试BaseDynamicCurosrTest'
    }
  }
]
