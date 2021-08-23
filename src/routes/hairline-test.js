/**
 * @author GuangHui
 * @description haid-line 测试页
 */

const HairlineTest = () =>
  import(
    /* webpackChunkName:'HairlineTest' */ 'Views/HairlineTest/HairlineTest'
  )

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/hairline-test',
    name: 'HairlineTest',
    component: HairlineTest,
    meta: {
      title: '测试HairlineTest'
    }
  }
]
