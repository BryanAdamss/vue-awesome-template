/**
 * @author GuangHui
 * @description 子增高指令测试
 */

const InputAutoHeightTest = () =>
  import(
    /* webpackChunkName:'InputAutoHeightTest' */ 'Views/InputAutoHeightTest/InputAutoHeightTest'
  )

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/input-auto-height-test',
    name: 'InputAutoHeightTest',
    component: InputAutoHeightTest,
    meta: {
      title: '测试InputAutoHeightTest'
    }
  }
]
