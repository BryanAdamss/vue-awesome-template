/**
 * @author GuangHui
 * @description base-pdf-viewer-test 测试页
 */

const BasePdfViewerTest = () =>
  import(
    /* webpackChunkName:'BasePdfViewerTest' */ 'Views/BasePdfViewerTest/BasePdfViewerTest'
  )

export default [
  {
    path: '/base-pdf-viewer-test',
    name: 'BasePdfViewerTest',
    component: BasePdfViewerTest,
    meta: {
      title: '测试BasePdfViewerTest'
    }
  }
]
