/**
 * @author GuangHui
 * @description const-loader 测试页
 */

const ConstLoaderTest = () =>
  import(
    /* webpackChunkName:'ConstLoaderTest' */ 'Views/ConstLoaderTest/ConstLoaderTest'
  )

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/const-loader-test',
    name: 'ConstLoaderTest',
    component: ConstLoaderTest,
    meta: {
      title: '测试ConstLoaderTest'
    }
  }
]
