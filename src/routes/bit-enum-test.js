/**
 * @author GuangHui
 * @description affix-test 测试页
 */

const BitEnumTest = () =>
  import(/* webpackChunkName:'BitEnumTest' */ 'Views/BitEnumTest/BitEnumTest')

export default [
  {
    path: '/bit-enum-test',
    name: 'BitEnumTest',
    component: BitEnumTest,
    meta: {
      title: '测试BitEnumTest'
    }
  }
]
