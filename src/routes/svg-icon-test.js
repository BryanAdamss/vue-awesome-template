/**
 * @author GuangHui
 * @description svg-icon-test-page 测试页
 */

const SvgIconTestPage = () =>
  import(
    /* webpackChunkName:'SvgIconTestPage' */ 'Views/SvgIconTestPage/SvgIconTestPage'
  )

// eslint-disable-next-line no-restricted-syntax
export default [
  {
    path: '/svg-icon-test-page',
    name: 'SvgIconTestPage',
    component: SvgIconTestPage,
    meta: {
      title: '测试SvgIconTestPage'
    }
  }
]
