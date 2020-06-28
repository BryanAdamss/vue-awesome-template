/**
 * @author GuangHui
 * @description click-area-expand 测试页
 */
const ClickAreaExpandTest = () =>
  import(/* webpackChunkName:'ClickAreaExpandTest' */ 'Views/ClickAreaExpandTest/ClickAreaExpandTest')

export default [
  {
    path: '/click-area-expand-test',
    name: 'ClickAreaExpandTest',
    component: ClickAreaExpandTest,
    meta: {
      title: '测试ClickAreaExpandTest'
    }
  }
]
