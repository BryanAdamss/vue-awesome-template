/**
 * @author GuangHui
 * @description theme-change-test 测试页
 */

const ThemeChangeTest = () =>
  import(
    /* webpackChunkName:'ThemeChangeTest' */ 'Views/ThemeChangeTest/ThemeChangeTest'
  )

export default [
  {
    path: '/theme-change-test',
    name: 'ThemeChangeTest',
    component: ThemeChangeTest,
    meta: {
      title: '测试ThemeChangeTest'
    }
  }
]
