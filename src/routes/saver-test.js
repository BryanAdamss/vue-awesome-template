/**
 * @author GuangHui
 * @description saver-test 测试页
 */

const SaverTest = () =>
  import(/* webpackChunkName:'SaverTest' */ 'Views/SaverTest/SaverTest')

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/saver-test',
    name: 'SaverTest',
    component: SaverTest,
    meta: {
      title: '测试SaverTest'
    }
  }
]
