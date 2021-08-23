/**
 * @author GuangHui
 * @description copy-text-to-clip-board 测试页
 */

const CopyTextToClipBoardTest = () =>
  import(
    /* webpackChunkName:'CopyTextToClipBoardTest' */ 'Views/CopyTextToClipBoardTest/CopyTextToClipBoardTest'
  )

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/copy-text-to-clip-board-test',
    name: 'CopyTextToClipBoardTest',
    component: CopyTextToClipBoardTest,
    meta: {
      title: '测试CopyTextToClipBoardTest'
    }
  }
]
