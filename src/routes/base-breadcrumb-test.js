/**
 * @author GuangHui
 * @description base-breadcrumb-test 测试页
 */

const BaseBreadcrumbTest = () =>
  import(
    /* webpackChunkName:'BaseBreadcrumb' */ 'Views/BaseBreadcrumbTest/BaseBreadcrumbTest'
  )

export default [
  {
    path: '/base-breadcrumb-test',
    name: 'BaseBreadcrumbTest',
    component: BaseBreadcrumbTest,
    meta: {
      title: '测试BaseBreadcrumbTest'
    }
  }
]
