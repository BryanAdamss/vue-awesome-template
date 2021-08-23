/**
 * @author GuangHui
 * @description filters-test 测试页
 */

const FiltersTest = () =>
  import(/* webpackChunkName:'FiltersTest' */ 'Views/FiltersTest/FiltersTest')

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/filters-test',
    name: 'FiltersTest',
    component: FiltersTest,
    meta: {
      title: '测试FiltersTest'
    }
  }
]
