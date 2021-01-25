/**
 * @author GuangHui
 * @description formula-test 测试页
 */

const FormulaRenderTest = () =>
  import(
    /* webpackChunkName:'FormulaRenderTest' */ 'Views/FormulaRenderTest/FormulaRenderTest'
  )

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
