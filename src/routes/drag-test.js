/**
 * @author GuangHui
 * @description drag 测试页
 */

const DragTest = () =>
  import(/* webpackChunkName:'DragTest' */ 'Views/DragTest/DragTest')

export default [
  {
    path: '/drag-test',
    name: 'DragTest',
    component: DragTest,
    meta: {
      title: '测试DragTest'
    }
  }
]
