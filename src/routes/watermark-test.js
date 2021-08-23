/**
 * @author GuangHui
 * @description vuex测试页
 */

const WatermarkTest = () =>
  import(
    /* webpackChunkName:'WatermarkTest' */ 'Views/WatermarkTest/WatermarkTest'
  )

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/watermark-test',
    name: 'WatermarkTest',
    component: WatermarkTest,
    meta: {
      title: '测试WatermarkTest'
    }
  }
]
