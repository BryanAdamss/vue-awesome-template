/**
 * @author GuangHui
 * @description number-to-chinese-test 测试页
 */

const NumberToChineseTest = () =>
  import(
    /* webpackChunkName:'NumberToChineseTest' */ 'Views/NumberToChineseTest/NumberToChineseTest'
  )

// eslint-disable-next-line no-restricted-syntax
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
