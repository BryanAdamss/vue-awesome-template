/**
 * @author GuangHui
 * @description base-pdf-viewer-test 测试页
 */

const BaseDocViewerTest = () =>
  import(/* webpackChunkName:'BaseDocViewerTest' */ 'Views/BaseDocViewerTest/BaseDocViewerTest')

export default [
  {
    path: '/base-pdf-viewer-test',
    name: 'BaseDocViewerTest',
    component: BaseDocViewerTest,
    meta: {
      title: '测试BaseDocViewerTest'
    }
  }
]
