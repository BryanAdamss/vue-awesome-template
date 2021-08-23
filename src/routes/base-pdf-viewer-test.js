/**
 * @author GuangHui
 * @description base-pdf-viewer-test 测试页
 */

const BasePdfViewerTest = () =>
  import(
    /* webpackChunkName:'BasePdfViewerTest' */ 'Views/BasePdfViewerTest/BasePdfViewerTest'
  )

// eslint-disable-next-line no-restricted-syntax
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
