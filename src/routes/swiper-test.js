/**
 * @author GuangHui
 * @description swiper-test 测试页
 */

const SwiperTest = () =>
  import(/* webpackChunkName:'SwiperTest' */ 'Views/SwiperTest/SwiperTest')

export default [
  {
    path: '/swiper-test',
    name: 'SwiperTest',
    component: SwiperTest,
    meta: {
      title: '测试SwiperTest'
    }
  }
]
