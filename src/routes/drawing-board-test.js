/**
 * @author GuangHui
 * @description drawing-board-test 测试页
 */

const DrawingBoardTest = () =>
  import(
    /* webpackChunkName:'DrawingBoardTest' */ 'Views/DrawingBoardTest/DrawingBoardTest'
  )

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/drawing-board-test',
    name: 'DrawingBoardTest',
    component: DrawingBoardTest,
    meta: {
      title: '测试DrawingBoardTest'
    }
  }
]
