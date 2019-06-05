/**
 * @author GuangHui
 * @description affix-test 测试页
 */

const AffixTest = () =>
  import(/* webpackChunkName:'AffixTest' */ 'Views/AffixTest/AffixTest')

export default [
  {
    path: '/affix-test',
    name: 'AffixTest',
    component: AffixTest,
    meta: {
      title: '测试AffixTest'
    }
  }
]
