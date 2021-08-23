/**
 * @author GuangHui
 * @description 图片懒加载测试页
 */

const ImgLazyLoadTest = () =>
  import(
    /* webpackChunkName:'ImgLazyLoadTest' */ 'Views/ImgLazyLoadTest/ImgLazyLoadTest'
  )

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/img-lazy-load-test',
    name: 'ImgLazyLoadTest',
    component: ImgLazyLoadTest,
    meta: {
      title: '测试ImgLazyLoadTest'
    }
  }
]
