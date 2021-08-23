/**
 * @author GuangHui
 * @description formula-test 测试页
 */

const FormulaRenderTest = () =>
  import(
    /* webpackChunkName:'FormulaRenderTest' */ 'Views/FormulaRenderTest/FormulaRenderTest'
  )

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/formula-test',
    name: 'FormulaRenderTest',
    component: FormulaRenderTest,
    meta: {
      title: '测试FormulaRenderTest'
    }
  }
]
