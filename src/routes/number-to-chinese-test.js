/**
 * @author GuangHui
 * @description number-to-chinese-test 测试页
 */

const NumberToChineseTest = () =>
  import(
    /* webpackChunkName:'NumberToChineseTest' */ 'Views/NumberToChineseTest/NumberToChineseTest'
  )

export default [
  {
    path: '/number-to-chinese-test',
    name: 'NumberToChineseTest',
    component: NumberToChineseTest,
    meta: {
      title: '测试NumberToChineseTest'
    }
  }
]
