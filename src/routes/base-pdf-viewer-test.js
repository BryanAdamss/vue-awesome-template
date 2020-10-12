/**
 * @author GuangHui
 * @description base-pdf-viewer-test 测试页
 */

const BasePDFViewerTest = () =>
  import(/* webpackChunkName:'BasePDFViewerTest' */ 'Views/BasePDFViewerTest/BasePDFViewerTest')

export default [
  {
    path: '/base-pdf-viewer-test',
    name: 'BasePDFViewerTest',
    component: BasePDFViewerTest,
    meta: {
      title: '测试BasePDFViewerTest'
    }
  }
]
